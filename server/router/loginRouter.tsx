import express, { Request, Response, NextFunction } from 'express';
import {db} from '../db.js';
import checkHashPasswordeck from "../../src/util/checkHashPassword.js"
import createToken  from '../../src/util/createToken.js';
import checkToken  from '../../src/util/checkToken.js';
export const loginRouter = express.Router();

loginRouter.post('/', (req:Request, res: Response, next:NextFunction) => {
 const {id,password} = req.body;
 const loginQuery = 'SELECT * FROM users WHERE ID = ?';
 db.query(loginQuery,[id],function(err,rows,fields){
        // db조회값이 없을 시
        if (rows[0] === undefined) {
            console.log(`${id} 없는 계정으로 로그인 시도`);
            res.status(200).json({code:404,message:"아이디를 확인해주세요."});
          }
        // db조회값이 있을 시
          else{
            console.log(`로그인 시간
            ${req.requestTime}`);
            const userInfo = {
              Level: rows[0].Level,
              BasicDamage: rows[0].BasicDamage,
              BasicHp: rows[0].BasicHp,
              WeaponDamage:rows[0].WeaponDamage,
              WeaponHp: rows[0].WeaponHp,
              Gold:0,

            }

            checkHashPasswordeck(password,rows[0].Password,rows[0].Salt) ? 
            res.status(200).json({code:200,token:createToken(id),id:id,userInfo:{...userInfo}})
            :
            res.status(200).json({code:405,message:"비밀번호가 틀렸습니다."});
          }
 })
})

loginRouter.post('/tokencheck',(req,res) => {
    //decode된 토큰객체가 들어있음
    console.log(req.isToken)
    if(req.isToken === true){
    console.log(`
헤더 토큰값
${req.headers.authorization}
헤더 토큰값
    `
    )
    res.send(checkToken(req.body.isToken))
  }else{
    console.log("토큰이 만료")
    res.redirect('http://localhost:3000/aaw')
  }

})

loginRouter.post('/tokencheck2',(req,res) => {

  res.status(200)
})

loginRouter.post('/localstorage',(req,res) => {
  try{
    let id:any = checkToken(req.body.token.token)

    console.log(id.userId)
    const loginQuery = 'SELECT * FROM users WHERE ID = ?';
   db.query(loginQuery,[id.userId],function(err,rows,fields){
          // db조회값이 없을 시
          if (rows[0] === undefined) {
              console.log(`${id} 없는 계정으로 로그인 시도`);
              res.status(200).json({code:404,message:"아이디를 확인해주세요."});
            }
          // db조회값이 있을 시
            else{
              console.log(`로그인 시간
              ${req.requestTime}`);
              const userInfo = {
                Level: rows[0].Level,
                BasicDamage: rows[0].BasicDamage,
                BasicHp: rows[0].BasicHp,
                WeaponDamage:rows[0].WeaponDamage,
                WeaponHp: rows[0].WeaponHp,
                Gold:0,
  
              }
              res.status(200).json({code:200,token:req.body.token.token,id:id,userInfo:{...userInfo}})
                        }
   })


  }
  catch(e){
    console.log(e)
    res.status(200).json({code:201,token:undefined,id:undefined})

  }

 
})
