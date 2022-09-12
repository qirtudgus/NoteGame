import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import { userInfoProcess } from '../../src/util/userInfoProcess.js';

export const statRouter = express.Router();

const UpGoldPenQuery = `UPDATE users SET UpGoldPen = UpGoldPen + 1, StatPoint = StatPoint - 1 WHERE ID = ?`;
const UpGoldHuntQuery = `UPDATE users SET UpGoldHunt = UpGoldHunt + 1, StatPoint = StatPoint - 1 WHERE ID = ?`;
const BetterPenQuery = `UPDATE users SET BetterPen = BetterPen + 1, StatPoint = StatPoint - 1 WHERE ID = ?`;
const UpMaxHpQuery = `UPDATE users SET UpMaxHp = UpMaxHp + 1, StatPoint = StatPoint - 1, BasicHp = BasicHp + 100 WHERE ID = ?`;
const UpBasicDamageQuery = `UPDATE users SET UpBasicDamage = UpBasicDamage + 1, StatPoint = StatPoint - 1, BasicDamage = BasicDamage + 50 WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';

statRouter.post('/statup', (req, res, next) => {
  const userId = req.decoded.userId;
  const { statName, statPoint } = req.body;

  if (statPoint <= 0) return;
  console.log(`${userId}님이 ${statName}스킬을 찍으셨습니다.`);

  if (statName === 'UpGoldPen') {
    db.query(UpGoldPenQuery, [userId], (err, result, fields) => {
      // console.log(err);
    });
  }
  if (statName === 'UpGoldHunt') {
    db.query(UpGoldHuntQuery, [userId], (err, result, fields) => {
      // console.log(err);
    });
  }
  if (statName === 'BetterPen') {
    db.query(BetterPenQuery, [userId], (err, result, fields) => {
      // console.log(err);
    });
  }
  if (statName === 'UpMaxHp') {
    db.query(UpMaxHpQuery, [userId], (err, result, fields) => {
      // console.log(err);
    });
  }
  if (statName === 'UpBasicDamage') {
    db.query(UpBasicDamageQuery, [userId], (err, result, fields) => {
      // console.log(err);
    });
  }

  db.query(loginQuery, [userId], (err, rows, fields) => {
    const uesrInfo = userInfoProcess(rows[0]);

    res.status(200).json({ code: 200, userInfo: uesrInfo });
  });
});
