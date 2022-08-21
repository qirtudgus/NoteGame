import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';
import {userInfoProcess} from '../../src/util/userInfoProcess.js'

export const dungeonRouter = express.Router();

const VictoryBeforeQuery = `UPDATE users SET Gold = Gold + ? ,Exp = Exp + ? WHERE ID = ?`;
const VictoryQuery = `UPDATE users SET DungeonFloor = DungeonFloor + 1, Gold = Gold + ? ,Exp = Exp + ? WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';
const ExpCheckQuery = 'SELECT NeedExp FROM leveltable WHERE Level = ?';
const LevelUpQuery = `UPDATE users SET Level = Level + 1 ,Exp = 0, SkillPoint = SkillPoint + 1 WHERE ID = ?`;
const RevivalPointFindQuery = `SELECT RevivalPoint, DungeonFloor FROM users WHERE Id = ?`
const RevivalUpdateQuery = 'UPDATE users SET DungeonFloor = ?, SkillPoint = SkillPoint + ?, RevivalCount = RevivalCount + 1 ID = ?';
dungeonRouter.post('/victory', (req, res, next) => {
  const userId = req.decoded.userId;
  const { monsterGold, monsterExp,UpGoldHunt, userExp, userLevel } = req.body;
  const resultGold:number = Math.ceil(monsterGold + (monsterGold * UpGoldHunt / 100))

  const resultExp = userExp + monsterExp
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

dungeonRouter.post('/revival',(req,res) => {
  const userId = req.decoded.userId;



  db.query(RevivalPointFindQuery,[userId],(err,rows,fields) => {
  let nowFloor = rows[0].DungeonFloor;
  let revivalPoint = rows[0].RevivalPoint;
  //환생 후 받을 스킬포인트
  let addSkillPoint = Math.floor( nowFloor / 50 );
  //환생 후 돌아갈 층
  let revivalFloor = Math.ceil((nowFloor * revivalPoint / 100));

  db.query(RevivalUpdateQuery,[revivalFloor,addSkillPoint,userId],(err,rows,fields) => {
    console.log(rows)
  })


    db.query(loginQuery, [userId], (err, rows, fields) => {
      const userInfo = userInfoProcess(rows[0])
      res.status(200).json({ code: 200, userInfo: userInfo });
    });
  })
})