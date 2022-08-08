import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import {userInfoProcess} from '../../src/util/userInfoProcess.js'

export const skillRouter = express.Router();

const userFindQuery = 'SELECT SkillPoint, ? FROM users WHERE ID = ?';
const UpGoldPenQuery = `UPDATE users SET UpGoldPen = UpGoldPen + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const UpGoldHuntQuery = `UPDATE users SET UpGoldHunt = UpGoldHunt + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const BetterPenQuery = `UPDATE users SET BetterPen = BetterPen + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';

skillRouter.post('/skillup', (req, res, next) => {
  const userId = req.decoded.userId;
  const { skillName, skillPoint } = req.body;
  if (skillPoint <= 0) return;
  console.log(skillName, skillPoint);

  if (skillName === 'UpGoldPen') {
    db.query(UpGoldPenQuery, [userId], (err, result, fields) => {
      console.log(err);
      console.log(result);
    });
  }
  if (skillName === 'UpGoldHunt') {
    db.query(UpGoldHuntQuery, [userId], (err, result, fields) => {
      console.log(err);
      console.log(result);
    });
  }
  if (skillName === 'BetterPen') {
    db.query(BetterPenQuery, [userId], (err, result, fields) => {
      console.log(err);
      console.log(result);
    });
  }
  db.query(loginQuery, [userId], (err, rows, fields) => {
    const userInfo = {
      Level: rows[0].Level,
      BasicDamage: rows[0].BasicDamage,
      BasicHp: rows[0].BasicHp,
      WeaponDamage: rows[0].WeaponDamage,
      WeaponHp: rows[0].WeaponHp,
      Gold: rows[0].Gold,
      SkillPoint: rows[0].SkillPoint,
      UpGoldPen: rows[0].UpGoldPen,
      UpGoldHunt: rows[0].UpGoldHunt,
      BetterPen: rows[0].BetterPen,
    };
    // console.log(userInfo)
    console.log(userInfoProcess(rows[0]))


    res.status(200).json({ code: 200, userInfo: { ...userInfo } });
  });

  //   db.query(userFindQuery, [userId], (err, result, fields) => {

  //     console.log(
  //       `${userId}님께서 ${result[0].Gold}에서  ${resultGold}가 되었습니다.`,
  //     );
  //     db.query(rewardUpdateQuery, [resultGold, userId], (err, result, fields) => {
  //       db.query(loginQuery, [userId], function (err, rows, fields) {
  //         const userInfo = {
  //           Level: rows[0].Level,
  //           BasicDamage: rows[0].BasicDamage,
  //           BasicHp: rows[0].BasicHp,
  //           WeaponDamage: rows[0].WeaponDamage,
  //           WeaponHp: rows[0].WeaponHp,
  //           Gold: rows[0].Gold,
  //           beforeGold,
  //           SkillPoint: rows[0].SkillPoint,
  //           UpGoldPen: rows[0].UpGoldPen,
  //           UpGoldHunt: rows[0].UpGoldHunt,
  //         };

  //         res.status(200).json({ code: 200, userInfo: { ...userInfo } });
  //       });
  //     });
  //   });
});
