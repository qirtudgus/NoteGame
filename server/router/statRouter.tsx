import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import { userInfoProcess } from '../../src/util/userInfoProcess.js';

export const statRouter = express.Router();

const UpGoldPenQuery = `UPDATE users SET UpGoldPen = UpGoldPen + ?, StatPoint = StatPoint - ? WHERE ID = ?`;
const UpGoldHuntQuery = `UPDATE users SET UpGoldHunt = UpGoldHunt + ?, StatPoint = StatPoint - ? WHERE ID = ?`;
const BetterPenQuery = `UPDATE users SET BetterPen = BetterPen + ?, StatPoint = StatPoint - ? WHERE ID = ?`;
const UpMaxHpQuery = `UPDATE users SET UpMaxHp = UpMaxHp + ?, StatPoint = StatPoint - ?, BasicHp = BasicHp + (? * 100) WHERE ID = ?`;
const UpBasicDamageQuery = `UPDATE users SET UpBasicDamage = UpBasicDamage + ?, StatPoint = StatPoint - ?, BasicDamage = BasicDamage + (? * 50) WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';

statRouter.post('/statup', (req, res, next) => {
  const userId = req.decoded.userId;
  const { statName, statPoint, takePoint } = req.body;

  if (statPoint <= 0) return;
  console.log(`${userId}님이 ${statName}스킬을 찍으셨습니다.`);

  if (statName === 'UpGoldPen') {
    db.query(UpGoldPenQuery, [takePoint, takePoint, userId], (err, result, fields) => {
      // console.log(err);
    });
  }
  if (statName === 'UpGoldHunt') {
    db.query(UpGoldHuntQuery, [takePoint, takePoint, userId], (err, result, fields) => {
      // console.log(err);
    });
  }
  if (statName === 'BetterPen') {
    db.query(BetterPenQuery, [takePoint, takePoint, userId], (err, result, fields) => {
      // console.log(err);
    });
  }
  if (statName === 'UpMaxHp') {
    db.query(UpMaxHpQuery, [takePoint, takePoint, takePoint, userId], (err, result, fields) => {
      // console.log(err);
    });
  }
  if (statName === 'UpBasicDamage') {
    db.query(UpBasicDamageQuery, [takePoint, takePoint, takePoint, userId], (err, result, fields) => {
      // console.log(err);
    });
  }

  db.query(loginQuery, [userId], (err, rows, fields) => {
    const uesrInfo = userInfoProcess(rows[0]);

    res.status(200).json({ code: 200, userInfo: uesrInfo });
  });
});
