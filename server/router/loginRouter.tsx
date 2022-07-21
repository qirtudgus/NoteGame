import express, { Request, Response, NextFunction } from 'express';
import {db} from '../db.js';
import checkHashPasswordeck from "../../src/util/checkHashPassword.js"

export const loginRouter = express.Router();

loginRouter.post('/', (req:Request, res: Response, next:NextFunction) => {
 const {id,password} = req.body;
 console.log(id)

 const loginQuery = 'SELECT Id,Password,Salt FROM users WHERE ID = ?';

 db.query(loginQuery,[id],function(err,rows,fields){
    // console.log(err)
        // db조회값이 없을 시
        if (rows[0] === undefined) {
            console.log(`${id} 없는 계정으로 로그인 시도`);
            res.send("404");
          }
        // db조회값이 있을 시
          else{
            checkHashPasswordeck(password,rows[0].Password,rows[0].Salt) ? 
            res.send("200")
            :
            res.send("405");
          }
        
 })


})