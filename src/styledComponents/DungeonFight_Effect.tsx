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
  penSpeed?: number;
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
      transform:translate(-22em);
    }
  50%{
    transform:translate(200px); 
   }
    100%{
      transform:translate(-22em);
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
  object-fit: cover;

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
  animation: ${animationDungeon} ${(props) => props.penSpeed}s ease-in-out infinite; //1초동안 선형 무한 속성값주기
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
  animation: ${animationDungeon} ${(props) => props.penSpeed}s ease-in-out infinite; //1초동안 선형 무한 속성값주기
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}
`;

export const PenImgWrap = styled.div`
  top: 183px;
  left: -120px;
  position: relative;
  height: 370px;
  width: auto;
`;

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

`;

export const PenEnd2 = styled.div<penAni>`
  width: 1px;
  height: 100px;
  background: rgba(0, 0, 0, 1);
  position: absolute;
  z-index: 100;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  animation-fill-mode: both;
  animation: ${animation} ${(props) => props.penSpeed}s ease-in-out infinite;
  animation-play-state: running;
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}
`;

export const PenImgWrapDun = styled.div`
  top: 650px;
  left: 550px;
  position: absolute;
  height: 153px;
  width: auto;
`;

export const PenImgDun = styled.img<penAni>`
  z-index: 100;
  display: block;
  position: relative;
  height: auto;
  width: auto;
  top: 0px;
  left: 0px;
  margin: none;
  animation-fill-mode: both;
  animation-play-state: running;
  animation: ${animationDungeon} ${(props) => props.penSpeed}s ease-in-out infinite;
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}
`;

export const PenEndDun = styled.div<penAni>`
  width: 1px;
  height: 100px;
  background: rgba(0, 0, 0, 1);
  position: absolute;
  z-index: 100;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  animation-fill-mode: both;
  animation: ${animationDungeon} ${(props) => props.penSpeed}s ease-in-out infinite; //1초동안 선형 무한 속성값주기
  animation-play-state: running;
  ${(props) =>
    props.penStatus &&
    css`
      animation-play-state: paused;
    `}
`;

export const monsterAttack = keyframes`
  from, to { transform: translateX(0) ; }
  25% { transform: translateX(30px); }
  75% { transform:  translateX(-100px); }
  `;

export const monsterAppearEffect = keyframes`
  0% {
    -webkit-transform: translateY(-500px);
            transform: translateY(-500px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateY(-65px);
            transform: translateY(-65px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateY(-28px);
            transform: translateY(-28px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
`;
export const monsetKillEffect = keyframes`
 0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(2);
            transform: scale(2);
    -webkit-filter: blur(4px);
            filter: blur(4px);
    opacity: 0;
  }
`;
export const highRewordEffect = keyframes`
 	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}

`;

export const choiceRewordEffect = keyframes`
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }
  40% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }
  50% {
    -webkit-transform: scale3d(0.85, 1.15, 1);
            transform: scale3d(0.85, 1.15, 1);
  }
  65% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  75% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }

`;

export const damageTextAni = keyframes`
from { opacity: 1; top:70px; }  
to { opacity: 0;top:0px;  }
`;

//유저 무빙 및 어택 이펙트
export const attack1 = keyframes`
  from, to { transform: rotate(60deg) ; }
  25% { transform: rotate(-20deg); }
  30% { transform:  rotate(-22deg) ; }
  40% { transform:  rotate(110deg) ; }
  75% { transform:  rotate(100deg); }
  `;

export const attack2 = keyframes`
  from, to { transform: rotate(60deg) ; }
  15% { transform: rotate(-60deg); }
  50% { transform: rotate(230deg); }
  `;
export const attack3 = keyframes`
  from, to { transform: rotate(30deg) ; }
  25% { transform: rotate(-20deg); }
  30% { transform:  rotate(-22deg) ; }
  40% { transform:  rotate(60deg) ; }
  `;

export const attack4 = keyframes`
  from, to { transform: rotate(30deg) ; }
  40% { transform: rotate(150deg); }

  `;

export const movingAni = keyframes`
from, to { transform: translate(0px, 0px) ; }
25% { transform: translate(270px, 0px); }
75% { transform: translate(270px, 0px); }
`;
