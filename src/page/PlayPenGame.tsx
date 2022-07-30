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

interface penAni {
  penStatus?: any;
  ref?: any;
}
const animation = keyframes`
  0% {
    transform:translate(-20em);
  }
50%{
  transform:translate(20em);  }
  100%{
    transform:translate(-20em);
  }
`;

const PenWrap = styled.div<penAni>`
  position: relative;
  bottom: -205px;
  z-index: 2;
`;

const Pen = styled.div`
  width: 40px;
  height: 330px;
  background: #fff;
`;
const PenEnd = styled.div<penAni>`
  width: 3px;
  height: 5px;
  background: #000;
  position: absolute;
  z-index: 3;
  top: 400px;
  left: 500px;
  margin: none;
  animation-fill-mode: both;
  animation: ${animation} 2s ease-in-out infinite; //1초동안 선형 무한 속성값주기
  animation-play-state: running;
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}
  &:focus {
  }
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
  const inputRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const boxCount = useSelector((state: RootState) => state.boxCount.boxCount);
  const dispatch = useDispatch();

  const randomArr = useCallback(createRandomRewardsArray(boxCount), [boxCount]);

  function dropClick(x: number, y: number): any {
    let cb: any = document.elementFromPoint(x, y);
    let boxNumber: number = parseInt(cb.dataset.boxnum);
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

  const anistart = async () => {
    //정확한 좌표값을 얻기위해 약간의 딜레이를 주었다.
    setTimeout(function () {
      const x = inputRef.current.getBoundingClientRect().x;
      //y값을 그대로 적용하면 PenEnd 엘레먼트가 반환되기때문에 Box요소에 들어갈 수 있도록 약간 조정합니다.
      const y = inputRef.current.getBoundingClientRect().y - 50;
      console.log(x);
      dropClick(x, y);

      //x값에 따른 처리는 따로 모듈화 해주자
      // if( 838 <= x && x <= 917 ){
      //   console.log("x안에 들어옴")
      //   dispatch(pengame_request(2))
      // }
    }, 500);
  };

  const toggleExit = async () => {
    setPenSatus((penStatus) => !penStatus);
    await anistart();
  };

  //이벤트 박스의 dataset 할당을 위한 문자열 제거용 정규식("골드 5배" -> 5)식으로 변환
  const regex = /[^0-9]/g;

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
      <PenEnd penStatus={penStatus} ref={inputRef}></PenEnd>
      <PenWrap penStatus={penStatus}>
        <PenHead></PenHead>
        <Pen></Pen>
      </PenWrap>
      <BoxWrap>
        {randomArr.map((i: any, index: any) => (
          <Box key={index} data-boxnum={i}>
            {i}
          </Box>
        ))}
      </BoxWrap>

      <UserInfo>
        <></>
      </UserInfo>
    </>
  );
};

export default PlayPenGame;
