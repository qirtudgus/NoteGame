import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import 캐릭터배경 from '../img/캐릭터배경.png';
import {
  gelatine,
  attack1,
  attack2,
  attack3,
  attack4,
  movingAni,
  normallyMoving,
} from '../styledComponents/DungeonFight_Effect';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface } from '../modules/login';
import { penObj } from '../util/shopList';
import { paperObj } from '../util/paperList';
interface dungeonAni {
  gelatine?: boolean;
  attack?: string;
  moving?: boolean;
  normally?: boolean;
}
const CharacterWrap = styled.div<dungeonAni>`
  width: 200px;
  height: 300px;
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
`;
const Character = styled.div<dungeonAni>`
  justify-content: center;
  display: flex;
  align-items: flex-end;
  width: 160px;
  height: 300px;
  top: 0;
  position: absolute;
  z-index: 10;
  & img {
    width: 100%;
  }
  ${(props) =>
    props.normally &&
    css`
      animation: ${normallyMoving} 1s infinite cubic-bezier(0.22, 0.61, 0.36, 1);
    `}
  ${(props) =>
    props.gelatine &&
    css`
      animation: ${gelatine} 0.35s 0.2s;
    `}
  ${(props) =>
    props.moving &&
    css`
      animation: ${movingAni} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `}
`;

const attackTime = '0.7s';
const attackDelayTime = '0.3s';

const EquipBallpenImg = styled.div<dungeonAni>`
  position: absolute;
  width: 20px;
  height: 100px;
  transform: rotate(60deg);
  top: 8rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  & img {
    object-fit: cover;
    filter: drop-shadow(5px -5px 2px rgba(0, 0, 0, 0.35));
  }
  ${(props) =>
    props.attack === 'attack0' &&
    css`
      animation: none;
    `}

  ${(props) =>
    props.attack === 'attack1' &&
    css`
      animation: ${attack1} ${attackTime};
      animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    `}
  ${(props) =>
    props.attack === 'attack2' &&
    css`
      animation: ${attack2} ${attackTime};
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    `}
    ${(props) =>
    props.attack === 'attack3' &&
    css`
      animation: ${attack3} ${attackTime};
      animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
    `}
    ${(props) =>
    props.attack === 'attack4' &&
    css`
      animation: ${attack4} ${attackTime};
      animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
    `} animation-delay: ${attackDelayTime};
`;

interface children {
  children?: React.ReactNode;
  gelatine?: boolean;
  attack?: string;
  moving?: boolean;
  normally?: boolean;
}
const CharacterBox = ({ children, gelatine, attack, moving, normally }: children) => {
  const { EquipBallpen, EquipPaper } = useSelector(
    (state: RootState) => state.login.userInfo,
  ) as LoginUserInfoInterface;

  let equipBallpenImg = penObj.find((i) => i.ballPenName === EquipBallpen)?.img;
  let equipPaperImg = paperObj.find((i) => i.paperName === EquipPaper)?.img;

  return (
    <>
      <CharacterWrap>
        {children}
        <Character
          id='CharacterBox'
          gelatine={gelatine}
          moving={moving}
          normally={normally}
        >
          <EquipBallpenImg attack={attack}>
            <img
              src={equipBallpenImg}
              alt='무기'
            ></img>
          </EquipBallpenImg>
          <img
            src={equipPaperImg}
            alt='캐릭터배경'
          ></img>
        </Character>
      </CharacterWrap>
    </>
  );
};

export default React.memo(CharacterBox);
