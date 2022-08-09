import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import {userInfoProcess} from '../../src/util/userInfoProcess.js'

export const dungeonRouter = express.Router();

const VictoryBeforeQuery = `UPDATE users SET Gold = Gold + ? ,Exp = Exp + ? WHERE ID = ?`;
const VictoryQuery = `UPDATE users SET DungeonFloor = DungeonFloor + 1, Gold = Gold + ? ,Exp = Exp + ? WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';
const ExpCheckQuery = 'SELECT NeedExp FROM leveltable WHERE Level = ?';
const LevelUpQuery = `UPDATE users SET Level = Level + 1 ,Exp = 0 WHERE ID = ?`;

dungeonRouter.post('/victory', (req, res, next) => {
  const userId = req.decoded.userId;
  const { monsterGold, monsterExp,UpGoldHunt, userExp, userLevel } = req.body;
  const resultGold:number = Math.ceil(monsterGold + (monsterGold * UpGoldHunt / 100))

  const resultExp = userExp + monsterExp
  console.log(userExp)
  console.log(monsterExp)
  console.log(userLevel)


  // db.query(ExpCheckQuery,[userLevel],(err,rows,fields) => {
  //   let needExp = rows[0].NeedExp
  //   console.log(rows[0])
  //   if( resultExp >= needExp){
  //     db.query(LevelUpQuery,[userId],(err,rows,fields) => {
  //     })
  //   }
  // })
  



  if(req.body.before === true){
    db.query(VictoryBeforeQuery,[resultGold,monsterExp,userId],(err,rows,fields) => {

      db.query(ExpCheckQuery,[userLevel],(err,rows,fields) => {
        console.log(rows[0])

        let needExp = rows[0].NeedExp
        if( resultExp >= needExp){
          db.query(LevelUpQuery,[userId],(err,rows,fields) => {


            
      db.query(loginQuery, [userId], (err, rows, fields) => {
        let userInfo = userInfoProcess(rows[0]);
        res.status(200).json({ code: 200, userInfo: userInfo });
      });


          })
        }else{
          db.query(loginQuery, [userId], (err, rows, fields) => {
            const userInfo = userInfoProcess(rows[0])
            res.status(200).json({ code: 200, userInfo: userInfo });
          });

        }
      })

    })
    return
  }else{
    db.query(VictoryQuery,[resultGold,monsterExp,userId],(err,rows,fields) => {

      db.query(ExpCheckQuery,[userLevel],(err,rows,fields) => {
        console.log(rows[0])

        let needExp = rows[0].NeedExp
        if( resultExp >= needExp){
          db.query(LevelUpQuery,[userId],(err,rows,fields) => {
            db.query(loginQuery, [userId], (err, rows, fields) => {
              const userInfo = userInfoProcess(rows[0])

              res.status(200).json({ code: 200, userInfo: userInfo });
            });

          })
        }else{
          db.query(loginQuery, [userId], (err, rows, fields) => {
            const userInfo = userInfoProcess(rows[0])

            res.status(200).json({ code: 200, userInfo: userInfo });
          });
        }
      })





    })
  

  }





});
