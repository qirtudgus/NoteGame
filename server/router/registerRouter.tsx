import express, { Request, Response, NextFunction } from 'express';
import CryptoJS from 'crypto-js';
import {db} from '../db.js';
import {createHashPassword} from "../../src/util/createHashPassword.js"


export const registerRouter = express.Router();

//회원가입 완료
registerRouter.post('/join', (req:Request, res: Response, next:NextFunction) => {
    const {id,password} = req.body;
    const a =  createHashPassword(password)
    const sqlQuery = 'INSERT INTO users (Id,Password,Salt) VALUES (?,?,?)';

    db.query(sqlQuery, [id, a.hashPassword, a.salt]);
    console.log(`${id}님 회원가입 완료`);
    res.send("200")
})

//아이디 중복확인
registerRouter.post('/confirmid',(req:Request, res: Response, next:NextFunction) => {
  const {id} = req.body;
  const idCheck = 'SELECT * FROM users WHERE ID = ?';

  db.query(idCheck, [id], function (err, rows, fields) {
    if (rows[0] === undefined) {
      console.log("사용가능한 아이디")
      res.send(true);
    } else if (rows[0]) {
      res.send(false);
    }
  });

})


