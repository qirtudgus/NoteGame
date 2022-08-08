import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import BackHistoryBtn from '../components/BackHistoryBtn';
import { createRandomRewardsArray } from '../util/createRandomRewardsArray';
import { useDispatch } from 'react-redux';
import {PenWrap,Pen,PenEnd,PenHead,gelatine} from "../styledComponents/DungeonFight"
import { dungeon_request } from '../modules/login';
import { useNavigate } from 'react-router-dom';

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

interface dungeonAni{
  gelatine:boolean;
}

const CharacterBox = styled.div<dungeonAni>`
  width: 200px;
  height: 300px;
  position: relative;
  z-index: 10;
  ${(props) => props.gelatine &&
    css`
  animation: ${gelatine} 0.35s;

  `}
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
  width?: number | (() => number);
  damageText?:any
}

const HpBar = styled.div<HpInterface>`
transition:all 0.5s;

  position: absolute;
  height: 20px;
  background: #c93c3c;
  z-index: 10;
  top: 0;
  width: ${(props) => props.width}%;
`;

const MonsterHpBar = styled.div<HpInterface>`
transition:all 0.5s;
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

interface startBtnSuppressor{
  supp?:boolean;
}

const StartBtn = styled.div<startBtnSuppressor>`
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
const StartBtn2 = styled.div<startBtnSuppressor>`
  position: absolute;
  right: 40px;
  bottom: 35px;
  width: 175px;
  height: 175px;
  background: #333;
  text-align: center;
  line-height: 4rem;
  border-radius: 20px;
  font-size: 2rem;
  font-weight: bold;
  z-index: 5000;

`;


const damageTextAni = keyframes`
from { opacity: 1; top:70px; }  
to { opacity: 0;top:0px;  }
`

const DamageText = styled.div<HpInterface>`
position:absolute;
width:200px;
left:350px;
top:100px;
font-size:30px;
font-weight:bold;
opacity:1;
z-index:10000;
animation:${damageTextAni} 1s forwards;

${(props) => props.damageText && css`
left:850px;
`}
`



const DungeonFight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [supp, setSupp] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [penStatus, setPenSatus] = useState<boolean>(true);
  // const [gelatineAni, setGelatineAni] = useState<boolean>(false);
  const [gelatineAni, setGelatineAni] = useState({
    user : false,
    monster: false,
  });
  const [damageText, setDamageText] = useState<{user: number | string, monster: number | string}>({
    user : '',
    monster: '',
  });

  const [throttle, setThrottle] = useState(false);
  const [userHpBar, setUserHpBar] = useState({
    HpBarWidth : 100,
    nowHp: 100,
  });
  const [monsterHpBar, setMonsterHpBar] = useState({
    HpBarWidth : 100,
    nowHp: 100,
  });
  const inputRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const userInfo: any = useSelector((state: RootState) => state.login.userInfo);
  const monsterInfo:any = useSelector((state: RootState) => state.monsterInfo.monsterInfo)

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
    setSupp(true)

    await getReward();
  };

  const getReward = async () => {
    //정확한 좌표값을 얻기위해 약간의 딜레이를 주었다.
    setTimeout(function () {
      //y값을 그대로 적용하면 PenEnd 엘레먼트가 반환되기때문에 Box요소에 들어갈 수 있도록 약간 조정합니다.
      const x = inputRef.current.getBoundingClientRect().x;
      const y = inputRef.current.getBoundingClientRect().y - 10;
      dropClick(x, y);
    }, 400);
  };

   //###좌표값에 반환되는 요소의 dataset에 따라 dispatch되는 함수다. 모듈화 시켜주자
   function dropClick(x: number, y: number): void {
    const cb: any = document.elementFromPoint(x, y);

    let damage = cb.dataset.attacknumber;
    let userDamage = userInfo.BasicDamage;
    let resultDamage = userDamage * (damage / 100);
    let hp:number = monsterHpBar.nowHp - resultDamage;
    let hpbar = Math.ceil( (hp / monsterInfo.monsterFullHp) * 100);
    if(hp <= 0){
      setGelatineAni({user:false,monster:true})
      setMonsterHpBar({HpBarWidth:hpbar,nowHp:0})
      dispatch(dungeon_request(monsterInfo.monsterGold,monsterInfo.monsterExp))
      // navigate(-1)
      return
    }
    setDamageText({monster:resultDamage,user:monsterInfo.monsterDamage})
    setMonsterHpBar({HpBarWidth:hpbar,nowHp:hp})
    setRefresh((refresh) => !refresh)
    setGelatineAni({user:false,monster:true})


    setTimeout(function(){
      monsterAttack()
    },1000)
  }

  //몬스터 -> 사용자 공격 함수
  const monsterAttack = () => {
    let damage = monsterInfo.monsterDamage;
    let userHp = userHpBar.nowHp;
    let resultHp = userHp - damage;
    let resultHpBar = Math.ceil( resultHp / userInfo.BasicHp * 100)
    setGelatineAni({user:true,monster:false})
    setUserHpBar({HpBarWidth:resultHpBar, nowHp:resultHp})
    setSupp(false)
  }


 

  //현재 체력 할당
  useEffect(()=>{
    setMonsterHpBar({...monsterHpBar,nowHp: monsterInfo.monsterFullHp})
    setUserHpBar({HpBarWidth:100, nowHp: userInfo.BasicHp})
  },[])

  const gameStart = useCallback((e: any) => {
    let startBtn = document.getElementById('startbuttons');
    if (e.keyCode === 32) {
      startBtn?.click();
    }
  }, []);

  useEffect(() => {
    (() => {
      document.addEventListener('keypress', gameStart);
    })();
    return () => {
      document.removeEventListener('keypress', gameStart);
    };
  }, [gameStart]);

  return (
    <>
      <FloorBox>{userInfo?.DungeonFloor}층</FloorBox>
      <CharacterBoxWrap>
      {gelatineAni.user? <DamageText>-{damageText.user}</DamageText>: null}
        <CharacterBox gelatine={gelatineAni.user}>
          <HpBox>
            <HpText>
              <p>{userHpBar.nowHp}</p>
              <p>/ {userInfo?.BasicHp}</p>
            </HpText>
            <HpBar width={userHpBar.HpBarWidth}></HpBar>
            <BgBar></BgBar>
          </HpBox>
          <Character>캐릭터</Character>
        </CharacterBox>

        {gelatineAni.monster ? <DamageText damageText>-{damageText.monster}</DamageText>: null}
        <CharacterBox id='monsterBox' gelatine={gelatineAni.monster}>
          <HpBox>
            <HpText>
              <p>{monsterHpBar.nowHp}</p>
              <p>/ {monsterInfo.monsterFullHp}</p>
              <p>레벨 {monsterInfo.monsterLevel}</p>
              <p>공격력 {monsterInfo.monsterDamage}</p>
              <p>경험치 {monsterInfo.monsterExp}</p>
              <p>골드 {monsterInfo.monsterGold}</p>
            </HpText>
            <MonsterHpBar width={monsterHpBar.HpBarWidth}></MonsterHpBar>
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


{supp ? 
 <StartBtn2
 id='startbuttons'

>
 {penStatus ? '중지' : '중지'}
</StartBtn2>
:
<StartBtn
id='startbuttons'
onClick={
  
  penStatus ? () => toggle() : () => toggleExit()}
>
{penStatus ? '시작' : '멈춰'}
</StartBtn>
}
     
     

      <BoxWrap>
        {randomArr.map((i: any, index: any) => (
          <Box key={index} data-attacknumber={i.attackNumber}>
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
