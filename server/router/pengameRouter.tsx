import express, { Request, Response, NextFunction } from 'express';
import {db} from '../db.js';

export const pengameRouter = express.Router();

pengameRouter.post("/multiple",(req,res,next) => {
    const userId = req.decoded.userId;
    const multipleNumber = req.body.multiple;
    console.log(userId,multipleNumber)

    const userFindQuery = 'SELECT Gold FROM users WHERE ID = ?';
    const multipleQuery = `UPDATE users SET Gold = ? WHERE ID = ?`;
    const loginQuery = 'SELECT * FROM users WHERE ID = ?';

    // UPDATE `notegame_schema`.`users` SET `Gold` = '1' WHERE (`Index` = '36');

    db.query(userFindQuery,[userId],(err,result,fields) => {
        console.log("현재 가지고 있는 골드는 ")
        console.log(result[0].Gold)
        console.log("연산 골드는")
        console.log(result[0].Gold * multipleNumber)
        let resultGold = result[0].Gold * multipleNumber;

        db.query(multipleQuery,[resultGold,userId],(err,result,fields) =>{
            console.log(result)

            db.query(loginQuery,[userId],function(err,rows,fields){
       
                    const userInfo = {
                      Level: rows[0].Level,
                      BasicDamage: rows[0].BasicDamage,
                      BasicHp: rows[0].BasicHp,
                      WeaponDamage:rows[0].WeaponDamage,
                      WeaponHp: rows[0].WeaponHp,
                      Gold:rows[0].Gold,
                    }
                    console.log(userInfo)

                    res.status(200).json({code:200,userInfo:{...userInfo}})
                              }
         )
        })
    })
})