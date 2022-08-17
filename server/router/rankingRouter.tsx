import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import { userInfoProcess } from '../../src/util/userInfoProcess.js';
import { dummyUserObj } from './_dummyUser.js';
export const rankingRouter = express.Router();

const userFindQuery = 'SELECT SkillPoint, ? FROM users WHERE ID = ?';
const UpGoldPenQuery = `UPDATE users SET UpGoldPen = UpGoldPen + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const UpGoldHuntQuery = `UPDATE users SET UpGoldHunt = UpGoldHunt + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const BetterPenQuery = `UPDATE users SET BetterPen = BetterPen + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const UpMaxHpQuery = `UPDATE users SET UpMaxHp = UpMaxHp + 1, SkillPoint = SkillPoint - 1, BasicHp = BasicHp + 100 WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';

const rankingQuery = 'SELECT ID, DungeonFloor, Level FROM users';
const myrankingQuery = 'SELECT * FROM users ORDER BY DungeonFloor DESC';
//https://extbrain.tistory.com/51
//내림차순으로 정렬해서 가져오면 서버에 일을 하나 덜을 수 있다. 이따 적용해보자.

interface data {
  data?: [];
  listNum?: number;
}

rankingRouter.post('/allranking', (req, res, next) => {
  const userId = req.decoded.userId;
  const { currentPageNum } = req.body;

  db.query(rankingQuery, [], (err, rows, fields) => {
    //던전높은순으로 정렬
    let sortRankingArr = rows.sort(function (a: any, b: any) {
      return b.DungeonFloor - a.DungeonFloor;
    });
    //100까지만 자르기
    let sliceArr = sortRankingArr.slice(0, 100);

    //순위 추가
    let addRankingNumberArr = sliceArr.map((i: any, index: any) => ({
      ...i,
      ranking: index + 1,
    }));

    //더미데이터 순위 정렬
    // let sortRankingArr2 = dummyUserObj.sort(function (a: any, b: any) {
    //   return b.DungeonFloor - a.DungeonFloor;
    // });
    //더미데이터 100까지만 자르기
    // let sliceArr = sortRankingArr2.slice(0, 100);
    // 잘라낸 데이터에 랭킹 추가
    // let addRankingNumberArr2 = sliceArr.map((i: any, index: any) => ({
    //   ...i,
    //   ranking: index + 1,
    // }));

    // console.log(addRankingNumberArr);
    // console.log(dummyUserObj.length);

    let payload: data = {};
    //페이지넘버를 요청했을 때
    let pageNumber = (currentPageNum - 1) * 10; // 0
    // console.log(currentPageNum)
    payload.data = addRankingNumberArr.slice(pageNumber, pageNumber + 9 + 1); // 0~9 까지 10개를 넘겨준다.

    payload.listNum = Math.ceil(addRankingNumberArr.length / 10); // 10으로 나눈 뒤 반올림하여 필요한 페이지 갯수(정수)를 넘겨준다.

    res.status(200).json({
      payload: {
        data: addRankingNumberArr.slice(pageNumber, pageNumber + 9 + 1),
        listNum: Math.ceil(addRankingNumberArr.length / 10),
      },
    });
  });

  //   db.query(loginQuery, [userId], (err, rows, fields) => {
  //     const uesrInfo = userInfoProcess(rows[0]);
  //     res.status(200).json({ code: 200, userInfo: uesrInfo });
  //   });
});

rankingRouter.post('/myranking', (req, res, next) => {
  const { userId } = req.body;
  db.query(myrankingQuery, [], (err, rows, fields) => {
    // console.log(row);
    console.log(userId);
    //순위 추가
    let addRankingNumberArr = rows.map((i: any, index: any) => ({
      ...i,
      ranking: index + 1,
    }));
    let a = addRankingNumberArr.findIndex((e: any) => e.Id === userId);
    console.log(a);

    //3등안에 들 경우 slice 첫번째 인자를 0으로 계산할 수 있게끔 변경
    if (a <= 2) a = 2;
    let b = addRankingNumberArr.slice(a - 2, a + 3);
    console.log(b);

    res.status(200).json({ b });
  });
});
