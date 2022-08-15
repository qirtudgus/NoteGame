import styled, { css, keyframes } from 'styled-components';

//타격 시 흔들리는 이펙트
export const gelatine = keyframes`
  from, to { transform: scale(1, 1); }
  25% { transform: scale(0.9, 1.3); }
  50% { transform: scale(1.3, 0.9); }
  75% { transform: scale(0.95, 1.05); }
  `;

interface penAni {
  penStatus: boolean;
  ref?: any;
  penSpeed: number;
  //던전에서 사용 시 css
  isDungeon?: boolean;
}

// PlayPenGame에서 사용되는 애니메이션
export const animation = keyframes`
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

// DungeonFight에서 사용되는 애니메이션
export const animationDungeon = keyframes`
    0% {
      transform:translate(-25em);
    }
  50%{
    transform:translate(200px); 
   }
    100%{
      transform:translate(-25em);
    }
  `;

export const PenWrap = styled.div<penAni>`
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
  object-fit:cover;

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

export const PenEnd = styled.div<penAni>`
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

export const PenWrapDungeon = styled.div<penAni>`
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

export const PenEndDungeon = styled.div<penAni>`
  width: 1px;
  height: 100px;
  background: rgba(0, 0, 0, 1);
  position: absolute;
  z-index: 100;
  top: 600px;
  left: 590px;
  margin: none;
  animation-fill-mode: both;
  animation-play-state: running;
  animation: ${animationDungeon} ${(props) => props.penSpeed}s ease-in-out
    infinite; //1초동안 선형 무한 속성값주기
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}
`;

export const PenImgWrap = styled.div`
top:183px;
left:-120px;
position:relative;
height:370px;
width:auto;
`


export const PenImg = styled.img<penAni>`
z-index:100;
display:block;
position:relative;
height: auto;
width:auto;
top: 0px;
left: 0px;
margin: none;
animation-fill-mode: both;
  animation-play-state: running;
  animation: ${animation} ${(props) => props.penSpeed}s ease-in-out infinite;
    infinite; //1초동안 선형 무한 속성값주기
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}

`

export const PenEnd2 = styled.div<penAni>`
  width: 1px;
  height: 100px;
  background: rgba(0, 0, 0, 1);
  position: absolute;
  z-index: 100;
  top: -30px;
  left:50%;
  transform:translateX(-50%);
  animation-fill-mode: both;
  animation: ${animation} ${(props) => props.penSpeed}s ease-in-out infinite; //1초동안 선형 무한 속성값주기
  animation-play-state: running;
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}
`;


export const PenImgWrapDun = styled.div`
top:650px;
left:550px;
position:absolute;
height:153px;
width:auto;
`


export const PenImgDun = styled.img<penAni>`
z-index:100;
display:block;
position:relative;
height: auto;
width:auto;
top: 0px;
left: 0px;
margin: none;
animation-fill-mode: both;
  animation-play-state: running;
  animation: ${animationDungeon} ${(props) => props.penSpeed}s ease-in-out infinite;
    infinite; //1초동안 선형 무한 속성값주기
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}

`

export const PenEndDun = styled.div<penAni>`
  width: 1px;
  height: 100px;
  background: rgba(0, 0, 0, 1);
  position: absolute;
  z-index: 100;
  top: -30px;
  left:50%;
  transform:translateX(-50%);
  animation-fill-mode: both;
  animation: ${animationDungeon} ${(props) => props.penSpeed}s ease-in-out infinite; //1초동안 선형 무한 속성값주기
  animation-play-state: running;
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}
`;

