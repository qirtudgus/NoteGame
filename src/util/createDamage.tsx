import createRandomNum from './createRandomNum';

//유저데미지 공식
// 1. 리워드데미지 %
// 2. 유저 기본데미지
// 3. 공격력 스킬렙
// 4. 유저 무기데미지
// 스킬로 인한 추가 데미지

// 리워드로 계산한 최종데미지

export const userDamage = (
  reward: number,
  basicDamage: number,
  weaponDamage: number,
  betterPen: number,
  useDoubleAttack?: boolean,
): number => {
  // 유저의 기본데미지에 스킬렙만큼(n*2%)의 데미지를 구한다.
  let userDamage = basicDamage + weaponDamage;

  let skillDamage = (userDamage * (betterPen * 2)) / 100;
  // 기본데미지에 스킬데미지를 합산
  let addDamage = userDamage + skillDamage;

  // reward로 뽑은만큼의 데미지를 계산하여 반환
  let resultUserDamage = Math.ceil(addDamage * (reward / 100));
  if (useDoubleAttack === true) {
    return resultUserDamage * 2;
  } else {
    return resultUserDamage;
  }
};
//몬스터 데미지 공식
//1. 몬스터 기본 데미지
//2. 1에서 10까지의 랜덤 난수
export const monsterDamage = (monsterDamage: number): number => {
  let randomNum = createRandomNum(1, 10);
  let resultDamage = Math.ceil(monsterDamage + (monsterDamage * randomNum) / 10);
  return resultDamage;
};
