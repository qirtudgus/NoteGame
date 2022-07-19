// 서버 참고 사이트
//https://velog.io/@qhgus/Node-Express-TypeScript-%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85
/*
오류 - ERR_UNKNOWN_FILE_EXTENSION - 참고 사이트
https://peaku.co/questions/7475-no-puedo-ejecutar-mi-proyecto-typescript-de-nodejs-typeerror-[err-unknown-file-extension]:-extension-de-archivo-desconocida-%26quot;ts%26quot;-para--app-src-appts

tsconfig.json에 아래 코드를 추가하여 해결
  "ts-node": {
        "esm": true
    }

*/
import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import { Jwt } from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import dotenv from "dotenv";
import mysql from "mysql";
dotenv.config();


const db = mysql.createConnection({
  host: process.env.local_DB_host,
  port: 3306,
  user: process.env.local_DB_user,
  password: process.env.local_DB_password,
  database: process.env.local_DB,
  charset: "utf8mb4",
});

db.connect((err:any) => {
  if (err) console.log("MySQL 연결 실패 : ", err);
  console.log("MySQL Connected!!!");
});



const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req : Request, res : Response, next :NextFunction) => {
    res.send('welcome!');
});

app.post('/hi', (req : Request, res : Response, next :NextFunction) => {
    console.log(req.body)
    res.send("서버에서 전송하는 메시지입니다.")
})

app.post('/register', (req:Request, res: Response, next:NextFunction) => {
  const {id,password} = req.body;
  const salt :string = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
  const hashPassword :string = CryptoJS.HmacSHA256(password, salt).toString();

  


  console.log(id, password)
  console.log(hashPassword)
  console.log(process.env.local_DB)
  console.log(process.env.local_DB_user)
  console.log(process.env.local_DB_password)

  const numbers = {num :200};
  const numbers2 = {num :404};
  if(password ){
    res.send(numbers2)
  }
  else{
    res.send(numbers)

  }
})

app.listen('1234', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
}); 