import { useSelector, useDispatch } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import { RootState } from '../modules/modules_index';
import 모남볼펜 from '../img/모남볼펜.png';
import 하이테크 from '../img/하이테크.png';
import { forwardRef } from 'react';

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
  height: 370px;
  overflow-y: clip;
  width: 40px;
  bottom: -183px;
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
  & img {
    position: absolute;
    left: 0;
  }
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

const Ballpen = (props: any, ref: any) => {
  return (
    <>
      <PenEnd
        penStatus={props.penStatus}
        ref={ref}
        penSpeed={props.penSpeed.speed}
      ></PenEnd>
      <PenWrap penSpeed={props.penSpeed.speed} penStatus={props.penStatus}>
        <img src={하이테크}></img>
        {/* <PenHead></PenHead>
        <Pen></Pen> */}
      </PenWrap>
    </>
  );
};

export default forwardRef(Ballpen);
