import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import createRandomNum from '../util/createRandomNum';

import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import BackHistoryBtn from '../components/BackHistoryBtn';
import { createRandomRewardsArray } from '../util/createRandomRewardsArray';
import { useDispatch } from 'react-redux';
import {PenWrap,Pen,PenEnd,PenHead} from "../styledComponents/DungeonFight"

interface penAni {
  penStatus?: boolean;
  ref?: any;
  penSpeed?: number;
}

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
  width: number | (() => number);
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
  const [monsterHpBar, setMonsterHpBar] = useState({
    fullHp : 100,
    nowHp: 100,
  });
  const inputRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const userInfo: any = useSelector((state: RootState) => state.login.userInfo);
  const monsterInfo:any = useSelector((state: RootState) => state.monsterInfo.monsterInfo)

  console.log(monsterInfo)

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
              <p>{monsterHpBar.nowHp}</p>
              <p>/ {monsterInfo.monsterFullHp}</p>
              <p>레벨 {monsterInfo.monsterLevel}</p>
              <p>공격력 {monsterInfo.monsterDamage}</p>
              <p>경험치 {monsterInfo.monsterExp}</p>
              <p>골드 {monsterInfo.monsterGold}</p>
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
