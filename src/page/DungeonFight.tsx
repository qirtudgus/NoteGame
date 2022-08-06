import { useEffect } from 'react';
import styled from 'styled-components';
import createRandomNum from '../util/createRandomNum';

import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import BackHistoryBtn from '../components/BackHistoryBtn';

const BottomBox = styled.div`
  width: 100%;
  height: 300px;
  position: absolute;
  bottom: 0px;
  background: #928282;
`;

const Character = styled.div`
  width: 200px;
  height: 250px;
  background: #555;
  position: relative;
  z-index: 10;
`;

const CharacterBox = styled.div`
  width: 200px;
  height: 300px;
  position: relative;
  z-index: 10;
`;

const CharacterBoxWrap = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-around;
`;

const FloorBox = styled.div`
  align-items: center;
  position: absolute;
  top: 100px;
  font-size: 30px;
  & img {
    width: 50px;
  }
`;

const HpBox = styled.div`
  position: absoulte;
  width: 200px;
  height: 50px;
`;

const HpBar = styled.div`
  position: absolute;
  width: 80%;
  height: 20px;
  background: #fff;
  z-index: 10;
  top: 0;
`;
const BgBar = styled.div`
  position: absolute;
  width: 200px;
  height: 20px;
  background: #000;
  z-index: 9;
  top: 0;
`;

const HpText = styled.div`
  position: absolute;
  height: 20px;
  z-index: 9;
  top: -50px;
`;

const DungeonFight = () => {
  const userInfo = useSelector((state: RootState) => state.login.userInfo);

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

  return (
    <>
      <FloorBox>{userInfo?.DungeonFloor}층</FloorBox>
      <CharacterBoxWrap>
        <CharacterBox>
          <HpBox>
            <HpText>
              <p>70</p>
              <p>/ {userInfo?.BasicHp}</p>
            </HpText>
            <HpBar></HpBar>
            <BgBar></BgBar>
          </HpBox>
          <Character>캐릭터</Character>
        </CharacterBox>
        <CharacterBox>
          <HpBox></HpBox>
          <Character>몬스터</Character>
        </CharacterBox>
      </CharacterBoxWrap>
      <BottomBox></BottomBox>
      <BackHistoryBtn corner></BackHistoryBtn>
    </>
  );
};

export default DungeonFight;
