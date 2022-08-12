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
import cors from 'cors';
import cheerio from 'cheerio';
import { registerRouter } from './router/registerRouter.js';
import { db } from './db.js';
import { loginRouter } from './router/loginRouter.js';
import checkToken from '../src/util/checkToken.js';
import { pengameRouter } from './router/pengameRouter.js';
import axios from 'axios';
import { skillRouter } from './router/skillRouter.js';
import { dungeonRouter } from './router/dungeonRouter.js';
import { buyBallpenListRouter } from './router/buyBallepenListRouter.js';

db.connect((err: any) => {
  if (err) console.log('MySQL 연결 실패 : ', err);
  console.log('MySQL Connected!!!');
});

const app = express();
app.use(cors());
app.use(express.json());

// app.post("/tistory", async (req,res) => {
//   const  html = await axios.get("https://sott120.tistory.com/")
//   const $ = cheerio.load(html.data);
//   // const title = $("#container > main > div > div.area-common > article > div > a > strong");
//   const title = $("#main > div > div > ul > li > div > div.box_contents > a.link_title > strong");

// const img = $("#main > div > div > ul > li > div > div.thumbnail_zone > a");
// let imgList:any = [];
// img.each((idx, el) => {
//     imgList[idx] = {
//         img: $(el).attr("style")?.substring(22).split(`')`)[0]
//     };
// });
// console.log(typeof img.attr("style"))
// console.log(imgList)

//   let titleList: any = [];
//   title.each((idx, el) => {
//           titleList[idx] = {
//            title: $(el).text(),
//         };
//   });
//   // console.log(titleList)
//   res.send("zz")
// })

//express req 속성 추가
declare module 'express-serve-static-core' {
  interface Request {
    requestTime?: Date;
    isToken?: boolean;
    decoded?: any;
  }
}

// req 변수할당 하는 방법 찾아봐야함
const requestTime = function (req: Request, res: Response, next: NextFunction) {
  req.requestTime = new Date();
  next();
};
app.use(requestTime);

const jwtCheck = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined = req.headers.authorization as string;
  if (!token) {
    console.log('토큰이 없음');
    return next();
  }
  try {
    req.decoded = checkToken(token);
    req.isToken = true;
    console.log('유효한 토큰');
    next();
  } catch (e) {
    console.log('만료된 토큰');
    req.isToken = false;
    next();
  }
};
app.use(jwtCheck);
//회원가입 라우터
app.use('/register', registerRouter);
//로그인 라우터
app.use('/login', loginRouter);
//팬게임 라우터
app.use('/pengame', pengameRouter);
//스킬 라우터
app.use('/skill', skillRouter);
//던전 라우터
app.use('/dungeon', dungeonRouter);
//상점 라우터
app.use('/shop', buyBallpenListRouter);

app.listen('1234', () => {
  console.log(`
  🛡️  Server listening on port: 1234🛡️
`);
});
