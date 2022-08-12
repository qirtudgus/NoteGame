import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import { userInfoProcess } from '../../src/util/userInfoProcess.js';

export const buyBallpenListRouter = express.Router();

const userFindQuery = 'SELECT BuyBallpenList FROM users WHERE ID = ?';
const UpGoldPenQuery = `UPDATE users SET UpGoldPen = UpGoldPen + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const UpGoldHuntQuery = `UPDATE users SET UpGoldHunt = UpGoldHunt + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const BetterPenQuery = `UPDATE users SET BetterPen = BetterPen + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';

buyBallpenListRouter.post('/buyballpen', (req, res, next) => {
  const userId = req.decoded.userId;
  const { ballPenName } = req.body;
  console.log(ballPenName);
  db.query(userFindQuery, [userId], (err, rows, fields) => {
    console.log(rows[0].BuyBallpenList.split(','));
    const resultList = rows[0].BuyBallpenList.split(',');
  });

  db.query(loginQuery, [userId], (err, rows, fields) => {
    // const uesrInfo = userInfoProcess(rows[0]);
    res.status(200).json({ code: 200, buyBallpenList: {} });
  });
});
