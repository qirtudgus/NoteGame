import styled,{css,keyframes} from "styled-components";

interface penAni {
    penStatus?: boolean;
    ref?: any;
    penSpeed?: number;
  }
  

export const animation = keyframes`
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

export const PenWrap = styled.div<penAni>`
  z-index: 10000;
  position: absolute;
  bottom: -100px;
  left: 570px;
  animation-fill-mode: both;
  animation: ${animation} ${(props) => props.penSpeed}s ease-in-out infinite; //1초동안 선형 무한 속성값주기
  animation-play-state: running;
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}
`;

export const Pen = styled.div`
  width: 40px;
  height: 150px;
  background: #fff;
`;
export const PenEnd = styled.div<penAni>`
  z-index: 10000;
  width: 1px;
  height: 100px;
  background: rgba(0, 0, 0, 1);
  position: absolute;
  top: 620px;
  left: 590px;
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

export const PenHead = styled.div`
  border-radius: 40px 40px 0 0;
  width: 40px;
  height: 60px;
  background: #000;
`;
