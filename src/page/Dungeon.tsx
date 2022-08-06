import { useEffect } from 'react';
import styled from 'styled-components';
import createRandomNum from '../util/createRandomNum';
import arrowRight from '../img/오른쪽화살표.svg';
import arrowLeft from '../img/왼쪽화살표.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';

const BottomBox = styled.div`
  width: 100%;
  height: 300px;
  position: absolute;
  bottom: 0px;
  background: #928282;
`;
const CharacterBox = styled.div`
  width: 200px;
  height: 300px;
  background: #555;
  position: relative;
  z-index: 10;
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

const MoveBox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 30px;
  font-size: 30px;
  & img {
    width: 50px;
  }
`;

const MoveBox2 = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 30px;
  font-size: 30px;
  & img {
    width: 50px;
  }
`;

const MoveBoxWrap = styled.div`
  width: 100%;
  display: flex;
`;

const Dungeon = () => {
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

      <MoveBoxWrap>
        <MoveBox>
          <img src={arrowLeft}></img>이전 층으로
        </MoveBox>
        <MoveBox2>
          도전<img src={arrowRight}></img>
        </MoveBox2>
      </MoveBoxWrap>
      <CharacterBox>캐릭터</CharacterBox>
      <BottomBox></BottomBox>
    </>
  );
};

export default Dungeon;
