import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import { userInfoProcess } from '../../src/util/userInfoProcess.js';

export const skillRouter = express.Router();

const UpMoreFloorQuery = `UPDATE users SET UpMoreFloor = UpMoreFloor + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const UpRevivalStatPointQuery = `UPDATE users SET UpRevivalStatPoint = UpRevivalStatPoint + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const UpDoubleAttackQuery = `UPDATE users SET UpDoubleAttack = UpDoubleAttack + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const RevivalPointQuery = `UPDATE users SET RevivalPoint = RevivalPoint + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;

const loginQuery = 'SELECT * FROM users WHERE ID = ?';

skillRouter.post('/skillup', (req, res, next) => {
  const userId = req.decoded.userId;
  const { skillName, skillPoint } = req.body;

  if (skillPoint <= 0) return;
  console.log(`${userId}님이 ${skillName}스킬을 찍으셨습니다.`);
  if (skillName === 'UpMoreFloor') {
    db.query(UpMoreFloorQuery, [userId], (err, result, fields) => {
      // console.log(err);
    });
  }
  if (skillName === 'UpRevivalStatPoint') {
    db.query(UpRevivalStatPointQuery, [userId], (err, result, fields) => {
      // console.log(err);
    });
  }
  if (skillName === 'UpDoubleAttack') {
    db.query(UpDoubleAttackQuery, [userId], (err, result, fields) => {
      // console.log(err);
    });
  }
  if (skillName === 'RevivalPoint') {
    db.query(RevivalPointQuery, [userId], (err, result, fields) => {
      // console.log(err);
    });
  }

  db.query(loginQuery, [userId], (err, rows, fields) => {
    const uesrInfo = userInfoProcess(rows[0]);

    res.status(200).json({ code: 200, userInfo: uesrInfo });
  });
});
