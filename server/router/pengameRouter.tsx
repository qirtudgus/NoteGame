import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';

export const pengameRouter = express.Router();

const userFindQuery = 'SELECT Gold FROM users WHERE ID = ?';
const rewardUpdateQuery = `UPDATE users SET Gold = ? WHERE ID = ?`;
const loginQuery = 'SELECT * FROM users WHERE ID = ?';


pengameRouter.post('/multiple', (req, res, next) => {
  const userId = req.decoded.userId;
  const reward = req.body.reward;
  const speed = req.body.speed;


  db.query(userFindQuery, [userId], (err, result, fields) => {
    let resultGold = parseInt(result[0].Gold) * parseInt(reward);
    console.log(`${userId}님께서 ${result[0].Gold}에서  ${resultGold}가 되었습니다.`)
    db.query(rewardUpdateQuery, [resultGold, userId], (err, result, fields) => {
      db.query(loginQuery, [userId], function (err, rows, fields) {
        const userInfo = {
          Level: rows[0].Level,
          BasicDamage: rows[0].BasicDamage,
          BasicHp: rows[0].BasicHp,
          WeaponDamage: rows[0].WeaponDamage,
          WeaponHp: rows[0].WeaponHp,
          Gold: rows[0].Gold,
        };

        res.status(200).json({ code: 200, userInfo: { ...userInfo } });
      });
    });
  });
});

pengameRouter.post('/add', (req, res, next) => {
  const userId = req.decoded.userId;
  const reward = req.body.reward;
  const speed = req.body.speed;

  db.query(userFindQuery, [userId], (err, result, fields) => {
    let resultGold = parseInt(result[0].Gold) + (parseInt(reward) * speed);

    console.log(`${userId}님께서 ${result[0].Gold}에서  ${resultGold}가 되었습니다.`)
    db.query(rewardUpdateQuery, [resultGold, userId], (err, result, fields) => {
      db.query(loginQuery, [userId], function (err, rows, fields) {
        const userInfo = {
          Level: rows[0].Level,
          BasicDamage: rows[0].BasicDamage,
          BasicHp: rows[0].BasicHp,
          WeaponDamage: rows[0].WeaponDamage,
          WeaponHp: rows[0].WeaponHp,
          Gold: rows[0].Gold,
        };

        res.status(200).json({ code: 200, userInfo: { ...userInfo } });
      });
    });
  });
});

pengameRouter.post('/deduct', (req, res, next) => {
  const userId = req.decoded.userId;
  const reward = req.body.reward;
  const speed = req.body.speed;

  db.query(userFindQuery, [userId], (err, result, fields) => {
    let resultGold = parseInt(result[0].Gold) -(parseInt(reward) * speed);
    console.log(`${userId}님께서 ${result[0].Gold}에서  ${resultGold}가 되었습니다.`)
    console.log(Math.sign(resultGold))
    //음수 방지
    if(Math.sign(resultGold) === -1){
      resultGold = 0
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
        };

        res.status(200).json({ code: 200, userInfo: { ...userInfo } });
      });
    });
  });
});
