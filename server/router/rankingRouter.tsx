import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
export const rankingRouter = express.Router();

const loginQuery = 'SELECT * FROM users WHERE ID = ?';

const rankingQuery = `SELECT Nickname, MaxDungeonFloor, Level FROM users`;
const myrankingQuery = `SELECT Id, Nickname, MaxDungeonFloor, Level FROM users ORDER BY MaxDungeonFloor DESC`;
//https://extbrain.tistory.com/51
//내림차순으로 정렬해서 가져오면 서버에 일을 하나 덜을 수 있다. 이따 적용해보자.

const searchRankingQuery = `SELECT Id,Nickname, MaxDungeonFloor, Level FROM users ORDER BY MaxDungeonFloor DESC`;

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
      return b.MaxDungeonFloor - a.MaxDungeonFloor;
    });
    //100까지만 자르기
    let sliceArr = sortRankingArr.slice(0, 200);

    //순위 추가
    let addRankingNumberArr = sliceArr.map((i: any, index: any) => ({
      ...i,
      ranking: index + 1,
    }));

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
  let { userId } = req.body;
  let userId2 = req.decoded.userId;
  console.log('유저아이디 투');
  console.log(userId2);
  db.query(myrankingQuery, [], (err, rows, fields) => {
    // console.log(row);
    //순위 추가
    let addRankingNumberArr = rows.map((i: any, index: any) => ({
      ...i,
      ranking: index + 1,
    }));
    let userRankingIndex = addRankingNumberArr.findIndex((e: any) => e.Id === userId2);
    //3등안에 들 경우 slice 첫번째 인자를 0으로 계산할 수 있게끔 변경
    // if (userRankingIndex <= 2) userRankingIndex = 2;
    // let rangeArr = addRankingNumberArr.slice(
    //   userRankingIndex - 2,
    //   userRankingIndex + 3,
    // );
    res.status(200).json({ myRanking: addRankingNumberArr[userRankingIndex] });
  });
});

rankingRouter.get('/searchid/:searchid', (req, res) => {
  // console.log(req);
  const searchId = req.params.searchid;
  console.log(req.params);
  console.log('검색한 id는 ' + req.params.searchid + ' 입니다');

  db.query(searchRankingQuery, [], (err, rows, fields) => {
    //순위 추가
    let addRankingNumberArr = rows.map((i: any, index: any) => ({
      ...i,
      ranking: index + 1,
    }));
    let userRankingIndex = addRankingNumberArr.findIndex((e: any) => e.Nickname == searchId);
    // -1이면 유저가 없다는것 이때 분기를 나눠야한다.
    console.log(userRankingIndex);
    if (userRankingIndex === -1) {
      res.status(200).json({
        code: 404,
        text: '검색 결과가 없어요! 아이디를 다시 확인해보는게 어때요?',
      });
      return;
    }

    if (userRankingIndex <= 2) userRankingIndex = 2;
    let searchIdArr = addRankingNumberArr.slice(userRankingIndex - 2, userRankingIndex + 3);
    console.log(searchIdArr);

    res.status(200).json({ searchIdArr });
  });
});
