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
const RevivalPointFindQuery = `SELECT RevivalPoint, DungeonFloor, UpRevivalStatPoint, BasicRevivalPoint FROM users WHERE Id = ?`;
const RevivalUpdateQuery =
  'UPDATE users SET DungeonFloor = ?, StatPoint = StatPoint + ?, RevivalCount = RevivalCount + 1 WHERE ID = ?';

const MonsterCountQuery2 =
  'UPDATE monstercollection AS a INNER JOIN monstercount AS b ON (a.Id = b.Id) SET a.?? = 1, b.?? = b.?? + 1 WHERE a.Id = ?';
//맥스층 갱신 쿼리
// const MaxFloorUpdateQuery;

dungeonRouter.post('/victory', (req, res, next) => {
  const userId = req.decoded.userId;
  const { monsterGold, monsterExp, UpGoldHunt, userExp, userLevel, floorInput, monsterNumber } = req.body;

  db.query(MonsterCountQuery2, [monsterNumber, monsterNumber, monsterNumber, userId], (err, rows) => {
    if (err) console.log(err);
  });

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
    //기본값 1에 '내려갈때도 두칸씩'스킬 값을 합산하여 계산하자
    let BasicRevivalStatPoint = 1;
    //패치전이니까 2씩 주어질것이다. 컬럼 기본값을 0으로 만들어주자
    let UpRevivalStatPoint = rows[0].UpRevivalStatPoint + BasicRevivalStatPoint;
    let BasicRevivalPoint = rows[0].BasicRevivalPoint;
    //몇층단위로 1씩 지급할지
    let giveStatPoint = 10;
    //환생 후 받을 스킬포인트
    let addStatPoint = Math.floor(nowFloor / giveStatPoint) * UpRevivalStatPoint;
    //환생 후 돌아갈 층
    let revivalFloor = Math.ceil((nowFloor * (BasicRevivalPoint + revivalPoint)) / 100);

    db.query(RevivalUpdateQuery, [revivalFloor, addStatPoint, userId], (err, rows, fields) => {
      console.log(
        `${userId}님이 환생하여서 ${revivalFloor}층으로 돌아가고, ${addStatPoint}스텟포인트를 획득하였습니다.`,
      );
    });

    db.query(loginQuery, [userId], (err, rows, fields) => {
      const userInfo = userInfoProcess(rows[0]);
      res.status(200).json({ code: 200, userInfo: userInfo });
    });
  });
});
