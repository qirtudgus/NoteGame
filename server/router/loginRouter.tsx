import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import { checkHashPassword } from '../../src/util/checkHashPassword.js';
import createToken from '../../src/util/createToken.js';
import checkToken from '../../src/util/checkToken.js';
import { JwtPayload } from 'jsonwebtoken';
import { userInfoProcess } from '../../src/util/userInfoProcess.js';

export const loginRouter = express.Router();

loginRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { id, password } = req.body;
  const loginQuery = 'SELECT * FROM users WHERE ID = ?';
  db.query(loginQuery, [id], function (err, rows, fields) {
    // db조회값이 없을 시
    if (rows[0] === undefined) {
      console.log(`${id} 없는 계정으로 로그인 시도`);
      res.status(200).json({ code: 404, message: '아이디를 확인해주세요.' });
    }
    // db조회값이 있을 시
    else {
      console.log(rows[0].Password);
      console.log(rows[0].Salt);
      console.log(`로그인 시간
         ${id}님   ${req.requestTime}`);
      const token: unknown = createToken(id);
      // req.decoded = checkToken(token)

      //https://bobbyhadz.com/blog/typescript-type-unknown-is-not-assignable-to-type
      const b: string = token as string;
      const uesrInfo2 = userInfoProcess(rows[0]);

      console.log(rows[0].Password);
      console.log(rows[0].Salt);

      console.log(checkToken(b));
      req.decoded = checkToken(b);

      checkHashPassword(password, rows[0].Password, rows[0].Salt)
        ? res.status(200).json({
            code: 200,
            token: token,
            id: id,
            userInfo: uesrInfo2,
          })
        : res.status(200).json({ code: 405, message: '비밀번호가 틀렸습니다.' });
    }
  });
});

loginRouter.post('/localstorage', (req, res) => {
  try {
    let id: string | JwtPayload | any = checkToken(req.body.token.token);
    const loginQuery = 'SELECT * FROM users WHERE ID = ?';
    db.query(loginQuery, [id.userId], function (err, rows, fields) {
      // db조회값이 없을 시
      if (rows[0] === undefined) {
        console.log(`${id} 없는 계정으로 로그인 시도`);
        res.status(200).json({ code: 404, message: '아이디를 확인해주세요.' });
      }
      // db조회값이 있을 시
      else {
        console.log(`로그인 시간
              ${req.requestTime}`);

        const uesrInfo = userInfoProcess(rows[0]);

        res.status(200).json({
          code: 200,
          token: req.body.token.token,
          id: id,
          userInfo: uesrInfo,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({ code: 201, token: undefined, id: undefined });
  }
});
