import { useEffect } from 'react';
import createRandomNum from '../util/createRandomNum';

const Dungeon = () => {
  useEffect(() => {
    let floor = 1;
    //레벨과 경험치 난수 미리 생성
    let ran = createRandomNum(0, 2);

    //몬스터 레벨 생성 공식 OK
    const createLevel = (floor: number, randomNum: number) => {
      return Math.ceil(floor + (floor * randomNum) / 10);
    };
    const createHp = (floor: number) => {
      return Math.ceil(floor * (520 + floor * createRandomNum(5, 8)));
    };
    let hp = createHp(floor);

    const createExp = (floor: number, hp: number) => {
      return Math.ceil(floor + hp / 200);
    };
    const createDamage = (floor: number) => {
      return Math.ceil(floor + floor * createRandomNum(5, 9));
    };
    console.log(createLevel(floor, ran));
    console.log(hp);
    console.log(createExp(floor, hp));
    console.log(createDamage(floor));
  }, []);

  return <></>;
};

export default Dungeon;
