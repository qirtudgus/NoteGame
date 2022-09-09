import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { css } from 'styled-components';
import NewBallpen from '../components/NewBallpen';
import { LoginUserInfoInterface, pengame_request } from '../modules/login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import BtnMenu from '../components/BtnMenu';
import anime from 'animejs';
import getPenPointCoords from '../util/getPenPointCoords';
import RewardGoldListBox from '../components/RewardGoldListBox';
import { modal_failure, modal_success } from '../modules/modalState';
import RevivalModal from '../components/RevivalModal';
import BasicBtn from '../components/BasicBtn';

export const StartBtn = styled.div`
  width: 205px;
  height: 120px;
  background-color: #555;
  position: absolute;
  bottom: 105px;
  left: 30px;
  z-index: 1;
  border-radius: 10px;
`;

const NewPenGame = () => {
  const dispatch = useDispatch();
  const [penAnimation, setPenAnimation] = useState(true);
  const [startBtn, setStartBtn] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [penSpeed, setPenSpeed] = useState<{ speed: number; text: number }>({
    speed: 1,
    text: 1,
  });

  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const boxCount = useSelector((state: RootState) => state.boxCount.boxCount);
  const isModal = useSelector((state: RootState) => state.modalState.isModal);
  const penAnimeRef = useRef<any>(null);

  //빠른재생 함수
  // 볼펜이 움직이는동안엔 행동하지못하게 조건문을 걸어야함.!!!
  const FastForward = (): void => {
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
    let reward: number = Number(el.dataset.number as string);
    let action = el.dataset.action as string;
    console.log(reward);
    console.log(action);
    if (isNaN(reward)) {
      setIsSuccess(false);
      dispatch(modal_success());
    } else {
      dispatch(pengame_request(reward, action, 1));
      dispatch(modal_success());
      setIsSuccess(true);
    }
  };

  const replay = () => {
    setStartBtn(false);
    setPenAnimation(true);
    setRefresh((prev) => !prev);
    dispatch(modal_failure());
  };

  //시작 버튼 함수
  // restart를 이용하는 방법을 생각해보자....
  const penAnimationStart = () => {
    let b = () => {
      penAnimeRef.current.play();
    };
    let a = () => {
      penAnimeRef.current.pause();
      getRewardElement(getPenPointCoords().x, getPenPointCoords().y);
      setStartBtn(true);
    };
    penAnimation ? b() : a();
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

  // 스페이스바에 게임시작 이벤트 등록
  useEffect(() => {
    (() => {
      document.addEventListener('keypress', gameStart);
    })();
    return () => {
      document.removeEventListener('keypress', gameStart);
    };
  }, [gameStart]);

  useEffect(() => {
    console.log(userInfo.PenGamePenSpeed);
    penAnimeRef.current = anime({
      targets: '#penBody, #penPoint',
      translateX: 800,
      duration: userInfo.PenGamePenSpeed,
      direction: 'alternate', //번갈아 재생
      loop: true, // number는 횟수 true는 무한
      easing: 'easeInOutSine',
      autoplay: false,
    });
  }, []);

  return (
    <>
      {isModal &&
        (isSuccess ? (
          <RevivalModal>
            <p>열심히 멈춘 결과</p>
            <div>
              <p>{userInfo.beforeGold.toLocaleString()} 골드에서</p>
              <p>{userInfo.Gold.toLocaleString()} 골드로!</p>
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
            <div>
              <p>꽝입니다...</p>
            </div>
            <BasicBtn
              id='nextBtn'
              ClassName='modalBtn'
              ButtonText='다시하기'
              OnClick={replay}
            ></BasicBtn>
          </RevivalModal>
        ))}

      <RewardGoldListBox refresh={refresh}></RewardGoldListBox>

      <StartBtn
        id='StartBtn'
        onClick={startBtn ? undefined : penAnimationStart}
      >
        {penAnimation ? '시작' : '멈춰'}
      </StartBtn>
      <NewBallpen
        penWidth={100}
        penTop={450}
        penLeft={50}
      ></NewBallpen>
      <BtnMenu
        BackHistory
        Home
        Refresh
        RefreshFunc={() => {
          setRefresh((prev) => !prev);
        }}
        // FastForward
        // FastForwardFunc={FastForward}
        // FastForwardText={penSpeed.text}
      ></BtnMenu>
    </>
  );
};

export default React.memo(NewPenGame);
