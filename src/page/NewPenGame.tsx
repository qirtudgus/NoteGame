import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Pen from '../components/Pen';
import { LoginUserInfoInterface, pengame_request } from '../modules/login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import BtnMenu, { ButtonColor } from '../components/BtnMenu';
import anime from 'animejs';
import getPenPointCoords from '../util/getPenPointCoords';
import RewardGoldListBox from '../components/RewardGoldListBox';
import { modal_failure, modal_success } from '../modules/modalState';
import RevivalModal from '../components/RevivalModal';
import BasicBtn from '../components/BasicBtn';
import Loading from '../components/Loading';
import { pengame_boxcount_success } from '../modules/pengameBoxCount';
import sleep from '../util/sleep';
import createRandomNum from '../util/createRandomNum';

const colors = [
  '#4b7bec', // blue
  '#fc5c65', // red
  '#fed330', // yellow
  '#26de81', // green
  '#2bcbba', // sea
  '#fd9644', // orange
  '#a55eea', // violet
];

interface startButton {
  penAnimation?: boolean;
}

export const StartBtn = styled(ButtonColor)<startButton>`
  width: 205px;
  height: 120px;
  cursor: pointer;
  background-color: #fff;
  position: absolute;
  bottom: 105px;
  left: 30px;
  z-index: 101;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & .startText {
    font-size: 3rem;
    font-family: 'VITRO' !important;
  }
  ${(props) => props.penAnimation && css``}
`;

const Result = styled.div`
  font-size: 1.5rem;
  background: #ffbc26;
  padding: 15px 30px 15px 30px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

interface effectCoord {
  top: number;
  left: number;
  widthAndHeight: number;
  translateX: number;
  translateY: number;
  rotate: number;
}

const EffectAni = (x: number, y: number, rotate: number) => keyframes`
  from{opacity:1; transform:translateX(0) translateY(0) rotate(0) }
  80%{opacity:1;}
  to{opacity:0;transform:translateX(${x}px) translateY(${y}px) rotate(${rotate}deg)}
`;

const Effect = styled.div<effectCoord>`
  width: ${(props) => props.widthAndHeight}px;
  height: ${(props) => props.widthAndHeight}px;
  z-index: 100;
  opacity: 1;
  background: #ff0000;
  position: fixed;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  animation: ${(props) => EffectAni(props.translateX, props.translateY, props.rotate)} 0.6s ease-out;
