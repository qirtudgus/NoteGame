import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginUserInfoInterface } from '../modules/login';

//연산 요소
import { userDamage, monsterDamage } from '../util/createDamage';
import { createPenRewardArray } from '../util/createRandomRewardsArray';
import createRandomNum from '../util/createRandomNum';

//화면 요소
import BtnMenu from '../components/BtnMenu';
import CharacterBox from '../components/CharacterBox';
import MonsterBox from '../components/MonsterBox';
import FloorBox from '../components/FloorBox';
import NewBallpen from '../components/NewBallpen';
import anime from 'animejs';
import VictoryModal from '../components/VictoryModal';
import { penObj } from '../util/shopList';
import { monsterArr } from '../util/dungeonMonsterList';
import RewardListBox from '../components/RewardListBox';
import sleep from '../util/sleep';

const StartBtn = styled.div`
  width: 205px;
  height: 120px;
  background-color: #555;
  position: absolute;
  bottom: 105px;
  left: 30px;
  z-index: 1;
  border-radius: 10px;
`;
const BottomBox = styled.div`
  width: 100%;
  height: 240px;
  border-radius: 0 0 20px 20px;
  position: absolute;
  bottom: 0px;
  background: #928282;
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
  width: 50%;
  height: 40px;
  background: #242222;
  border-radius: 25px 0 0 25px;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
`;
const MonsterHpBar = styled.div<hp>`
  width: 50%;
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
  //이겼을 때 모달 상태
  const [isModal, setIsModal] = useState<boolean>(false);
  const [victoryModal, setVictoryModal] = useState<boolean>(false);
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
  });
  //새로고침 시 뒤로가기 (잘못된 플레이 방지)
  if (monsterInfo.monsterFullHp === 0) navigate(-1);
  //디테일 뷰 상태값
  const isVisible = useSelector((state: RootState) => state.visibleState.isVisible) as boolean;

  //시작 버튼 함수
  const penAnimationStart = () => {
    let a = () => {
      penAnimeRef.current.pause();
      getRewardElement(getRewardCoords().x, getRewardCoords().y);
      setStartBtn(true);
    };
    penAnimation ? penAnimeRef.current.play() : a();
    setPenAnimation(false);
  };

  //스페이스바로 게임 시작
  const gameStart = useCallback((e: any) => {
    console.log('이벤트');
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
  }, []);

  //볼펜을 멈춰 리워드좌표를 획득
  const getRewardCoords = () => {
    const pen = document.querySelector('#penPoint');
    const x: number = pen?.getBoundingClientRect().x as number;
    const y: number = (pen?.getBoundingClientRect().y as number) - 20;
    let resultCoords = { x, y };
    return resultCoords;
  };

  function randomAttack(): string {
    let a = createRandomNum(1, 4);
    return 'attack' + a;
  }

  //해당 좌표의 엘레먼트를 반환
  const getRewardElement = async (x: number, y: number) => {
    const reward = document.elementFromPoint(x, y) as HTMLElement;
    reward.classList.add('active');
    if (reward.dataset.attacknumber === undefined) {
      MonsterAttack();

      return;
    }
    const rewardNumber = reward.dataset.attacknumber;

    //유저데미지 연산
    let userResultDamage = userDamage(
      parseInt(rewardNumber as string),
      userInfo.BasicDamage,
      userInfo.WeaponDamage,
      userInfo.BetterPen,
    );
    //남은 몬스터 체력 계산
    let monsterHp: number = hp.monsterHp - userResultDamage;
    let monsterHpBar: number = Math.ceil((monsterHp / monsterInfo.monsterFullHp) * 100);
    if (monsterHp <= 0) {
      setAttackAni((prev) => ({ ...prev, userNomally: false }));
      setAttackAni((prev) => ({ ...prev, user: randomAttack(), monsterHit: true }));
      // setHp({ ...hp, monsterHp, monsterHpBar });
      setHp((prev) => ({ ...prev, monsterHp: 0, monsterHpBar: 0 }));
      characterAnimeRef.current.play();
      setDamageText({ ...damageText, userAttackDamage: userResultDamage.toLocaleString() + '' });
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
    // setHp({ ...hp, monsterHp, monsterHpBar });
    setHp((prev) => ({ ...prev, monsterHp, monsterHpBar }));

    characterAnimeRef.current.play();
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
    let monsterResultDamage = monsterDamage(monsterInfo.monsterDamage);
    let userHp = hp.userHp - monsterResultDamage;
    let userHpBar = Math.ceil((userHp / userInfo.BasicHp) * 100);
    if (userHp <= 0) {
      setAttackAni({ ...attackAni, monster: true, userHit: true });
      // setHp({ ...hp, monsterHp, monsterHpBar });
      setHp((prev) => ({ ...prev, userHp: 0, userHpBar: 0 }));
      characterAnimeRef.current.play();
      setDamageText({ ...damageText, monsterAttackDamage: monsterResultDamage.toLocaleString() + '' });
      setTimeout(function () {
        setVictoryModal(false);
        setIsModal(true);
        //패배시 남아있는 데미지 텍스트 제거
        setAttackAni({ ...attackAni, userHit: false });
      }, 1000);
      return;
    }
    setAttackAni({ ...attackAni, monster: true, userHit: true });
    setDamageText({ ...damageText, monsterAttackDamage: monsterResultDamage.toLocaleString() + '' });
    setHp((prev) => ({ ...prev, userHp, userHpBar }));
    //한번 초기화를 해주면 애니메이션 정상 작동
    //초기화는 몬스터무빙 애니메이션까지 끝난 뒤 해야하기때문에 몬스터 애니메이션과 같은 값으로 준다.
    await sleep(1);
    setAttackAni({ user: 'attack0', monster: false, userHit: false, monsterHit: false, userNomally: true });
    setPenAnimation(true);
    setRefresh((prev) => !prev);
    //마지막에 스타트버튼에 함수를 활성화시켜 전투가 끝나기전까지는 제한된다.
    setStartBtn(false);
  };

  useEffect(() => {
    penAnimeRef.current = anime({
      targets: '#penBody, #penPoint',
      translateX: 400,
      duration: animationSpeed.penAni,
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
    setHp({ ...hp, userHp: userInfo.BasicHp, monsterHp: monsterInfo.monsterFullHp });
    setMonsterCall(createRandomNum(0, monsterArr.length - 1));
  }, []);

  return (
    <>
      {isModal ? (
        <VictoryModal
          isModal={victoryModal}
          huntExp={monsterInfo.monsterExp}
          huntGold={monsterInfo.monsterGold}
          before={state}
        ></VictoryModal>
      ) : null}
      <FightState>
        {isVisible && (
          <HpTextWrap>
            <HpText>
              {hp.userHp} / {userInfo.BasicHp}
            </HpText>
            <HpText>
              {hp.monsterHp} / {monsterInfo.monsterFullHp}
            </HpText>
          </HpTextWrap>
        )}

        <UserHpBar>
          <UserHpNowBar hpBar={hp.userHpBar}></UserHpNowBar>
        </UserHpBar>
        <FloorBox></FloorBox>
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
        {penAnimation ? '시작' : '멈춰'}
      </StartBtn>
      <NewBallpen
        penTop={penCoords.top}
        penLeft={penCoords.left}
      ></NewBallpen>
      <BtnMenu
        BackHistory
        Home
        DetailView
      ></BtnMenu>
      <RewardListBox
        refresh={refresh}
        monsterHp={hp.monsterHp}
      ></RewardListBox>
      <BottomBox></BottomBox>
    </>
  );
};

export default React.memo(NewDungeonFight);
