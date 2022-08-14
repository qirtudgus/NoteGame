import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import { userInfoProcess } from '../../src/util/userInfoProcess.js';

export const buyBallpenListRouter = express.Router();

const userFindQuery = 'SELECT BuyBallpenList FROM users WHERE ID = ?';
const EquipBallpenQuery = `UPDATE users SET EquipBallpen = ? WHERE ID = ?`;
const UpGoldHuntQuery = `UPDATE users SET UpGoldHunt = UpGoldHunt + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const BetterPenQuery = `UPDATE users SET BetterPen = BetterPen + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';
const ConcatBuyBallpenList = `UPDATE users SET BuyBallpenList = CONCAT(BuyBallpenList,',',?) WHERE ID = ?`;
const BuyAfterGoldQuery = `UPDATE users SET Gold = Gold - ? WHERE ID = ?`;

buyBallpenListRouter.post('/updateballpen', (req, res, next) => {
  const userId = req.decoded.userId;
  db.query(userFindQuery, [userId], (err, rows, fields) => {
    console.log(rows[0].BuyBallpenList.split(','));
    const resultList: [string] = rows[0].BuyBallpenList.split(',');
    res.status(200).json({ code: 200, buyBallpenList: resultList });
  });
});

buyBallpenListRouter.post('/realbuyballpen', (req, res, next) => {
  const userId = req.decoded.userId;
  const { ballpenName, gold } = req.body;
  db.query(BuyAfterGoldQuery, [gold, userId], (err, rows, fields) => {
    db.query(
      ConcatBuyBallpenList,
      [ballpenName, userId],
      (err, rows, fields) => {
        db.query(userFindQuery, [userId], (err, rows, fields) => {
          console.log(rows[0].BuyBallpenList.split(','));
          const resultList: [string] = rows[0].BuyBallpenList.split(',');

          db.query(loginQuery, [userId], (err, rows, fields) => {
            let userInfo = userInfoProcess(rows[0]);
            console.log(userInfo);
            res.status(200).json({
              code: 200,
              userInfo: userInfo,
              buyBallpenList: resultList,
            });
          });
        });
      },
    );
  });
});

buyBallpenListRouter.post('/equip', (req, res, next) => {
  const userId = req.decoded.userId;
  const { ballpenName } = req.body;
  db.query(EquipBallpenQuery, [ballpenName, userId], (err, rows, fields) => {
    db.query(loginQuery, [userId], (err, rows, fields) => {
      let userInfo = userInfoProcess(rows[0]);
      console.log(userInfo);
      res.status(200).json({ code: 200, userInfo: userInfo });
    });
  });

  //   db.query(loginQuery, [userId], (err, rows, fields) => {
  //     // const uesrInfo = userInfoProcess(rows[0]);
  //     res.status(200).json({ code: 200, buyBallpenList: {} });
  //   });
});