`;

const NewPenGame = () => {
  const dispatch = useDispatch();
  const isHelpVisible = useSelector((state: RootState) => state.userInfo_visibleRequest.isVisible);
  //이펙트 좌표값
  const [effectCoord, setEffectCoord] = useState({ top: 0, left: 0 });
  //펜이 멈췄을때 이펙트를 터뜨리기위한 불린값
  const [penAnimationEffect, setPenAnimationEffect] = useState(false);

  const [penAnimation, setPenAnimation] = useState(true);
  const [startBtn, setStartBtn] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rewardText, SetRewardText] = useState<{ actionName: string | number; reward: string | number }>({
    actionName: '',
    reward: '',
  });
  const [penSpeed, setPenSpeed] = useState<{ speed: number; text: number }>({
    speed: 1,
    text: 1,
  });

  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const isModal = useSelector((state: RootState) => state.modalState.isModal);
  const penAnimeRef = useRef<any>(null);

  //빠른재생 함수
  // 볼펜이 움직이는동안엔 행동하지못하게 조건문을 걸어야함.!!!
  const FastForward = () => {
    // if (penAnimation === false) {
    //   alert('펜이 움직일때는 변경할 수 없어요!');
    //   return;
    // }
    penAnimeRef.current.pause();
    setPenAnimation(() => true);

    setStartBtn(() => false);
    if (penSpeed.speed === 1) {
      setPenSpeed({
        speed: 2,
        text: 2,
      });
    }
    if (penSpeed.speed === 2) {
      setPenSpeed({
        speed: 3,
        text: 3,
      });
    }
    if (penSpeed.speed === 3) {
      setPenSpeed({
        speed: 1,
        text: 1,
      });
    }
  };

  //리워드 획득
  const getRewardElement = async (x: number, y: number) => {
    const el = document.elementFromPoint(x, y) as HTMLElement;
    console.log(y, x);
    setEffectCoord({ top: y, left: x });
    let reward: number = Number(el.dataset.number as string);
    let action = el.dataset.action as string;
    let actionName = el.dataset.actionname as string;
    // 로딩스피너 띄우는 코드
    // setIsLoading(false);
    setPenAnimationEffect(() => true);

    //과도한 서버통신을 방지하기위한 딜레이 부여
    setTimeout(function () {
      setIsLoading(true);
      if (isNaN(reward)) {
        setPenAnimationEffect(() => false);
        setIsSuccess(false);
        dispatch(modal_success());
      } else {
        setPenAnimationEffect(() => false);
        dispatch(pengame_request(reward, action, 1));
        setIsSuccess(true);
        SetRewardText({ reward, actionName });
        dispatch(modal_success());
      }
    }, 600);
  };

  const replay = () => {
    setStartBtn(false);
    setPenAnimation(true);
    setRefresh((prev) => !prev);
    dispatch(modal_failure());
  };

  //새로고침 시 렙 x 1000골드 지불
  const rewardRefresh = () => {
    if (userInfo.Level * 1000 > userInfo.Gold) return;
    dispatch(pengame_request(userInfo.Level * 1000, 'deduct', 1));
    setRefresh((prev) => !prev);
  };

  //시작 버튼 함수
  // restart를 이용하는 방법을 생각해보자....
  const penAnimationStart = () => {
    let b = () => {
      penAnimeRef.current.play();
    };
    let a = () => {
      penAnimeRef.current.pause();
      getRewardElement(getPenPointCoords().x, getPenPointCoords().y - 20);
      setStartBtn(true);
    };
    penAnimation ? b() : a();
    setPenAnimation(false);
  };

  //스페이스바로 게임 시작
  const gameStart = useCallback(
    (e: any) => {
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

  useEffect(() => {
    //userInfo값이 세팅되기전에는 애니메이션이 시작되지않음
    if (userInfo.PenGamePenSpeed > 1) {
      let a = document.querySelector('#penBody') as any;

      a.style = 'transform:translateX(0)';

      penAnimeRef.current = anime({
        targets: a,
        translateX: 800,
        duration: userInfo.PenGamePenSpeed / penSpeed.speed,
        direction: 'alternate', //번갈아 재생
        loop: true, // number는 횟수 true는 무한
        easing: 'easeInOutSine',
        autoplay: false,
      });
      setIsLoading(true);
    }
  }, [userInfo.PenGamePenSpeed, penSpeed.speed]);

  // 스페이스바에 게임시작 이벤트 등록
  useEffect(() => {
    (() => {
      document.addEventListener('keypress', gameStart);
    })();
    return () => {
      document.removeEventListener('keypress', gameStart);
    };
  }, [gameStart]);

  // const ranObj = useMemo(() => {
  //   return {
  //     widthAndHeight: createRandomNum(20, 50),
  //     translateX: createRandomNum(-300, 300),
  //     translateY: createRandomNum(-300, 300),
  //     rotate: createRandomNum(150, 360),
  //   };
  // }, [penAnimationEffect]);
  // console.log(ranObj);

  // const array = [0, 0, 0, 0, 0, 0, 0, 0];
  // const arrayObj = array.map((i, index) => ({
  //   widthAndHeight: createRandomNum(20, 50),
  //   translateX: createRandomNum(-300, 300),
  //   translateY: createRandomNum(-300, 300),
  //   rotate: createRandomNum(150, 360),
  // }));
  // console.log(arrayObj);

  //(width, height) translateX, Y, rotate 4가지의 난수를 생성해야한다.
  const memoFrom = useMemo(() => {
    return Array.from({ length: 7 }).map((i, index) => ({
      widthAndHeight: createRandomNum(20, 50),
      translateX: createRandomNum(-300, 300),
      translateY: createRandomNum(-300, 300),
      rotate: createRandomNum(150, 360),
    }));
  }, [penAnimationEffect]);

  // const From = Array.from({ length: 10 }).map((i, index) => ({
  //   widthAndHeight: createRandomNum(20, 50),
  //   translateX: createRandomNum(-300, 300),
  //   translateY: createRandomNum(-300, 300),
  //   rotate: createRandomNum(150, 360),
  // }));
  // console.log(From);
  // console.log(memoFrom);

  return (
    <>
      {penAnimationEffect &&
        memoFrom.map((i: any, index: number) => (
          <React.Fragment key={index}>
            <Effect
              top={effectCoord.top}
              left={effectCoord.left}
              widthAndHeight={i.widthAndHeight}
              translateX={i.translateX}
              translateY={i.translateY}
              rotate={i.rotate}
            ></Effect>
          </React.Fragment>
        ))}
      {isLoading ? null : <Loading></Loading>}
      {isModal &&
        (isSuccess ? (
          <RevivalModal>
            <h1>열심히 멈춘 결과</h1>
            <Result className='result'>
              {rewardText.actionName} {rewardText.reward.toLocaleString()}
            </Result>
            <div>
              <p>{userInfo.beforeGold?.toLocaleString()} 골드에서</p>
              <p>{userInfo.Gold?.toLocaleString()} 골드로!</p>
            </div>
            <BasicBtn
              id='nextBtn'
              ClassName='modalBtn'
              ButtonText='다시하기'
              OnClick={replay}
            ></BasicBtn>
          </RevivalModal>
        ) : (
          <RevivalModal>
            <p>열심히 멈춘 결과</p>
            <p>꽝...</p>
            <BasicBtn
              id='nextBtn'
              ClassName='modalBtn'
              ButtonText='다시하기'
              OnClick={replay}
            ></BasicBtn>
          </RevivalModal>
        ))}
      {/* <select
        onChange={(e) => {
          console.log(e.target.value);
          dispatch(pengame_boxcount_success(Number(e.target.value)));
          //옵션 선택 후 스페이스바 눌렀을 때 선택방지
          e.target.blur();
        }}
      >
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        <option value='10'>10</option>
      </select> */}
      <RewardGoldListBox
        refresh={refresh}
        penSpeed={penSpeed.text}
      ></RewardGoldListBox>

      <StartBtn
        id='StartBtn'
        onClick={startBtn ? undefined : penAnimationStart}
        penAnimation={penAnimation}
      >
        <p className='startText'> {penAnimation ? '시작' : '멈춰'}</p>
        <p> - Space Bar -</p>
      </StartBtn>
      <Pen
        penWidth={100}
        penTop={450}
        penLeft={50}
      ></Pen>
      <BtnMenu
        BackHistory
        Home
        Refresh
        RefreshFunc={rewardRefresh}
        RefreshGold={userInfo.Level * 1000}
        FastForward
        FastForwardFunc={FastForward}
        FastForwardText={penSpeed.text}
      ></BtnMenu>
    </>
  );
};

export default React.memo(NewPenGame);
