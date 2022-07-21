import express, { Request, Response, NextFunction } from 'express';
import {db} from '../db.js';
import  jwt  from 'jsonwebtoken';
import checkHashPasswordeck from "../../src/util/checkHashPassword.js"
import createToken  from '../../src/util/createToken.js';

export const loginRouter = express.Router();

loginRouter.post('/', (req:Request, res: Response, next:NextFunction) => {
 const {id,password} = req.body;

 console.log(id)

 const loginQuery = 'SELECT Id,Password,Salt FROM users WHERE ID = ?';

 db.query(loginQuery,[id],function(err,rows,fields){
    const SECRET_TOKEN :string = process.env.SECRET_TOKEN!;
    console.log("토큰값입니다.")
    console.log(createToken(id))
    const accessToken = jwt.sign(
        { userId: id,  TokenAuth: true },
        SECRET_TOKEN,
        {
          expiresIn: '10s',
        })
        // console.log(accessToken)
        // db조회값이 없을 시
        if (rows[0] === undefined) {
            console.log(`${id} 없는 계정으로 로그인 시도`);
            res.status(200).json({code:404,message:"아이디를 확인해주세요."});
          }
        // db조회값이 있을 시
          else{
            checkHashPasswordeck(password,rows[0].Password,rows[0].Salt) ? 
            res.status(200).json({code:200,a:accessToken})
            :
            res.status(200).json({code:405,message:"비밀번호가 틀렸습니다."});
          }
        
 })


})