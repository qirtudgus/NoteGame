import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { createPenRewardArray } from '../util/createRandomRewardsArray';
import VictoryModal from '../components/VictoryModal';
import createRandomNum from '../util/createRandomNum';
import { monsterArr } from '../util/dungeonMonsterList';
import CharacterBox from '../components/CharacterBox';
import MonsterBox from '../components/MonsterBox';
import FloorBox from '../components/FloorBox';
import Ballpen from '../components/Ballpen';
import { useLocation, useNavigate } from 'react-router-dom';
import { userDamage, monsterDamage } from '../util/createDamage';
import BtnMenu from '../components/BtnMenu';
import RevivalModal from '../components/RevivalModal';
import {
  highRewordEffect,
  damageTextAni,
  choiceRewordEffect,
  startBtnAni,
  startBtnAni2,
} from '../styledComponents/DungeonFight_Effect';
import { LoginUserInfoInterface } from '../modules/login';
import { penObj } from '../util/shopList';
import 칼 from '../img/칼.svg';
import anime, { AnimeInstance } from 'animejs';

const BottomBox = styled.div`
  width: 100%;
  height: 240px;
  border-radius: 0 0 20px 20px;
  position: absolute;
  bottom: 0px;
  background: #928282;
`;

const CharacterBoxWrap = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-around;
`;

const HpBox = styled.div`
  position: absolute;
  top: 0px;
  width: 200px;
  height: 50px;
`;

interface HpInterface {
  width?: number | (() => number);
  damageText?: any;
}

const HpBar = styled.div<HpInterface>`
  transition: all 0.5s;
  position: absolute;
  height: 20px;
  background: #c93c3c;
  z-index: 10;
  top: 0;
  width: ${(props) => props.width}%;
`;

const MonsterHpBar = styled.div<HpInterface>`
  transition: all 0.5s;
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
  width: auto;
  justify-content: center;
  bottom: 70px;
  z-index: 11;
`;
interface highReword {
  highActive?: boolean;
  detailView?: boolean;
}

const Box = styled.div<highReword>`
  width: 60px;
  padding: 0 10px 0 10px;
  height: 140px;
  background: #fff;
  border: 1px solid#9e9e9e;
  position: relative;
  font-size: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  word-break: keep-all;
  line-height: 35px;
  transition: 0.3s all;
  justify-content: center;
  &:nth-child(n) {
    border-right: none;
  }
  &:last-child {
    border-right: 1px solid#9e9e9e;
  }
  //당첨된 리워드에게 이펙트
  &.active > p {
    /* animation: ${choiceRewordEffect} 1s; */
  }

  &.active::after {
    animation: ${choiceRewordEffect} 0.7s ease;
  }

  &::after {
    content: '';
    /* transition: 0.2s; */
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
  }

  //가장 높은 리워드값에 css 부여
  ${(props) =>
    props.highActive &&
    css`
    color:#fff;
    //평소 높은 리워드에 표시할 스타일 
    font-weight: bold;
    font-size: 1.5rem;
    background: linear-gradient(  0deg,
      #ff2819,
      #ffcc32
    );
    background-size: 200% 200%;
    animation: ${highRewordEffect} 1.25s ease-in infinite;

    &::after{
        position: absolute;
    content: "";
    top: -3px;
    left: 0;
    right: 0;
    z-index: -1;
    height: 105%;
    width: 100%;
    transform: scale(1) translateZ(0);
    filter: blur(10px);
    background: linear-gradient(  0deg,
        #ff2819,
        #ffc719
    );
    background-size: 200% 200%;
    animation: ${highRewordEffect} 1.25s ease-in infinite;
    }
    //높은 리워드가 당첨되면 해당 css에 코드를 작성하여 스타일 가능
    &.active{
    //active가 활성화 됐을 때 after 속성도 스타일 지정 가능
    &::after{
      }
    }
}

    `}
`;

interface startBtnSuppressor {
  supp?: boolean;
  color?: number | string;
}

const StartBtn = styled.div<startBtnSuppressor>`
  cursor: pointer;
  position: absolute;
  right: 40px;
  bottom: 70px;
  width: 175px;
  height: 175px;
  background: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 4rem;
  border-radius: 20px;
  font-size: 2rem;
  font-weight: bold;
  z-index: 5000;
  overflow: hidden;

  // 진행중 버튼이 렌더링 될 때
  ${(props) =>
    props.supp &&
    css`
      &::after {
        content: '';

        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        bottom: 0;
        z-index: 2;
        background: rgba(0, 0, 0, 0.3);
        animation: ${startBtnAni} 1.3s linear;
      }
    `}

  //시작버튼이 렌더링 될 때
  ${(props) =>
    props.supp === false &&
    css`
      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        filter: blur(10px);
        z-index: 111;
        background: rgba(255, 255, 255, 1);
        animation: ${startBtnAni2} 0.5s linear;
        animation-fill-mode: forwards;
      }
    `}
