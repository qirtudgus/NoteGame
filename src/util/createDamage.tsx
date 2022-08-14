import createRandomNum from "./createRandomNum";

//유저데미지 공식
// 1. 리워드데미지 %
// 2. 유저 기본데미지
// 3. 공격력 스킬렙

// 스킬로 인한 추가 데미지

// 리워드로 계산한 최종데미지

export const userDamage = ( reward:number, userDamage:number, betterPen:number):number => {
    console.log(userDamage)
    console.log(betterPen)
    console.log(reward)

    let skillDamage = (userDamage * (betterPen *2)) /100;
    let addDamage = userDamage + skillDamage;
    let resultDamage = Math.ceil(addDamage * (reward / 100))
    
    console.log(resultDamage)
    
    return resultDamage

}
//몬스터 데미지 공식
//1. 몬스터 기본 데미지
//2. 1에서 10까지의 랜덤 난수
export const monsterDamage = (monsterDamage:number):number => {
    let randomNum =  createRandomNum(1,10)
    let resultDamage = Math.ceil(monsterDamage + (monsterDamage * randomNum) / 10);
    return resultDamage
}