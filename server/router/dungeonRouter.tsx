import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import { userInfoProcess } from '../../src/util/userInfoProcess.js';

export const dungeonRouter = express.Router();

const VictoryBeforeQuery = `UPDATE users SET Gold = Gold + ? ,Exp = Exp + ?, DungeonClearCount = DungeonClearCount + 1  WHERE ID = ?`;
const VictoryQuery = `UPDATE users SET DungeonFloor = DungeonFloor + 1 + UpMoreFloor, Gold = Gold + ? ,Exp = Exp + ?, DungeonClearCount = DungeonClearCount + 1 WHERE ID = ?`;
const VictoryMaxFloorQuery = `UPDATE users SET MaxDungeonFloor = ? WHERE ID = ?`;
const MaxFloorFindQuery = `SELECT MaxDungeonFloor, DungeonFloor FROM users WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';
const ExpCheckQuery = 'SELECT NeedExp FROM leveltable WHERE Level = ?';
const LevelUpQuery = `UPDATE users SET Level = Level + 1 ,Exp = 0, SkillPoint = SkillPoint + 1, StatPoint = StatPoint + 5 WHERE ID = ?`;
const RevivalPointFindQuery = `SELECT RevivalPoint, DungeonFloor, UpRevivalStatPoint FROM users WHERE Id = ?`;

//환생은 10층 당 1 + 렙 x 5 지급하자, 기존에 스텟에서 합치는게 아니라, 변경을 해주자. 그럼 환생을 여러번해도 이득이 없다.
const RevivalUpdateQuery =
  'UPDATE users SET DungeonFloor = ?, StatPoint = ? + (Level * 5), RevivalCount = RevivalCount + 1, UpGoldPen = 0, UpGoldHunt = 0, UpMaxHp = 0, UpBasicDamage = 0, BetterPen = 0 WHERE ID = ?';

//맥스층 갱신 쿼리
// const MaxFloorUpdateQuery;

dungeonRouter.post('/victory', (req, res, next) => {
  const userId = req.decoded.userId;
  const { monsterGold, monsterExp, UpGoldHunt, userExp, userLevel, floorInput } = req.body;
  const resultGold: number = Math.ceil(monsterGold + (monsterGold * UpGoldHunt) / 100);
  const resultExp = userExp + monsterExp;
  //이전층으로 돌아가서 클리어시 before값이 들어온다. 그에 맞는 로직.
  if (floorInput) {
    console.log(`${userId}님이 이전층${floorInput}을 클리어하였습니다.`);
    db.query(VictoryBeforeQuery, [resultGold, monsterExp, userId], (err, rows, fields) => {
      db.query(ExpCheckQuery, [userLevel], (err, rows, fields) => {
        console.log(rows[0]);

        let needExp = rows[0].NeedExp;
        if (resultExp >= needExp) {
          db.query(LevelUpQuery, [userId], (err, rows, fields) => {
            console.log(`${userId}님이 렙업하셨습니다.`);

            db.query(loginQuery, [userId], (err, rows, fields) => {
              let userInfo = userInfoProcess(rows[0]);
              userInfo.isLevelUp = true;
              res.status(200).json({ code: 200, userInfo: userInfo });
            });
          });
        } else {
          db.query(loginQuery, [userId], (err, rows, fields) => {
            const userInfo = userInfoProcess(rows[0]);
            res.status(200).json({ code: 200, userInfo: userInfo });
          });
        }
      });
    });
    return;
  } else {
    //도전층 성공 시
    console.log(`${userId}님이 도전층${floorInput}을 클리어하였습니다.`);
    db.query(VictoryQuery, [resultGold, monsterExp, userId], (err, rows, fields) => {
      db.query(ExpCheckQuery, [userLevel], (err, rows, fields) => {
        let needExp = rows[0].NeedExp;
        //레벨업 여부 체크
        if (resultExp >= needExp) {
          db.query(LevelUpQuery, [userId], (err, rows, fields) => {
            console.log(`${userId}님이 렙업하셨습니다.`);
            //맥스층을 뚫었는지 dB갱신 후 체크하여 현재 층이 맥스층보다 높으면 맥스층에 현재층 값을 할당한다.
            db.query(MaxFloorFindQuery, [userId], (err, rows, fields) => {
              if (rows[0].MaxDungeonFloor < rows[0].DungeonFloor) {
                console.log(`${userId}님이 ${rows[0].DungeonFloor}층으로 신기록을 달성했습니다.`);

                db.query(VictoryMaxFloorQuery, [rows[0].DungeonFloor, userId], (err, rows, fields) => {});
              }

              //마지막에는 유저정보 업데이트
              db.query(loginQuery, [userId], (err, rows, fields) => {
                const userInfo = userInfoProcess(rows[0]);
                userInfo.isLevelUp = true;
                res.status(200).json({ code: 200, userInfo: userInfo });
              });
            });
          });
        }
        //레벨업을 안할 시
        else {
          //맥스층을 뚫었는지 dB갱신 후 체크하여 현재 층이 맥스층보다 높으면 맥스층에 현재층 값을 할당한다.
          db.query(MaxFloorFindQuery, [userId], (err, rows, fields) => {
            if (rows[0].MaxDungeonFloor < rows[0].DungeonFloor) {
              console.log(`${userId}님이 ${rows[0].DungeonFloor}층으로 신기록을 달성했습니다.`);
              db.query(VictoryMaxFloorQuery, [rows[0].DungeonFloor, userId], (err, rows, fields) => {});
            }
            //마지막에는 유저정보 업데이트
            db.query(loginQuery, [userId], (err, rows, fields) => {
              const userInfo = userInfoProcess(rows[0]);
              res.status(200).json({ code: 200, userInfo: userInfo });
            });
          });
        }
      });
    });
  }
});

//환생 api
dungeonRouter.post('/revival', (req, res) => {
  const userId = req.decoded.userId;

  db.query(RevivalPointFindQuery, [userId], (err, rows, fields) => {
    let nowFloor = rows[0].DungeonFloor;
    let revivalPoint = rows[0].RevivalPoint;
    let UpRevivalStatPoint = rows[0].UpRevivalStatPoint;
    //몇층단위로 1씩 지급할지
    let giveStatPoint = 10;
    //환생 후 받을 스킬포인트
    let addStatPoint = Math.floor(nowFloor / giveStatPoint) * UpRevivalStatPoint;
    //환생 후 돌아갈 층
    let revivalFloor = Math.ceil((nowFloor * revivalPoint) / 100);

    console.log(revivalFloor);

    db.query(RevivalUpdateQuery, [revivalFloor, addStatPoint, userId], (err, rows, fields) => {
      console.log(rows);
      console.log(`${userId}님이 환생하셨습니다.`);
    });

    db.query(loginQuery, [userId], (err, rows, fields) => {
      const userInfo = userInfoProcess(rows[0]);
      res.status(200).json({ code: 200, userInfo: userInfo });
    });
  });
});
