import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import {userInfoProcess} from '../../src/util/userInfoProcess.js'

export const dungeonRouter = express.Router();

const VictoryBeforeQuery = `UPDATE users SET Gold = Gold + ? ,Exp = Exp + ? WHERE ID = ?`;
const VictoryQuery = `UPDATE users SET DungeonFloor = DungeonFloor + 1, Gold = Gold + ? ,Exp = Exp + ? WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';

dungeonRouter.post('/victory', (req, res, next) => {
  const userId = req.decoded.userId;
  const { monsterGold, monsterExp } = req.body;
  console.log(req.body.before)

  if(req.body.before === true){
    db.query(VictoryBeforeQuery,[monsterGold,monsterExp,userId],(err,rows,fields) => {
      db.query(loginQuery, [userId], (err, rows, fields) => {
        const userInfo = userInfoProcess(rows[0])
        res.status(200).json({ code: 200, userInfo: userInfo });
      });
    })
    return
  }else{
    db.query(VictoryQuery,[monsterGold,monsterExp,userId],(err,rows,fields) => {
      db.query(loginQuery, [userId], (err, rows, fields) => {
        const userInfo = userInfoProcess(rows[0])
        res.status(200).json({ code: 200, userInfo: userInfo });
      });
    })
  

  }





});
