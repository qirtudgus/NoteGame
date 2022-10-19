import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
export const monsterCollectionRouter = express.Router();

const joinQuery = 'SELECT * FROM monsterCollection WHERE ID = ?';
const joinQueryCount = 'SELECT * FROM monstercount WHERE ID = ?';

//각 테이블의 컬럼명이 동일하니까 뒤에있는 테이블의 컬럼데이터로 덮여씌워짐..
const joinQuery2 = 'SELECT * FROM monsterCollection AS c LEFT JOIN monstercount AS r ON c.Id = r.Id';

//랭킹과 다른점을 작성해보자
//도감은 몬스터갯수만큼 각 쌍의 컬럼갯수도 고정되어있다.
//도감은 페이지당 8개다.
//현재 12개의 길이를 넘겨주므로 listNum이 2가 나와야한다.

monsterCollectionRouter.post('/joins', async (req, res) => {
  const userId = req.decoded.userId;
  const { currentPageNum } = req.body;

  //페이지넘버에 따른 배열 인덱스 앞자리계산.. 1이 넘어오면 0부터, 2가 넘어오면 1부터
  //8단위로 시작하는 방법을 생각해야함.
  // 1일때 0~7
  // 2일때 8~15
  // 3일때 16~23
  // 4일때 24~31
  let pageNumber = (currentPageNum - 1) * 8; // 0

  let monsterCollection: any = [];
  db.query(joinQuery, [userId], (err, rows, fields) => {
    delete rows[0].Id;
    delete rows[0].Index;
    monsterCollection.collection = Object.values(rows[0]);
    console.log(monsterCollection);

    db.query(joinQueryCount, [userId], (err, rows2, fields) => {
      delete rows2[0].Id;
      delete rows2[0].Index;
      monsterCollection.count = Object.values(rows2[0]);
      //각 테이블의 동일한 Id에 담긴 컬럼값을 할당
      // index 0번부터 1번몬스터 사냥여부와, 잡은횟수가 기록되어있다.
      // 이를 응답하여주면 나쁘지않을듯..
      console.log(monsterCollection); // [ collection: [ 0, 2, 0, 0, 0 ], count: [ 0, 0, 0, 0, 0 ] ]

      //넘길 갯수만큼 총 배열에서 잘라내야한다.
      //pageNumber = 0; 이면 8까지 잘린다.
      //pageNumber = 1; 이면 10부터 잘린다.
      let collectionResult = monsterCollection.collection.slice(pageNumber, pageNumber + 7 + 1); // 0~7 까지 8개를 넘겨준다.
      let countResult = monsterCollection.count.slice(pageNumber, pageNumber + 7 + 1); // 0~7 까지 8개를 넘겨준다.

      console.log('배열 자른결과');
      console.log(collectionResult);
      console.log(countResult);

      // res.status(200).json({ collection: Object.values(rows[0]), count: Object.values(rows2[0]) });
      res.status(200).json({
        collection: collectionResult,
        count: countResult,
        listNum: Math.ceil(monsterCollection.collection.length / 8),
      });
    });
  });
});
