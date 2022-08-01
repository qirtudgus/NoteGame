import styled, { keyframes, css } from 'styled-components';
import UserInfo from '../components/userInfo';
import React ,{ ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import BasicButtons from '../components/BasicBtn';
import { pengame_request } from '../modules/login';
import { useDispatch , useSelector  } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { createRandomRewardsArray } from '../util/createRandomRewardsArray';
import HomeBtn from '../components/HomeBtn';
import FastForwardBtn from '../components/FastFowardBtn';
import BackHistoryBtn from '../components/BackHistoryBtn';
import RefreshBtn from '../components/RefreshBtn';

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
  transform:translate(37em); 
 }
  100%{
    transform:translate(-20em);
  }
`;

const PenWrap = styled.div<penAni>`
  position: relative;
  bottom: -205px;
  left: -130px;
  z-index: 2;
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
  height: 330px;
  background: #fff;
`;
const PenEnd = styled.div<penAni>`
  width: 1px;
  height: 100px;
  background: rgba(0, 0, 0, 1);
  position: absolute;
  z-index: 3;
  top: 400px;
  left: 370px;
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
const BoxWrap = styled.div`
  position: absolute;
  display: flex;
`;

const Box = styled.div`
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
`;

// document.addEventListener('click', logKey);
function logKey(e: any) {
  console.log(`
    Screen X/Y: ${e.screenX}, ${e.screenY}
    Client X/Y: ${e.clientX}, ${e.clientY}`);
}

const PlayPenGame = () => {
  const [penStatus, setPenSatus] = useState<boolean>(true);
  const [refresh, setrefresh] = useState<boolean>(true);
  const [penSpeed, setPenSpeed] = useState<{speed:number,text:number}>({
    speed : 1,
    text : 1,
  });
  const inputRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const boxCount = useSelector((state: RootState) => state.boxCount.boxCount);
  const dispatch = useDispatch();

  const randomArr = useCallback(createRandomRewardsArray(boxCount), [
    boxCount,
    refresh,
  ]);

  //###좌표값에 반환되는 요소의 dataset에 따라 dispatch되는 함수다. 모듈화 시켜주자
  function dropClick(x: number, y: number): void {
    let cb: any = document.elementFromPoint(x, y);
    let dataset = cb.dataset.boxnum;
    setrefresh((refresh) => !refresh);

    if (dataset === undefined) return;
    console.log(cb.dataset.boxnum);

    //옵션에 대한 박스를 필요한 갯수만큼 고정적으로 생성 후, 각각의 고유 박스넘버를 부여
    //click 후 스위치문 인자로 넣어서 각각 박스에 맞는 액션을 실행시키면 괜찮을 듯!
    switch (dataset) {
      case '골드 100 획득':
        console.log('1번박스');
        dispatch(pengame_request(100, 'add'));
        return;
      case '골드 200 획득':
        console.log('1번박스');
        dispatch(pengame_request(200, 'add'));
        return;
      case '골드 500 획득':
        console.log('1번박스');
        dispatch(pengame_request(500, 'add'));
        return;
      case '골드 2배 획득':
        console.log('1번박스');
        dispatch(pengame_request(2, 'multiple'));
        return;
      case '골드 3배 획득':
        console.log('1번박스');
        dispatch(pengame_request(3, 'multiple'));
        return;
      case '골드 5배 획득':
        console.log('1번박스');
        dispatch(pengame_request(5, 'multiple'));
        return;
      case '골드 100 차감':
        dispatch(pengame_request(100, 'deduct'));
        return;
      case '골드 200 차감':
        dispatch(pengame_request(200, 'deduct'));
        return;
      case '골드 500 차감':
        dispatch(pengame_request(500, 'deduct'));
        return;
    }
  }

  const toggle = () => {
    // start
    setPenSatus((penStatus) => !penStatus);
  };

  const getReward = async () => {
    //정확한 좌표값을 얻기위해 약간의 딜레이를 주었다.
    setTimeout(function () {
      //y값을 그대로 적용하면 PenEnd 엘레먼트가 반환되기때문에 Box요소에 들어갈 수 있도록 약간 조정합니다.
      const x = inputRef.current.getBoundingClientRect().x;
      const y = inputRef.current.getBoundingClientRect().y - 10;
      dropClick(x, y);

    }, 500);
  };

  const refreshRewards = () => {
    setrefresh((refresh) => !refresh);
  };

  const toggleExit = async () => {
    setPenSatus((penStatus) => !penStatus);
    await getReward();
  };

  const FastForward = () => {
    if(penSpeed.speed === 1){
      setPenSpeed({
        speed: 0.5,
        text:2,
      })
    }
    if(penSpeed.speed === 0.5){
      setPenSpeed({
        speed: 0.33,
        text:3,
    })
  }
    if(penSpeed.speed === 0.33){
      setPenSpeed({
        speed: 1,
        text:1,
      })
    }
  }

  return (
    <>
      {penStatus ? (
        <BasicButtons
          ButtonText='스타트'
          color='#aaa'
          OnClick={toggle}
        ></BasicButtons>
      ) : (
        <BasicButtons
          ButtonText='종료'
          color='#aaa'
          OnClick={toggleExit}
        ></BasicButtons>
      )}

      <BackHistoryBtn corner></BackHistoryBtn>
      <RefreshBtn corner func={refreshRewards}></RefreshBtn>
      <HomeBtn corner></HomeBtn>    
      <FastForwardBtn corner func={FastForward} text={penSpeed.text}></FastForwardBtn>
      <PenEnd penStatus={penStatus} ref={inputRef} penSpeed={penSpeed.speed}></PenEnd>
      <PenWrap penSpeed={penSpeed.speed} penStatus={penStatus}>
        <PenHead></PenHead>
        <Pen></Pen>
      </PenWrap>
      <BoxWrap>
        {boxCount === 0 ? (
          <div>뒤로 돌아가 다시 박스 갯수를 정해주세요!</div>
        ) : (
          <>
            {randomArr.map((i:any, index: any) => (
              <Box key={index} data-boxnum={i}>
                {i}
              </Box>
            ))}
          </>
        )}
      </BoxWrap>
      <UserInfo></UserInfo>
    </>
  );
};

export default React.memo( PlayPenGame);
