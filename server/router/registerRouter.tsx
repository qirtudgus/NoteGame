import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import { createHashPassword } from '../../src/util/createHashPassword.js';

export const registerRouter = express.Router();

//아이디 양식
const idCheckRegex = /^[a-zA-Z0-9]{2,10}$/;

//특수문자 체크
const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/i;

//공백체크 표현식
const spaceCheck = /\s/g;

//회원가입 완료
registerRouter.post('/join', (req: Request, res: Response, next: NextFunction) => {
  const { id, password, nickname } = req.body;
  const a = createHashPassword(password);
  const sqlQuery = 'INSERT INTO users (Id,Password,Salt,Nickname) VALUES (?,?,?,?)';

  db.query(sqlQuery, [id, a.hashPassword, a.salt, nickname]);
  console.log(`${id}님 회원가입 완료`);
  res.status(200).json({ code: 200 });
});

//아이디 중복확인
registerRouter.post('/confirmid', (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  const idCheck = 'SELECT * FROM users WHERE ID = ?';
  if (id === '') {
    res.json({ auth: false, text: '필수 정보입니다.' });
    return;
  }
  if (spaceCheck.test(id)) {
    res.json({ auth: false, text: '2~10자 영문,숫자만 사용 가능합니다.' });
    return;
  }
  if (special_pattern.test(id)) {
    res.json({ auth: false, text: '2~10자 영문,숫자만 사용 가능합니다.' });
    return;
  }
  if (!idCheckRegex.test(id)) {
    res.json({ auth: false, text: '2~10자 영문,숫자만 사용 가능합니다.' });
    return;
  }

  //정규표현식 패스하면
  db.query(idCheck, [id], function (err, rows, fields) {
    if (rows[0] === undefined) {
      console.log('사용가능한 아이디');
      res.status(200).json({ auth: true, text: '사용 가능한 아이디입니다.' });
      // res.send(true);
    } else if (rows[0]) {
      res.status(200).json({ auth: false, text: '이미 사용중인 아이디입니다.' });
      // res.send(false);
    }
  });
});

registerRouter.post('/confirmnickname', (req, res, next) => {
  const { nickname } = req.body;
  const nicknameCheck = 'SELECT * FROM users WHERE Nickname = ?';

  if (nickname === '') {
    res.json({ auth: false, text: '닉네임을 입력해주세요!' });
    return;
  }
  if (spaceCheck.test(nickname)) {
    res.json({ auth: false, text: '1~10자 공백없이 사용 가능합니다.' });
    return;
  }
  if (nickname.length > 1 && nickname.length > 10) {
    res.json({ auth: false, text: '1~10자 공백없이 사용 가능합니다.' });
    return;
  }
  // if (special_pattern.test(nickname)) {
  //   res.json({ auth: false, text: '공백과 특수문자는 사용할 수 없어요!' });
  //   return;
  // }

  db.query(nicknameCheck, [nickname], (err, rows, fields) => {
    if (rows[0] === undefined) {
      console.log('사용가능한 닉네임');
      res.status(200).json({ auth: true, text: '사용 가능한 닉네임입니다.' });
      // res.send(true);
    } else if (rows[0]) {
      res.status(200).json({ auth: false, text: '이미 사용중인 닉네임입니다.' });
      // res.send(false);
    }
  });
});
