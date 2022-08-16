import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import { userInfoProcess } from '../../src/util/userInfoProcess.js';

export const rankingRouter = express.Router();

const userFindQuery = 'SELECT SkillPoint, ? FROM users WHERE ID = ?';
const UpGoldPenQuery = `UPDATE users SET UpGoldPen = UpGoldPen + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const UpGoldHuntQuery = `UPDATE users SET UpGoldHunt = UpGoldHunt + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const BetterPenQuery = `UPDATE users SET BetterPen = BetterPen + 1, SkillPoint = SkillPoint - 1 WHERE ID = ?`;
const UpMaxHpQuery = `UPDATE users SET UpMaxHp = UpMaxHp + 1, SkillPoint = SkillPoint - 1, BasicHp = BasicHp + 100 WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';

const rankingQuery = 'SELECT ID, DungeonFloor, Level FROM users'



rankingRouter.post('/allranking', (req, res, next) => {
  const userId = req.decoded.userId;

    db.query(rankingQuery,[],(err,rows,fields) => {
        console.log(err);
        console.log(rows);
        let a = rows.sort(function(a:any,b:any) {
            return b.DungeonFloor - a.DungeonFloor;
        })
        console.log(a.slice(0,10));
        res.send(a.slice(0,10))
    })


//   db.query(loginQuery, [userId], (err, rows, fields) => {
//     const uesrInfo = userInfoProcess(rows[0]);
//     res.status(200).json({ code: 200, userInfo: uesrInfo });
//   });
});
