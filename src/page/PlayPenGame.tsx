import styled, { keyframes, css } from 'styled-components';
import BackHistoryBtn from '../components/BackHistoryBtn';
import UserInfo from '../components/userInfo';
import { useCallback, useEffect, useRef, useState } from 'react';
import BasicButtons from '../components/BasicBtn';
import { pengame_request } from '../modules/login';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import createRandomNum from '../util/createRandomNum';
import createRandomNumArray from '../util/createRandomNumArray';
import { RootState } from '../modules/modules_index';
import { createRandomRewardsArray } from '../util/createRandomRewardsArray';
import RefreshBtn from '../components/RefreshBtn';

interface penAni {
  penStatus?: any;
  ref?: any;
}
const animation = keyframes`
  0% {
    transform:translate(-20em);
  }
50%{
  transform:translate(37em);  }
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
  animation: ${animation} 1s ease-in-out infinite; //1초동안 선형 무한 속성값주기
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
  animation: ${animation} 1s ease-in-out infinite; //1초동안 선형 무한 속성값주기
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
  width: 80px;
  height: 300px;
  background: #fff;
  border: 1px solid#000;
  position: relative;

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
  const inputRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const boxCount = useSelector((state: RootState) => state.boxCount.boxCount);
  const dispatch = useDispatch();

  const randomArr = useCallback(createRandomRewardsArray(boxCount), [
    boxCount,
    refresh,
  ]);

  function dropClick(x: number, y: number): any {
    let cb: any = document.elementFromPoint(x, y);
    let boxNumber: number = parseInt(cb.dataset.boxnum);
    if (boxNumber === undefined) return;
    console.log(cb.dataset.boxnum);

    //옵션에 대한 박스를 필요한 갯수만큼 고정적으로 생성 후, 각각의 고유 박스넘버를 부여
    //click 후 스위치문 인자로 넣어서 각각 박스에 맞는 액션을 실행시키면 괜찮을 듯!
    switch (boxNumber) {
      case 1:
        console.log('1번박스');
        dispatch(pengame_request(2));
        return;
      case 2:
        console.log('2번박스');
        dispatch(pengame_request(3));
        return;
      case 3:
        console.log('3번박스');
        dispatch(pengame_request(4));
        return;
      case 4:
        console.log('4번박스');
        dispatch(pengame_request(5));
        return;
    }
  }

  const toggle = () => {
    // start
    setPenSatus((penStatus) => !penStatus);
  };

  const callRewardsList = async () => {
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
    await callRewardsList();
  };

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
      <PenEnd penStatus={penStatus} ref={inputRef}></PenEnd>
      <PenWrap penStatus={penStatus}>
        <PenHead></PenHead>
        <Pen></Pen>
      </PenWrap>
      <BoxWrap>
        {boxCount === 0 ? (
          <div>뒤로 돌아가 다시 박스 갯수를 정해주세요!</div>
        ) : (
          <>
            {randomArr.map((i: any, index: any) => (
              <Box key={index} data-boxnum={i}>
                {i}
              </Box>
            ))}
          </>
        )}
      </BoxWrap>
      {/* <button onClick={refreshRewards}>새로고침</button> */}

      <UserInfo>
        <></>
      </UserInfo>
    </>
  );
};

export default PlayPenGame;
