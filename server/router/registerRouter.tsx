import express, { Request, Response, NextFunction } from 'express';
import CryptoJS from 'crypto-js';
import {db} from '../db.js';


export const registerRouter = express.Router();

registerRouter.post('/join', (req:Request, res: Response, next:NextFunction) => {
    const {id,password} = req.body;
    const salt :string = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    const hashPassword :string = CryptoJS.HmacSHA256(password, salt).toString();
    const sqlQuery = 'INSERT INTO users (Id,Password,Salt) VALUES (?,?,?)';
    db.query(sqlQuery, [id, hashPassword, salt]);
    console.log(`${id}님 회원가입 완료`);
    res.send("200")
})

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


