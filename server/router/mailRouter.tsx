import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import createRandomNum from '../../src/util/createRandomNum';
dotenv.config();

let sendMail = process.env.sendEmail;
let sendPassword = process.env.sendPassword;

export const mailRouter = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail', // 이메일
  auth: {
    user: sendMail, // 발송자 이메일
    //2단계 보안이 걸려있을 경우 앱비밀번호 16자리를 생성하고, 그 번호를 할당해야함
    pass: sendPassword, // 발송자 비밀번호
  },
  port: 587,
  host: 'smtp.gmail.com',
  secure: false,
  requireTLS: true,
});

mailRouter.post('/mailauth', async (req, res) => {
  const { userEmail, authPasswordValue } = req.body;
  console.log(userEmail);
  console.log(sendMail);

  let emailParam = {
    from: sendMail,
    to: userEmail, // 수신할 이메일
    subject: `공책던전 인증번호입니다.`, // 메일 제목
    text: `회원님 안녕하세요, 인증번호는 ${authPasswordValue}입니다.`, // 메일 내용
  };

  transporter.sendMail(emailParam, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(200).send('성공');
});
