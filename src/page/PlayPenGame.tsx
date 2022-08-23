import styled, { css } from 'styled-components';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { pengame_request } from '../modules/login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { createRandomRewardsArray } from '../util/createRandomRewardsArray';
import ResultModal from '../components/ResultModal';
import Loading from '../components/Loading';
import Ballpen from '../components/Ballpen';
import BtnMenu from '../components/BtnMenu';

const BoxWrap = styled.div`
  position: absolute;
  display: flex;
`;

interface BoxColor {
  red?: string;
}

const Box = styled.div<BoxColor>`
  width: 60px;
  padding: 0 10px 0 10px;
  height: 300px;
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
  ${(props) =>
    props.red &&
    css`
      background: #e5005a;
      color: #fff;
    `}
`;

const TestInput = styled.div`
  width: 13rem;
  height: 4rem;
  background: #fff;
  text-align: center;
  line-height: 4rem;
  border-radius: 20px;
  font-size: 2rem;
  font-weight: bold;
`;

const PlayPenGame = () => {
  const dispatch = useDispatch();
  const boxCount = useSelector((state: RootState) => state.boxCount.boxCount);
  const userInfo = useSelector((state: RootState) => state.login.userInfo);
  const [penStatus, setPenSatus] = useState<boolean>(true);
  const [refresh, setrefresh] = useState<boolean>(true);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFalseModal, setIsFalseModal] = useState<boolean>(false);
  const [throttle, setThrottle] = useState(false);

  const [penSpeed, setPenSpeed] = useState<{ speed: number; text: number }>({
    speed: 1,
    text: 1,
  });
  // const penSpeedInfo: any = useSelector(
  //   (state: RootState) => state.penSpeed
  // );
  const inputRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  //useMemo를 사용하여 해결!!!!!!
  const ran = 
  useMemo(()=> {
    return createRandomRewardsArray(boxCount, 'penGame')
  },[refresh])

  // const randomArr = useCallback(createRandomRewardsArray(boxCount, 'penGame'), [
  //   boxCount,
  //   refresh,
  // ]);


  //###좌표값에 반환되는 요소의 dataset에 따라 dispatch되는 함수다. 모듈화 시켜주자
  function dropClick(x: number, y: number): void {
    const cb = document.elementFromPoint(x, y) as HTMLElement;
    let reward: number = Number(cb.dataset.number as string);
    let action = cb.dataset.action as string;
    if (isNaN(reward)) {
      setIsFalseModal(false);
      setIsModal((isModal) => !isModal);
    } else {
      setIsFalseModal(true);
      setIsModal((isModal) => !isModal);
      dispatch(pengame_request(reward, action, penSpeed.text));
    }
  }

  const toggle = () => {
    if (throttle) return;
    if (!throttle) {
      setThrottle(true);
      setTimeout(async () => {
        setPenSatus((penStatus) => !penStatus);
      }, 0);
    }
  };

  const toggleExit = async () => {
    setPenSatus((penStatus) => !penStatus);
    setIsLoading((isLoading) => !isLoading);

    await getReward();
  };

  const getReward = async () => {
    //정확한 좌표값을 얻기위해 약간의 딜레이를 주었다.
    setTimeout(function () {
      //y값을 그대로 적용하면 PenEnd 엘레먼트가 반환되기때문에 Box요소에 들어갈 수 있도록 약간 조정합니다.
      const x = inputRef.current.getBoundingClientRect().x;
      const y = inputRef.current.getBoundingClientRect().y - 10;
      dropClick(x, y);
      setIsLoading((isLoading) => !isLoading);
    }, 500);
  };

  const refreshRewards = () => {
    setrefresh((refresh) => !refresh);
  };

  const FastForward = (): void => {


    if (penSpeed.speed === 1) {
      setPenSpeed({
        speed: 0.5,
        text: 2,
      });
    }
    if (penSpeed.speed === 0.5) {
      setPenSpeed({
        speed: 0.33,
        text: 3,
      });
    }
    if (penSpeed.speed === 0.33) {
      setPenSpeed({
        speed: 1,
        text: 1,
      });
    }
  };

  const replay = (): void => {
    setIsModal((isModal) => !isModal);
    setrefresh((refresh) => !refresh);
    setPenSatus((penStatus) => !penStatus);
  };

  const gameStart = useCallback((e: any) => {
    console.log(e.keyCode);
    let startBtn = document.getElementById('startbutton');
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
    <BtnMenu Home BackHistory Refresh RefreshFunc={refreshRewards} FastFoward FastFowardFunc={FastForward} FastFowardText={penSpeed.text} ></BtnMenu>
      {isLoading ? <Loading></Loading> : null}

      <TestInput
        id='startbutton'
        onClick={penStatus ? () => toggle() : () => toggleExit()}
      >
        {penStatus ? '시작' : '멈춰'}
      </TestInput>

      {isModal && (
        <ResultModal
          isModal={isFalseModal}
          cName='modalBtn'
          beforeGold={userInfo?.beforeGold}
          afterGold={userInfo?.Gold}
          OnClick={replay}
        ></ResultModal>
      )}
{/* 
      <RefreshBtn corner func={refreshRewards}></RefreshBtn>
      <FastForwardBtn
        corner
        func={FastForward}
        text={penSpeed.text}
      ></FastForwardBtn> */}

      <Ballpen
        penStatus={penStatus}
        // penSpeed={penSpeed.speed}
        ref={inputRef}
      ></Ballpen>
      <BoxWrap>
        {boxCount === 0 ? (
          <div>뒤로 돌아가 다시 박스 갯수를 정해주세요!</div>
        ) : (
          <>
            {ran.map((i: any, index: any) => (
              <Box
                red={i.color}
                key={index}
                data-action={i.action}
                data-number={i.number}
              >
                {i.front + ' ' + i.number * penSpeed.text + ' ' + i.back}
              </Box>
            ))}
          </>
        )}
      </BoxWrap>
    </>
  );
};

export default React.memo(PlayPenGame);
