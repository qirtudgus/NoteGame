import { useSelector, useDispatch } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import { RootState } from '../modules/modules_index';
import 모남볼펜 from '../img/모남볼펜.png';
import 하이테크 from '../img/하이테크.png';
import { forwardRef } from 'react';

interface penAni {
  penStatus: boolean;
  ref?: any;
  penSpeed: number;
  //던전에서 사용 시 css
  isDungeon?: boolean;
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
const animationDungeon = keyframes`
  0% {
    transform:translate(-20em);
  }
50%{
  transform:translate(8.5em); 
 }
  100%{
    transform:translate(-20em);
  }
`;

const PenWrap = styled.div<penAni>`
  position: absolute;
  height: 370px;
  overflow-y: clip;
  width: 40px;
  bottom: 0px;
  left: 350px;
  z-index: 100;
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
  z-index: 100;
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

const PenWrapDungeon = styled.div<penAni>`
  position: absolute;
  height: 150px;
  overflow-y: clip;
  width: 40px;
  bottom: 0px;
  left: 570px;
  z-index: 100;
  animation-fill-mode: both;
  animation: ${animationDungeon} ${(props) => props.penSpeed}s ease-in-out
    infinite; //1초동안 선형 무한 속성값주기
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

const PenEndDungeon = styled.div<penAni>`
  width: 1px;
  height: 100px;
  background: rgba(0, 0, 0, 1);
  position: absolute;
  z-index: 100;
  top: 600px;
  left: 590px;
  margin: none;
  animation-fill-mode: both;
  animation: ${animationDungeon} ${(props) => props.penSpeed}s ease-in-out
    infinite; //1초동안 선형 무한 속성값주기
  animation-play-state: running;
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}
`;

const Ballpen = ({ penSpeed, penStatus, isDungeon }: any, ref: any) => {
  return (
    <>
      {isDungeon ? (
        <>
          <PenEndDungeon
            penStatus={penStatus}
            ref={ref}
            penSpeed={penSpeed}
          ></PenEndDungeon>
          <PenWrapDungeon penSpeed={penSpeed} penStatus={penStatus}>
            <img src={모남볼펜} alt='ballpen'></img>
          </PenWrapDungeon>
        </>
      ) : (
        <>
          <PenEnd penStatus={penStatus} ref={ref} penSpeed={penSpeed}></PenEnd>
          <PenWrap penSpeed={penSpeed} penStatus={penStatus}>
            <img src={모남볼펜} alt='ballpen'></img>
          </PenWrap>
        </>
      )}
    </>
  );
};

export default forwardRef(Ballpen);
