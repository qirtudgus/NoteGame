import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';

export const dungeonRouter = express.Router();

const userFindQuery = 'SELECT SkillPoint, ? FROM users WHERE ID = ?';
const VictoryQuery = `UPDATE users SET DungeonFloor = DungeonFloor + 1, Gold = Gold + ? ,Exp = Exp + ? WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';

dungeonRouter.post('/victory', (req, res, next) => {
  const userId = req.decoded.userId;
  const { monsterGold, monsterExp } = req.body;

  db.query(VictoryQuery,[monsterGold,monsterExp,userId],(err,rows,fields) => {
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
        DungeonFloor: rows[0].DungeonFloor,
      };
      res.status(200).json({ code: 200, userInfo: { ...userInfo } });
    });
  })



});
