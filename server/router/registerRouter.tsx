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


