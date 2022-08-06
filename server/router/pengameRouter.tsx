import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';

export const pengameRouter = express.Router();

const userFindQuery = 'SELECT Gold, UpGoldPen FROM users WHERE ID = ?';
const rewardUpdateQuery = `UPDATE users SET Gold = ?, PenCount = penCount + 1 WHERE ID = ?`;

const loginQuery = 'SELECT * FROM users WHERE ID = ?';

pengameRouter.post('/multiple', (req, res, next) => {
  const userId = req.decoded.userId;
  const { reward } = req.body;

  db.query(userFindQuery, [userId], (err, result, fields) => {
    let resultGold = parseInt(result[0].Gold) * reward;
    let beforeGold = parseInt(result[0].Gold);
    console.log(
      `${userId}님께서 ${result[0].Gold}에서  ${resultGold}가 되었습니다.`,
    );
    db.query(rewardUpdateQuery, [resultGold, userId], (err, result, fields) => {
      db.query(loginQuery, [userId], function (err, rows, fields) {
        const userInfo = {
          Level: rows[0].Level,
          BasicDamage: rows[0].BasicDamage,
          BasicHp: rows[0].BasicHp,
          WeaponDamage: rows[0].WeaponDamage,
          WeaponHp: rows[0].WeaponHp,
          Gold: rows[0].Gold,
          beforeGold,
          SkillPoint: rows[0].SkillPoint,
          UpGoldPen: rows[0].UpGoldPen,
          UpGoldHunt: rows[0].UpGoldHunt,
          DungeonFloor: rows[0].DungeonFloor,
        };

        res.status(200).json({ code: 200, userInfo: { ...userInfo } });
      });
    });
  });
});

pengameRouter.post('/add', (req, res, next) => {
  const userId = req.decoded.userId;
  const { speed } = req.body;
  const reward = parseInt(req.body.reward);
  console.log(reward, speed);

  db.query(userFindQuery, [userId], (err, result, fields) => {
    let skillBonus = result[0].UpGoldPen;
    console.log(skillBonus);
    let speedGold = reward * speed;
    //스킬 1당 1%를 보너스로 지급
    let subGold = (speedGold * skillBonus) / 100;
    let BonusGold = speedGold + subGold;

    let resultGold = parseInt(result[0].Gold) + BonusGold;
    let beforeGold = parseInt(result[0].Gold);
    console.log(subGold, BonusGold, resultGold);
    console.log(
      `${userId}님께서 ${result[0].Gold}에서  ${resultGold}가 되었습니다.`,
    );
    db.query(rewardUpdateQuery, [resultGold, userId], (err, result, fields) => {
      db.query(loginQuery, [userId], function (err, rows, fields) {
        const userInfo = {
          Level: rows[0].Level,
          BasicDamage: rows[0].BasicDamage,
          BasicHp: rows[0].BasicHp,
          WeaponDamage: rows[0].WeaponDamage,
          WeaponHp: rows[0].WeaponHp,
          Gold: rows[0].Gold,
          beforeGold,
          SkillPoint: rows[0].SkillPoint,
          UpGoldPen: rows[0].UpGoldPen,
          UpGoldHunt: rows[0].UpGoldHunt,
          DungeonFloor: rows[0].DungeonFloor,
        };

        res.status(200).json({ code: 200, userInfo: { ...userInfo } });
      });
    });
  });
});

pengameRouter.post('/deduct', (req, res, next) => {
  const userId = req.decoded.userId;
  const { reward, speed } = req.body;

  db.query(userFindQuery, [userId], (err, result, fields) => {
    let resultGold = parseInt(result[0].Gold) - parseInt(reward) * speed;
    let beforeGold = parseInt(result[0].Gold);

    console.log(
      `${userId}님께서 ${result[0].Gold}에서  ${resultGold}가 되었습니다.`,
    );
    console.log(Math.sign(resultGold));
    //음수 방지
    if (Math.sign(resultGold) === -1) {
      resultGold = 0;
    }

    db.query(rewardUpdateQuery, [resultGold, userId], (err, result, fields) => {
      db.query(loginQuery, [userId], function (err, rows, fields) {
        const userInfo = {
          Level: rows[0].Level,
          BasicDamage: rows[0].BasicDamage,
          BasicHp: rows[0].BasicHp,
          WeaponDamage: rows[0].WeaponDamage,
          WeaponHp: rows[0].WeaponHp,
          Gold: rows[0].Gold,
          beforeGold,
          SkillPoint: rows[0].SkillPoint,
          UpGoldPen: rows[0].UpGoldPen,
          UpGoldHunt: rows[0].UpGoldHunt,
          DungeonFloor: rows[0].DungeonFloor,
        };

        res.status(200).json({ code: 200, userInfo: { ...userInfo } });
      });
    });
  });
});
