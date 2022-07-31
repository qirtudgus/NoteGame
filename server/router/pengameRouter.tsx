import express, { Request, Response, NextFunction } from 'express';
import { db } from '../db.js';

export const pengameRouter = express.Router();

pengameRouter.post('/multiple', (req, res, next) => {
  const userId = req.decoded.userId;
  const multipleNumber = req.body.multiple;
  console.log('곱하기 요청');

  const userFindQuery = 'SELECT Gold FROM users WHERE ID = ?';
  const multipleQuery = `UPDATE users SET Gold = ? WHERE ID = ?`;
  const loginQuery = 'SELECT * FROM users WHERE ID = ?';

  db.query(userFindQuery, [userId], (err, result, fields) => {
    let resultGold = parseInt(result[0].Gold) * multipleNumber;

    console.log(result[0].Gold);
    console.log(multipleNumber);
    console.log(resultGold);

    db.query(multipleQuery, [resultGold, userId], (err, result, fields) => {
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
  const multipleNumber = req.body.add;

  const userFindQuery = 'SELECT Gold FROM users WHERE ID = ?';
  const multipleQuery = `UPDATE users SET Gold = ? WHERE ID = ?`;
  const loginQuery = 'SELECT * FROM users WHERE ID = ?';

  db.query(userFindQuery, [userId], (err, result, fields) => {
    let resultGold = parseInt(result[0].Gold) + multipleNumber;

    console.log(result[0].Gold);
    console.log(multipleNumber);
    console.log(resultGold);

    db.query(multipleQuery, [resultGold, userId], (err, result, fields) => {
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
  const multipleNumber = req.body.deduct;

  const userFindQuery = 'SELECT Gold FROM users WHERE ID = ?';
  const multipleQuery = `UPDATE users SET Gold = ? WHERE ID = ?`;
  const loginQuery = 'SELECT * FROM users WHERE ID = ?';

  db.query(userFindQuery, [userId], (err, result, fields) => {
    let resultGold = parseInt(result[0].Gold) - multipleNumber;

    console.log(result[0].Gold);
    console.log(multipleNumber);
    console.log(resultGold);

    db.query(multipleQuery, [resultGold, userId], (err, result, fields) => {
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
