import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginUserInfoInterface } from '../modules/login';

//연산 요소
import { userDamage, monsterDamage } from '../util/createDamage';
import createRandomNum from '../util/createRandomNum';
import getPenPointCoords from '../util/getPenPointCoords';

//화면 요소
import BtnMenu from '../components/BtnMenu';
import CharacterBox from '../components/CharacterBox';
import MonsterBox from '../components/MonsterBox';
import FloorBox from '../components/FloorBox';
import Pen from '../components/Pen';
import anime from 'animejs';
import VictoryModal from '../components/VictoryModal';
import { penObj } from '../util/shopList';
import { monsterArr } from '../util/dungeonMonsterList';
import RewardListBox from '../components/RewardListBox';
import sleep from '../util/sleep';
// import 더블어택 from '../img/effect/더블어택한번.gif';
// import 하이리워드 from '../img/effect/하이리워드이펙트_수정2.gif';
// import 평타 from '../img/effect/슬블_수정.gif';
import DungeonSkill from '../components/DungeonSkill';
import { StartBtn } from './NewPenGame';
// interface p {
//   view: boolean;
// }
interface effectCoord {
  top?: number;
  left?: number;
}
const AttackEffect = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 550px;
`;

const effact = keyframes`
0% {scale:0; border: 10px solid#333; }
50% { border: 40px solid#333;}
100%{scale:1; border: 0px solid#333;}
`;

const AttackEffectDiv = styled.div<effectCoord>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 250px;
  border-radius: 100%;
  position: relative;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  z-index: 1000;
  scale: 0;
  animation-name: ${effact};
  animation-duration: 0.32s;
  animation-fill-mode: backwards;
  animation-iteration-count: 1;
  animation-delay: 0.4s;
  animation-timing-function: ease;
  border: 10px solid#333;
`;

const lineEffect = keyframes`
from {scale:0; }
100%{scale:1;}
`;

const AttackEffectDiv2 = styled.div`
  width: 500px;
  height: 10px;
  border-radius: 100%;
  top: -20px;
  transform: rotate(30deg);
  background-color: #333;
  /* border-radius: 100%; */
  position: absolute;
  transform-origin: 0 100% 0;
  scale: 0;
  animation: ${lineEffect} 0.31s 1 ease backwards;
  animation-delay: 0.39s;
  z-index: 2;
`;

const ShineEffect = keyframes`
  from {opacity:0}
  50% {opacity:1}
  to {opacity:0}
`;

const AttackEffectDiv3 = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 100%;
  position: absolute;
  background: #fff;
  animation: ${ShineEffect} 0.9s 1 ease forwards;
`;

// const DoubleAttackEffect = styled.div<p>`
//   position: absolute;
//   transform: scaleX(-1);
//   left: 200px;
//   display: none;
//   z-index: 1000;

//   ${(props) =>
//     props.view &&
//     css`
//       display: block;
//     `}
// `;

const bottomBoxAttackEffect = keyframes`
  0% { transform: translateY(0);}
  20% { transform: translateY(60px);}
  50% { transform: translateY(0px);}
  70% { transform: translateY(15px);}
  100% { transform: translateY(0px);}

`;

interface bottomBoxEffect {
  attackEffect: boolean;
}

const BottomBox = styled.div<bottomBoxEffect>`
  width: 100%;
  height: 240px;
  border-radius: 0 0 20px 20px;
  position: absolute;
  bottom: 0px;
  background: #928282;
  ${(props) =>
    props.attackEffect &&
    css`
      animation: ${bottomBoxAttackEffect} 0.6s ease;
      animation-delay: 0.39s;
    `}
`;

const FightZone = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;
`;

const FightState = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 150px;
  width: 800px;
  height: 80px;
`;

interface hp {
  monster?: boolean;
  hpBar?: number;
}

//각 애니메이션이 진행될 속도를 넣어두자
const animationSpeed = {
  hp: 0.5, // 체력이 다는 속도
  penAni: 500, // 펜 움직이는 속도
  characterMoving: 1000, // 캐릭터가 움직이러 가는 속도
};

const UserHpBar = styled.div<hp>`
  width: 40%;
  height: 40px;
  background: #242222;
  border-radius: 25px 0 0 25px;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
`;
const MonsterHpBar = styled.div<hp>`
  width: 40%;
  height: 40px;
  background: #242222;
  border-radius: 0 25px 25px 0;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
`;
const UserHpNowBar = styled.div<hp>`
  height: 40px;
  background: #ca0000;
  transition: ${animationSpeed.hp}s all;
  transition-delay: 0.3s;
  width: ${(props) => props.hpBar}%;
`;
const MonsterHpNowBar = styled.div<hp>`
  height: 40px;
  background: #ca0000;
  transition: ${animationSpeed.hp}s all;
  transition-delay: 0.4s;
  width: ${(props) => props.hpBar}%;
`;

const HpTextWrap = styled.div`
  display: flex;
  position: absolute;
  width: 800px;
  justify-content: space-between;
  top: 65px;
`;

const HpText = styled.p`
  font-size: 1.4rem;
  width: auto;
`;

const damageTextAnimation = keyframes`
    from{ opacity:0; transform:translateY(0)}
    40%{ opacity:0;}
    41%{ opacity:1;}
    to{opacity:1; transform:translateY(-100px)}
`;

interface textCoords {
  textLeft?: number;
}

const DamageText = styled.p<textCoords>`
  z-index: 1111;
  position: absolute;
  left: ${(props) => props.textLeft}px;
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Damage' !important;
  animation: ${damageTextAnimation} 1s;
`;

const NewDungeonFight = () => {
  const navigate = useNavigate();
  const penAnimeRef = useRef<any>(null);
  const characterAnimeRef = useRef<any>(null);
  //더블어택 사용유무
  const [doubleAttack, setDoubleAttack] = useState<boolean>(false);
  const [doubleAttackCount, setDoubleAttackCount] = useState(1);
  //이펙트를 담아둔 상태값
  // const [effectImg, setEffectImg] = useState<string>(평타);

  //이펙트컴포넌트의 위치값
  const [effectCoords, setEffectCoords] = useState({ top: 0, left: 0 });

  //이겼을 때 모달 상태
  const [isModal, setIsModal] = useState<boolean>(false);
  const [victoryModal, setVictoryModal] = useState<boolean>(false);
  //이전층 유무
  const { state } = useLocation();
  //볼펜의 위치
  const penCoords = { top: 660, left: 280 };
  //볼펜의 움직임 여부
  const [penAnimation, setPenAnimation] = useState(true);
  //리워드의 새로고침 여부
  const [refresh, setRefresh] = useState(true);
  //전투 진행동안 시작버튼 제어여부
  const [startBtn, setStartBtn] = useState(false);
  //어떤 몬스터가 나올지의 상태값
  const [monsterCall, setMonsterCall] = useState<number | null>(null);
  //몬스터의 능력치값
  const monsterInfo: any = useSelector((state: RootState) => state.monsterInfo.monsterInfo);
  //몬스터 처치 여부
  const [monsterKill, setMonsterKill] = useState<boolean>(false);

  //유저의 능력치값
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  //유저와 몬스터가 입히는 데미지텍스트
  const [damageText, setDamageText] = useState({
    userAttackDamage: '',
    monsterAttackDamage: '',
  });

  //유저와 몬스터의 HP상태값
  const [hp, setHp] = useState({
    userHp: 0,
    userHpBar: 100,
    monsterHp: 0,
    monsterHpBar: 100,
  });
  //어떤 공격 모션을 취할지에대한 상태값
  const [attackAni, setAttackAni] = useState({
    user: 'attack' + 0,
    monster: false,
    userHit: false,
    monsterHit: false,
    userNomally: true,
    doubleAttack: false,
    highRewardEffect: false,
  });
  //새로고침 시 뒤로가기 (잘못된 플레이 방지)
  if (monsterInfo.monsterFullHp === 0) navigate(-1);
  //디테일 뷰 상태값
  const isDetailVisible = useSelector((state: RootState) => state.visibleState.isVisible) as boolean;

  //도움말 열린지 여부값
  const isHelpVisible = useSelector((state: RootState) => state.userInfo_visibleRequest.isVisible);

  //더블어택 함수
  const useDoubleAttack = () => {
    let setToggle = () => {
      setDoubleAttack((prev) => !prev);
    };
    let setFalse = () => {
      setDoubleAttack(false);
    };
    doubleAttackCount === 1 ? setToggle() : setFalse();
  };

  //시작 버튼 함수
  const penAnimationStart = () => {
    let a = () => {
      penAnimeRef.current.pause();
      getRewardElement(getPenPointCoords().x, getPenPointCoords().y - 50);
      setStartBtn(true);
    };
    penAnimation ? penAnimeRef.current.play() : a();
    setPenAnimation(false);
  };

  //스페이스바로 게임 시작
  const gameStart = useCallback(
    (e: any) => {
      console.log('이벤트');
      if (isHelpVisible === true) {
        return false;
      }
      let startBtn: HTMLElement = document.getElementById('StartBtn') as HTMLElement;
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
    },
    [isHelpVisible],
  );

  function randomAttack(): string {
    return 'attack' + createRandomNum(1, 3);
  }
  function randomEffectCoords() {
    const top = createRandomNum(-50, 50);
    const left = createRandomNum(-100, 100);
    return { top, left };
  }

  //해당 좌표의 엘레먼트를 반환
  const getRewardElement = async (x: number, y: number) => {
    const reward = document.elementFromPoint(x, y) as HTMLElement;
    reward.classList.add('active');
    const rewardNumber = reward.dataset.attacknumber;
    if (rewardNumber === undefined) {
      MonsterAttack();
      return;
    }

    //이펙트 좌표 랜덤연산
    setEffectCoords({ ...randomEffectCoords() });
    //유저데미지 연산
    const userResultDamage = userDamage(
      parseInt(rewardNumber as string),
      userInfo.BasicDamage,
      userInfo.WeaponDamage,
      userInfo.BetterPen,
      doubleAttack,
    );

    //하이리워드를 획득했는지 보려면... 무기의 리워드 최대값과, 획득한 리워드과 동일한지 체크하는 if문을 걸면 되겠다.
    const hi = penObj.find((i) => i.ballPenName === userInfo.EquipBallpen)?.rewardList as number[];
    if (Number(rewardNumber) === Math.max(...hi)) {
      // setEffectImg(하이리워드);
    }

    if (doubleAttack === true) {
      setDoubleAttack(false);
      setDoubleAttackCount(0);
      // setEffectImg(더블어택);
      setTimeout(() => {
        setAttackAni((prev) => ({ ...prev, doubleAttack: true }));
      }, 350);
    }
    //남은 몬스터 체력 계산
    const monsterHp: number = hp.monsterHp - userResultDamage;
    const monsterHpBar: number = Math.ceil((monsterHp / monsterInfo.monsterFullHp) * 100);
    if (monsterHp <= 0) {
      setAttackAni((prev) => ({ ...prev, userNomally: false }));
      setAttackAni((prev) => ({ ...prev, user: randomAttack(), monsterHit: true }));
      // setHp({ ...hp, monsterHp, monsterHpBar });
      setHp((prev) => ({ ...prev, monsterHp: 0, monsterHpBar: 0 }));
      characterAnimeRef.current.play();
      setDamageText({ ...damageText, userAttackDamage: userResultDamage.toLocaleString() + '' });
      setTimeout(() => {
        setAttackAni((prev) => ({ ...prev, doubleAttack: true }));
      }, 200);
      setTimeout(function () {
        setAttackAni({ ...attackAni, monsterHit: false });
        setVictoryModal(true);
        setIsModal(true);
        setMonsterKill(true);
      }, 1000);
      return;
    }
    setAttackAni((prev) => ({ ...prev, userNomally: false }));
    setAttackAni((prev) => ({ ...prev, user: randomAttack(), monsterHit: true }));

    setTimeout(() => {
      setAttackAni((prev) => ({ ...prev, doubleAttack: true }));
    }, 200);

    setHp((prev) => ({ ...prev, monsterHp, monsterHpBar }));
    characterAnimeRef.current.restart();
    setDamageText({ ...damageText, userAttackDamage: userResultDamage.toLocaleString() + '' });

    setTimeout(() => {
      let box = document.querySelectorAll('.active');
      for (let value of box) {
        value.classList.remove('active');
      }
      MonsterAttack();
    }, animationSpeed.characterMoving);
  };

  const MonsterAttack = async () => {
    // 몬스터 어택 플로우
    // 1 - 몬스터 데미지 산정
    // 2 - 데미지를 입은 사용자의 체력과 체력게이지(%) 산정
    // 3 - 사용자체력이 0일경우(패배)와 아닌 경우(전투 진행)으로 나뉜다.
    // 패배 1 - 몬스터가 사용자를 때린다.
    // 패배 2 - 사용자의 체력이 깎인다.
    // 패배 3 - 몬스터 데미지 출력
    // 패배 4 - 1초 뒤 몬스터 데미지 제거, 결과창을 띄운다.
    // 전투 진행 1 - 몬스터가 사용자를 때린다.
    // 전투 진행 2 - 사용자의 체력이 깎인다.
    // 전투 진행 3 - 몬스터 데미지 출력
    // 전투 진행 4 - 1초 뒤 캐릭애니메이션, 시작버튼, 이펙트이미지 초기화하고 Refresh를 토글하여 리워드리스트 교체

    const monsterResultDamage = monsterDamage(monsterInfo.monsterDamage);
    const userHp = hp.userHp - monsterResultDamage;
    const userHpBar = Math.ceil((userHp / (userInfo.BasicHp + userInfo.WeaponHp)) * 100);
    if (userHp <= 0) {
      setAttackAni({ ...attackAni, monster: true, userHit: true });
      setHp((prev) => ({ ...prev, userHp: 0, userHpBar: 0 }));
      setDamageText({ ...damageText, monsterAttackDamage: monsterResultDamage.toLocaleString() + '' });
      setTimeout(function () {
        //패배시 남아있는 데미지 텍스트 제거
        setAttackAni({ ...attackAni, userHit: false });
        setVictoryModal(false);
        setIsModal(true);
      }, 1000);
      return;
    }
    setAttackAni({ ...attackAni, monster: true, userHit: true });
    setHp((prev) => ({ ...prev, userHp, userHpBar }));
    setDamageText({ ...damageText, monsterAttackDamage: monsterResultDamage.toLocaleString() + '' });

    //한번 초기화를 해주면 애니메이션 정상 작동
    //초기화는 몬스터무빙 애니메이션까지 끝난 뒤 해야하기때문에 몬스터 애니메이션과 같은 값으로 준다.
    await sleep(1);
    setAttackAni({
      user: 'attack0',
      monster: false,
      userHit: false,
      monsterHit: false,
      userNomally: true,
      doubleAttack: false,
      highRewardEffect: false,
    });
    // setEffectImg(평타);
    setPenAnimation(true);
    setRefresh((prev) => !prev);
    //마지막에 스타트버튼에 함수를 활성화시켜 전투가 끝나기전까지는 제한된다.
    setStartBtn(false);
  };

  useEffect(() => {
    penAnimeRef.current = anime({
      targets: '#penBody',
      translateX: 400,
      // duration: animationSpeed.penAni,
      duration: userInfo.DungeonPenSpeed,
      direction: 'alternate', //번갈아 재생
      loop: true, // number는 횟수 true는 무한
      easing: 'easeInOutSine',
      autoplay: false,
    });
    characterAnimeRef.current = anime({
      targets: '#CharacterBox',
      translateX: 250,
      keyframes: [{ translateX: 0 }, { translateX: 270 }, { translateX: 270 }, { translateX: 0 }],
      easing: 'easeInOutSine',
      duration: animationSpeed.characterMoving,
      autoplay: false,
    });
  }, []);
  // 스페이스바에 게임시작 이벤트 등록
  useEffect(() => {
    (() => {
      document.addEventListener('keypress', gameStart);
    })();
    return () => {
      document.removeEventListener('keypress', gameStart);
    };
  }, [gameStart]);
  // 몬스터 호출
  //현재 체력 할당
  useEffect(() => {
    setHp({ ...hp, userHp: userInfo.BasicHp + userInfo.WeaponHp, monsterHp: monsterInfo.monsterFullHp });
    setMonsterCall(createRandomNum(0, monsterArr.length - 1));
  }, []);

  return (
    <>
      {attackAni.monsterHit && (
        <AttackEffect>
          <AttackEffectDiv
            top={effectCoords.top}
            left={effectCoords.left}
          >
            <AttackEffectDiv2></AttackEffectDiv2>
            <AttackEffectDiv3></AttackEffectDiv3>
          </AttackEffectDiv>
        </AttackEffect>
      )}

      {isModal ? (
        <VictoryModal
          isModal={victoryModal}
          huntExp={monsterInfo.monsterExp}
          huntGold={monsterInfo.monsterGold}
          floorInput={state}
        ></VictoryModal>
      ) : null}
      <FightState>
        <HpTextWrap>
          <HpText>
            {hp.userHp} / {userInfo.BasicHp + userInfo.WeaponHp}
          </HpText>
          <HpText>
            {hp.monsterHp} / {monsterInfo.monsterFullHp}
          </HpText>
        </HpTextWrap>

        <UserHpBar>
          <UserHpNowBar hpBar={hp.userHpBar}></UserHpNowBar>
        </UserHpBar>
        <FloorBox floorInput={state}></FloorBox>
        <MonsterHpBar monster={true}>
          <MonsterHpNowBar hpBar={hp.monsterHpBar}></MonsterHpNowBar>
        </MonsterHpBar>
      </FightState>
      <FightZone>
        {attackAni.userHit ? <DamageText textLeft={300}>{damageText.monsterAttackDamage}</DamageText> : null}

        <CharacterBox
          normally={attackAni.userNomally}
          attack={attackAni.user}
          gelatine={attackAni.userHit}
        ></CharacterBox>
        {attackAni.monsterHit ? <DamageText textLeft={550}>{damageText.userAttackDamage}</DamageText> : null}

        {/* <DoubleAttackEffect
          id='doubleAttackDiv'
          view={attackAni.doubleAttack}
        > */}
        {/* 이펙트gif가 캐싱되기때문에 캐싱을 방지해야한다.
          https://velog.io/@sgyoon/2021-02-21 */}
        {/* <img
            src={`${effectImg}?${attackAni.doubleAttack}`}
            alt='이펙트'
          ></img>
        </DoubleAttackEffect> */}

        <MonsterBox
          attack={attackAni.monster}
          monsterCall={monsterCall as number}
          gelatine={attackAni.monsterHit}
          monsterKill={monsterKill}
        ></MonsterBox>
      </FightZone>
      <StartBtn
        id='StartBtn'
        onClick={startBtn ? undefined : penAnimationStart}
      >
        <p className='startText'> {penAnimation ? '시작' : '멈춰'}</p>
        <p> - Space Bar -</p>
      </StartBtn>
      <Pen
        penTop={penCoords.top}
        penLeft={penCoords.left}
        penWidth={50}
        detailView={isDetailVisible}
      ></Pen>
      <BtnMenu
        BackHistory
        Home
        DetailView
      ></BtnMenu>
      <RewardListBox
        refresh={refresh}
        monsterHp={hp.monsterHp}
      ></RewardListBox>
      <DungeonSkill
        useDoubleAttack={doubleAttack}
        OnClick={useDoubleAttack}
      ></DungeonSkill>

      <BottomBox attackEffect={attackAni.monsterHit}></BottomBox>
    </>
  );
};

export default React.memo(NewDungeonFight);
