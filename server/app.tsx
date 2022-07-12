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
const app = express();

interface API {
  req: Request,
  res: Response,
  next?: NextFunction
}

app.get('/', ({req, res, next}:API) => {
    res.send('welcome!');
});

app.get('/hi', (req,res):void => {
    console.log(req.body)
})

app.listen('1234', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
}); 