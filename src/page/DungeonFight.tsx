import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import createRandomNum from '../util/createRandomNum';

import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import BackHistoryBtn from '../components/BackHistoryBtn';
import { createRandomRewardsArray } from '../util/createRandomRewardsArray';
import { useDispatch } from 'react-redux';

interface penAni {
  penStatus?: boolean;
  ref?: any;
  penSpeed?: number;
}

const animation = keyframes`
  0% {
    transform:translate(-20em);
  }
50%{
  transform:translate(8.5em); 
 }
  100%{
    transform:translate(-20em);
  }
`;

const PenWrap = styled.div<penAni>`
  z-index: 10000;
  position: absolute;
  bottom: 0px;
  left: 570px;
  animation-fill-mode: both;
  animation: ${animation} ${(props) => props.penSpeed}s ease-in-out infinite; //1초동안 선형 무한 속성값주기
  animation-play-state: running;
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}
`;

const Pen = styled.div`
  width: 40px;
  height: 150px;
  background: #fff;
`;
const PenEnd = styled.div<penAni>`
  z-index: 10000;
  width: 1px;
  height: 100px;
  background: rgba(0, 0, 0, 1);
  position: absolute;
  top: 500px;
  left: 590px;
  margin: none;
  animation-fill-mode: both;
  animation: ${animation} ${(props) => props.penSpeed}s ease-in-out infinite; //1초동안 선형 무한 속성값주기
  animation-play-state: running;
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}
`;

const PenHead = styled.div`
  border-radius: 40px 40px 0 0;
  width: 40px;
  height: 60px;
  background: #000;
`;

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

interface HpInterface {
  width: number;
}

const HpBar = styled.div<HpInterface>`
  position: absolute;
  height: 20px;
  background: #c93c3c;
  z-index: 10;
  top: 0;
  width: ${(props) => props.width}%;
`;

const MonsterHpBar = styled.div<HpInterface>`
  position: absolute;
  height: 20px;
  background: #c93c3c;
  z-index: 10;
  top: 0;
  width: ${(props) => props.width}%;
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

const BoxWrap = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
  bottom: 35px;
  z-index: 11;
`;
const Box = styled.div`
  width: 60px;
  padding: 0 10px 0 10px;
  height: 175px;
  background: #fff;
  border: 1px solid#000;
  position: relative;
  font-size: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  word-break: keep-all;
  line-height: 35px;
  &:nth-child(n) {
    border-right: none;
  }
  &:last-child {
    border-right: 1px solid#000;
  }
`;

const StartBtn = styled.div`
  position: absolute;
  right: 40px;
  bottom: 35px;
  width: 175px;
  height: 175px;
  background: #fff;
  text-align: center;
  line-height: 4rem;
  border-radius: 20px;
  font-size: 2rem;
  font-weight: bold;
  z-index: 5000;
`;

const DungeonFight = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [penStatus, setPenSatus] = useState<boolean>(true);
  const [throttle, setThrottle] = useState(false);
  const [userHpBar, setUserHpBar] = useState(100);
  const [monsterHpBar, setMonsterHpBar] = useState(100);
  const inputRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const userInfo: any = useSelector((state: RootState) => state.login.userInfo);
  const randomArr = useCallback(createRandomRewardsArray(6, 'dungeon'), [
    refresh,
  ]);

  const [penSpeed, setPenSpeed] = useState<{ speed: number; text: number }>({
    speed: 0.75,
    text: 1,
  });

  const toggle = () => {
    setPenSatus((penStatus) => !penStatus);
    //체력 퍼센트 구해서 hp바 너비에 할당
    let hp = (70 / userInfo?.BasicHp) * 100;
    console.log(hp);
    setUserHpBar(hp);
    // if (throttle) return;
    // if (!throttle) {
    //   setThrottle(true);
    //   setTimeout(async () => {
    //     setPenSatus((penStatus) => !penStatus);
    //   }, 0);
    // }
  };

  const toggleExit = async () => {
    setPenSatus((penStatus) => !penStatus);

    // await getReward();
  };

  const gameStart = useCallback((e: any) => {
    let startBtn = document.getElementById('startbuttons');
    console.log(e.keyCode);
    if (e.keyCode === 32) {
      startBtn?.click();
    }
  }, []);

  useEffect(() => {
    (() => {
      document.addEventListener('keypress', gameStart);
      console.log('이벤트 등록');
    })();

    return () => {
      console.log('이벤트 제거');

      document.removeEventListener('keypress', gameStart);
    };
  }, [gameStart]);

  // useEffect(() => {
  //   let floor = 1;
  //   //레벨과 경험치 난수 미리 생성
  //   let ran = createRandomNum(0, 2);

  //   //몬스터 레벨 생성 공식 OK
  //   const createLevel = (floor: number, randomNum: number) => {
  //     return Math.ceil(floor + (floor * randomNum) / 10);
  //   };
  //   const createHp = (floor: number) => {
  //     return Math.ceil(floor * (520 + floor * createRandomNum(5, 8)));
  //   };
  //   let hp = createHp(floor);

  //   const createExp = (floor: number, hp: number) => {
  //     return Math.ceil(floor + hp / 200);
  //   };
  //   const createDamage = (floor: number) => {
  //     return Math.ceil(floor + floor * createRandomNum(5, 9));
  //   };
  //   console.log(createLevel(floor, ran));
  //   console.log(hp);
  //   console.log(createExp(floor, hp));
  //   console.log(createDamage(floor));
  // }, []);

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
            <HpBar width={userHpBar}></HpBar>
            <BgBar></BgBar>
          </HpBox>
          <Character>캐릭터</Character>
        </CharacterBox>

        <CharacterBox>
          <HpBox>
            <HpText>
              <p>70</p>
              <p>/ {userInfo?.BasicHp}</p>
            </HpText>
            <MonsterHpBar width={70}></MonsterHpBar>
            <BgBar></BgBar>
          </HpBox>
          <Character>몬스터</Character>
        </CharacterBox>
      </CharacterBoxWrap>

      <PenEnd
        penStatus={penStatus}
        ref={inputRef}
        penSpeed={penSpeed.speed}
      ></PenEnd>
      <PenWrap penSpeed={penSpeed.speed} penStatus={penStatus}>
        <PenHead></PenHead>
        <Pen></Pen>
      </PenWrap>
      <StartBtn
        id='startbuttons'
        onClick={penStatus ? () => toggle() : () => toggleExit()}
      >
        {penStatus ? '시작' : '멈춰'}
      </StartBtn>

      <BoxWrap>
        {randomArr.map((i: any, index: any) => (
          <Box key={index} data-number={i.attackNumber}>
            {i.attackNumber}%
          </Box>
        ))}
      </BoxWrap>

      <BottomBox></BottomBox>
      <BackHistoryBtn corner></BackHistoryBtn>
    </>
  );
};

export default DungeonFight;
