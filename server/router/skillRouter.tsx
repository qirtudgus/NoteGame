import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import { userInfoProcess } from '../../src/util/userInfoProcess.js';

export const skillRouter = express.Router();

const SkillQuery = `UPDATE users SET ?? = ?? + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';

skillRouter.post('/skillup', (req, res, next) => {
  const userId = req.decoded.userId;
  const { skillName, skillPoint } = req.body;

  if (skillPoint <= 0) return;
  console.log(`${userId}님이 ${skillName}스킬을 찍으셨습니다.`);
  db.query(SkillQuery, [skillName, skillName, userId], (err, result) => {
    if (err) console.log(err);
  });

  db.query(loginQuery, [userId], (err, rows, fields) => {
    const uesrInfo = userInfoProcess(rows[0]);

    res.status(200).json({ code: 200, userInfo: uesrInfo });
  });
});
