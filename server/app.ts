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
import { registerRouter } from './router/registerRouter.js';
import { db } from './db.js';
import { loginRouter } from './router/loginRouter.js';
import checkToken from '../src/util/checkToken.js';
import { pengameRouter } from './router/pengameRouter.js';
import { skillRouter } from './router/skillRouter.js';
import { dungeonRouter } from './router/dungeonRouter.js';
import { buyBallpenListRouter } from './router/buyBallepenListRouter.js';
import { rankingRouter } from './router/rankingRouter.js';
import { statRouter } from './router/statRouter.js';
import { monsterCollectionRouter } from './router/monsterCollectionRouter.js';
// import { mailRouter } from './router/mailRouter.js';
const SERVER_PORT = 3001;
db.connect((err: any) => {
  if (err) console.log('MySQL 연결 실패 : ', err);
  console.log('MySQL Connected!!!');
});

const app = express();
app.use(cors());
app.use(express.json());

//mysql connection 끊김 방지를 위해 1시간마다 쿼리를 날린다.
setInterval(() => {
  db.query('SELECT 1', [], (err, rows, fields) => {
    console.log('커넥션 끊김방지 쿼리');
  });
}, 3600000);

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
  if (token) {
    try {
      req.decoded = checkToken(token);
      req.isToken = true;
      console.log('유효한 토큰');
      next();
    } catch (e) {
      console.log('만료된 토큰');
      req.isToken = false;
      res.status(400).json({ code: 400, error: '토큰이 만료되었습니다.' });
      // next();
    }
  }
};
app.use(jwtCheck);
//회원가입 라우터
app.use('/api/register', registerRouter);
//로그인 라우터
app.use('/api/login', loginRouter);
//팬게임 라우터
app.use('/api/pengame', pengameRouter);
//스킬 라우터
app.use('/api/skill', skillRouter);
//스킬 라우터
app.use('/api/stat', statRouter);
//던전 라우터
app.use('/api/dungeon', dungeonRouter);
//상점 및 장착 라우터
app.use('/api/shop', buyBallpenListRouter);
//랭킹 라우터
app.use('/api/ranking', rankingRouter);
//도감 라우터
app.use('/api/monstercollection', monsterCollectionRouter);
// //메일 라우터
// app.use('/mail', mailRouter);
app.listen(SERVER_PORT, () => {
  console.log(`
  🛡️  Server listening on port: ${SERVER_PORT}
`);
});
