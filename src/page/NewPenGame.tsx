import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
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
import Loading from '../components/Loading';
import { pengame_boxcount_success } from '../modules/pengameBoxCount';

export const StartBtn = styled.div`
  width: 205px;
  height: 120px;
  background-color: #555;
  position: absolute;
  bottom: 105px;
  left: 30px;
  z-index: 101;
  border-radius: 10px;
`;

const NewPenGame = () => {
  const dispatch = useDispatch();

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
  const boxCount = useSelector((state: RootState) => state.boxCount.boxCount);
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
    let reward: number = Number(el.dataset.number as string);
    let action = el.dataset.action as string;
    let actionName = el.dataset.actionname as string;

    if (isNaN(reward)) {
      setIsSuccess(false);
      dispatch(modal_success());
    } else {
      dispatch(pengame_request(reward, action, 1));
      setIsSuccess(true);
      SetRewardText({ reward, actionName });
      dispatch(modal_success());
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
      getRewardElement(getPenPointCoords().x, getPenPointCoords().y - 20);
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

  return (
    <>
      {isLoading ? null : <Loading></Loading>}
      {isModal &&
        (isSuccess ? (
          <RevivalModal>
            <p>열심히 멈춘 결과</p>
            <p className='result'>
              {rewardText.actionName} {rewardText.reward.toLocaleString()}
            </p>
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
      <select
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
      </select>
      <RewardGoldListBox
        refresh={refresh}
        penSpeed={penSpeed.text}
      ></RewardGoldListBox>

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
        FastForward
        FastForwardFunc={FastForward}
        FastForwardText={penSpeed.text}
      ></BtnMenu>
    </>
  );
};

export default React.memo(NewPenGame);