`;

const DamageText = styled.div<HpInterface>`
  position: absolute;
  width: 200px;
  left: 350px;
  top: 100px;
  font-size: 30px;
  font-weight: bold;
  opacity: 1;
  z-index: 10000;
  animation: ${damageTextAni} 1s forwards;
  ${(props) =>
    props.damageText &&
    css`
      left: 850px;
    `}
`;

const DetailViewAttackNumber = styled.div`
  display: flex;
  color: #333;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  letter-spacing: 3px;
  position: absolute;
  top: 20px;
`;

//랜덤한 어택애니메이션 액션을 생성하여 CharacterBox의 애니메이션 호출
function randomAttack() {
  let a = createRandomNum(1, 4);
  return 'attack' + a;
}

const DungeonFight = () => {
  const [test, setTest] = useState<boolean>(true);

  const [monsterCall, setMonsterCall] = useState<number | null>(null);

  const [monsterKill, setMonsterKill] = useState<boolean>(false);
  const [highActive, setHighActive] = useState<boolean>(true);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [victoryModal, setVictoryModal] = useState<boolean>(false);
  const [supp, setSupp] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [penStatus, setPenSatus] = useState<boolean>(true);
  const { state } = useLocation();
  const [attackAni, setAttackAni] = useState({
    user: 'attack' + 0,
    monster: false,
    moving: false,
  });

  const [gelatineAni, setGelatineAni] = useState({
    user: false,
    monster: false,
  });
  const [damageText, setDamageText] = useState<{
    user: number | string;
    monster: number | string;
  }>({
    user: '',
    monster: '',
  });

  const [userHpBar, setUserHpBar] = useState({
    HpBarWidth: 100,
    nowHp: 100,
  });
  const [monsterHpBar, setMonsterHpBar] = useState({
    HpBarWidth: 100,
    nowHp: 100,
  });
  const inputRef = useRef() as React.MutableRefObject<HTMLElement>;

  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const monsterInfo: any = useSelector((state: RootState) => state.monsterInfo.monsterInfo);
  const isVisible = useSelector((state: RootState) => state.visibleState.isVisible) as boolean;
  let penReward = penObj.find((i) => i.ballPenName === userInfo.EquipBallpen);

  //볼펜리스트 배열의
  let penRewardArray = useMemo(() => {
    //penObj에서 장착한 볼펜의 인덱스를찾아 rewardList 배열을 찾아 획득하자.
    return createPenRewardArray(penReward?.rewardList!);
  }, [refresh]);

  //useMemo를 사용하여 해결!!!!!!
  // const randomRewardArray = useMemo(() => {
  //   return createRandomRewardsArray(6, 'dungeon');
  // }, [refresh]);

  const navigate = useNavigate();

  const toggle = () => {
    setPenSatus((penStatus) => !penStatus);
  };

  const toggleExit = async () => {
    setPenSatus((penStatus) => !penStatus);
    setSupp(true);
    await getReward();
  };

  const getReward = async (): Promise<void> => {
    //정확한 좌표값을 얻기위해 약간의 딜레이를 주었다.

    setTimeout(function () {
      //y값을 그대로 적용하면 PenEnd 엘레먼트가 반환되기때문에 Box요소에 들어갈 수 있도록 약간 조정합니다.
      // const x: number = inputRef.current.getBoundingClientRect().x;
      // const y: number = inputRef.current.getBoundingClientRect().y - 20;
      let pen = document.querySelector('#penEnd');
      const x: number = pen?.getBoundingClientRect().x as number;
      const y: number = (pen?.getBoundingClientRect().y as number) - 20;

      dropClick(x, y);
    }, 0);
  };

  //###좌표값에 반환되는 요소의 dataset에 따라 dispatch되는 함수다. 모듈화 시켜주자
  function dropClick(x: number, y: number): void {
    const cb = document.elementFromPoint(x, y) as HTMLElement;
    cb.classList.add('active');

    //빗나갈 시 miss를 띄우고 상대방은 유저를 때린다.
    if (cb.dataset.attacknumber === undefined) {
      setDamageText({ ...damageText, monster: 'Miss' });
      // setRefresh((refresh) => !refresh);
      setAttackAni({ user: randomAttack(), monster: false, moving: true });
      setGelatineAni({ user: false, monster: true });
      setTimeout(function () {
        monsterAttack();
      }, 1000);
      return;
    }
    let userResultDamage = userDamage(
      parseInt(cb.dataset.attacknumber as string),
      userInfo.BasicDamage,
      userInfo.WeaponDamage,
      userInfo.BetterPen,
    );
    let hp: number = monsterHpBar.nowHp - userResultDamage;
    let hpbar = Math.ceil((hp / monsterInfo.monsterFullHp) * 100);

    //유저가 승리 시
    if (hp <= 0) {
      setDamageText({ ...damageText, monster: userResultDamage });
      setGelatineAni({ user: false, monster: true });
      setMonsterHpBar({ HpBarWidth: hpbar, nowHp: 0 });
      setAttackAni({ user: randomAttack(), monster: false, moving: true });
      setTimeout(function () {
        setVictoryModal(true);
        setIsModal(true);
        setMonsterKill(true);
      }, 1000);

      return;
    }
    //전투
    setDamageText({ ...damageText, monster: userResultDamage });
    setMonsterHpBar({ HpBarWidth: hpbar, nowHp: hp });
    setAttackAni({ user: randomAttack(), monster: false, moving: true });
    setGelatineAni({ user: false, monster: true });

    setTimeout(function () {
      let box = document.querySelectorAll('.active');
      for (let value of box) {
        value.classList.remove('active');
      }
      monsterAttack();
    }, 1000);
  }

  //몬스터 -> 사용자 공격 함수
  const monsterAttack = () => {
    let resultDamage = monsterDamage(monsterInfo.monsterDamage);
    setDamageText({ ...damageText, user: resultDamage });
    let resultHp = userHpBar.nowHp - resultDamage;
    console.log(resultHp);
    let resultHpBar = Math.ceil((resultHp / userInfo.BasicHp) * 100);
    //몬스터가 승리 시
    // if (resultHp <= 0) {
    //   setAttackAni({ user: 'attack' + 0, monster: true, moving: false });
    //   setGelatineAni({ user: true, monster: false });
    //   setUserHpBar({ HpBarWidth: resultHpBar, nowHp: 0 });

    //   setTimeout(function () {
    //     setVictoryModal(false);
    //     setIsModal(true);
    //   }, 1000);

    //   return;
    // }
    //몬스터가 때릴 시 애니메이션 호출
    setAttackAni({ user: 'attack' + 0, monster: true, moving: false });
    setGelatineAni({ user: true, monster: false });
    setUserHpBar({ HpBarWidth: resultHpBar, nowHp: resultHp });
    setSupp(false);
    //다시 하이리워드에 효과주기
    setRefresh((refresh) => !refresh);
  };

  //현재 체력 할당
  useEffect(() => {
    setMonsterHpBar({ ...monsterHpBar, nowHp: monsterInfo.monsterFullHp });
    setUserHpBar({ HpBarWidth: 100, nowHp: userInfo.BasicHp });
    setMonsterCall(createRandomNum(0, monsterArr.length - 1));
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const gameStart = useCallback((e: any) => {
    console.log('이벤트');
    let startBtn: HTMLElement = document.getElementById('startbuttons') as HTMLElement;
    let nextBtn: HTMLElement = document.getElementById('nextBtn') as HTMLElement;
    if (e.keyCode === 32) {
      if (nextBtn) {
        nextBtn.click();
        return;
      }
      if (startBtn) {
        startBtn.click();
        return;
      }
    }
  }, []);

  const animationRef = React.useRef<any>(null);

  const testFunc = () => {
    let a = () => {
      animationRef.current.pause();
      getReward();
    };
    //토글되는 함수를 여기서 분기를 나누면 요소에는 하나의 함수만 주어도 된다...굿
    test ? animationRef.current.play() : a();
    setTest((prev) => !prev);
  };

  useEffect(() => {
    (() => {
      document.addEventListener('keypress', gameStart);
    })();
    return () => {
      document.removeEventListener('keypress', gameStart);
    };
  }, [gameStart]);

  useEffect(() => {
    // https://newdevzone.com/posts/how-to-use-animejs-inside-react

    animationRef.current = anime({
      targets: '#penEnd, #penEnd2',
      translateX: 270,
      duration: 500,
      direction: 'alternate', //번갈아 재생
      loop: true, // number는 횟수 true는 무한
      easing: 'easeInOutSine',
      autoplay: false,
    });
  }, []);

  //새로고침 시 몬스터체력이 0이되어 바로 다음층으로 진입이 가능하다.
  //이를 방지하여 렌더링시 체력을 체크하여 dungeon으로 보낸다.
  if (monsterInfo.monsterFullHp === 0) navigate(-1);

  //공격 리워드중 높은 값을 리턴하여 스타일드컴포넌트 조건부렌더링에 사용
  // function highRewordNum(): number {
  //   let result = Math.max(...randomRewardArray.map((i: any) => i['attackNumber']));
  //   return result;
  // }

  //공격 리워드중 높은 값을 리턴하여 스타일드컴포넌트 조건부렌더링에 사용
  function highRewordNum2(): number | undefined {
    if (!penRewardArray) return;
    let result = Math.max(...penRewardArray);
    return result;
  }

  return (
    <>
      {/* {monsterInfo.monsterFullHp === 0 ? <RevivalModal></RevivalModal> : null} */}
      {isModal ? (
        <VictoryModal
          isModal={victoryModal}
          huntExp={monsterInfo.monsterExp}
          huntGold={monsterInfo.monsterGold}
          before={state}
        ></VictoryModal>
      ) : null}
      <FloorBox before={state}></FloorBox>
      <CharacterBoxWrap>
        {gelatineAni.user ? <DamageText>-{damageText.user}</DamageText> : null}

        <CharacterBox
          gelatine={gelatineAni.user}
          attack={attackAni.user}
          moving={attackAni.moving}
        >
          <HpBox>
            {isVisible ? (
              <HpText>
                <p>{userHpBar.nowHp}</p>
                <p>/ {userInfo.BasicHp}</p>
              </HpText>
            ) : null}

            <HpBar width={userHpBar.HpBarWidth}></HpBar>
            <BgBar></BgBar>
          </HpBox>
        </CharacterBox>

        {gelatineAni.monster ? <DamageText damageText>-{damageText.monster}</DamageText> : null}
        <MonsterBox
          id='monsterBox'
          gelatine={gelatineAni.monster}
          monsterKill={monsterKill}
          monsterCall={monsterCall as number}
          attack={attackAni.monster}
        >
          <HpBox>
            {isVisible ? (
              <HpText>
                <p>{monsterHpBar.nowHp}</p>
                <p>/ {monsterInfo.monsterFullHp}</p>
              </HpText>
            ) : null}

            <MonsterHpBar width={monsterHpBar.HpBarWidth}></MonsterHpBar>
            <BgBar></BgBar>
          </HpBox>
        </MonsterBox>
      </CharacterBoxWrap>

      <Ballpen
        penStatus={penStatus}
        isDungeon={true}
      ></Ballpen>

      {/* {supp ? (
        <StartBtn
          supp={supp}
          id='startbuttons'
          color='#fff'
        >
          멈춰
          <p>Space Bar</p>
        </StartBtn>
      ) : (
        <StartBtn
          supp={supp}
          id='startbuttons'
          color={penStatus ? '#ffbc26' : '#fff'}
          onClick={penStatus ? () => toggle() : () => toggleExit()}
        >
          {penStatus ? '시작' : '멈춰'}
          <p>Space Bar</p>
        </StartBtn>
      )} */}
      <button
        id='aniPlay'
        onClick={() => testFunc()}
        // onClick={test ? () => testPlay() : () => testPause()}
      >
        {test ? '애니메이션 플레이' : '애니메이션 정지 '}
      </button>
      <button
        id='aniStop'
        // onClick={() => {
        //   animation.pause();
        //   getReward();
        // }}
        // onClick={() => testFunc2()}
      >
        애니메이션 정지
      </button>

      {penRewardArray ? (
        <BoxWrap as='div'>
          {penRewardArray.map((i: any, index: any) => (
            <>
              {highRewordNum2() === i ? (
                <Box
                  highActive={highActive}
                  key={index}
                  data-attacknumber={i}
                >
                  {isVisible ? (
                    <>
                      <DetailViewAttackNumber>
                        <img
                          src={칼}
                          alt='칼'
                        ></img>
                        x
                        {Math.ceil(
                          monsterHpBar.nowHp /
                            userDamage(i, userInfo.BasicDamage, userInfo.WeaponDamage, userInfo.BetterPen),
                        )}
                      </DetailViewAttackNumber>
                    </>
                  ) : null}
                  <p>{i}%</p>
                </Box>
              ) : (
                <Box
                  key={index}
                  data-attacknumber={i}
                >
                  {isVisible ? (
                    <>
                      <DetailViewAttackNumber>
                        <img
                          src={칼}
                          alt='칼'
                        ></img>
                        x
                        {Math.ceil(
                          monsterHpBar.nowHp /
                            userDamage(i, userInfo.BasicDamage, userInfo.WeaponDamage, userInfo.BetterPen),
                        )}
                      </DetailViewAttackNumber>
                    </>
                  ) : null}
                  <p>{i}%</p>
                </Box>
              )}
            </>
          ))}
        </BoxWrap>
      ) : null}

      <BottomBox></BottomBox>
      <BtnMenu
        BackHistory
        Home
        DetailView
      ></BtnMenu>
    </>
  );
};

export default React.memo(DungeonFight);
