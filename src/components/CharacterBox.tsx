import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import 캐릭터배경 from '../img/캐릭터배경.png';
import { gelatine, attack1, attack2, attack3, attack4, movingAni } from '../styledComponents/DungeonFight_Effect';
import { ballPenList } from '../util/ballPenList';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface } from '../modules/login';

interface dungeonAni {
  gelatine?: boolean;
  attack?: string;
  moving?: boolean;
}
const CharacterWrap = styled.div<dungeonAni>`
  width: 200px;
  height: 300px;
  position: relative;
  z-index: 10;
  ${(props) =>
    props.gelatine &&
    css`
      animation: ${gelatine} 0.35s 0.2s;
    `}
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
    props.moving &&
    css`
      animation: ${movingAni} 1s;
    `}
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const EquipBallpen = styled.div<dungeonAni>`
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
  }

  ${(props) =>
    props.attack === 'attack1' &&
    css`
      animation: ${attack1} 1s;
      animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    `}
  ${(props) =>
    props.attack === 'attack2' &&
    css`
      animation: ${attack2} 1s;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    `}
    ${(props) =>
    props.attack === 'attack3' &&
    css`
      animation: ${attack3} 1s;
      animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
    `}
    ${(props) =>
    props.attack === 'attack4' &&
    css`
      animation: ${attack4} 1s;
      animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
    `}
`;

interface children {
  children?: React.ReactNode;
  gelatine?: boolean;
  attack?: string;
  moving?: boolean;
}
const CharacterBox = ({ children, gelatine, attack, moving }: children) => {
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const equipBallpen = userInfo.EquipBallpen;
  return (
    <>
      <CharacterWrap gelatine={gelatine}>
        {children}
        <Character moving={moving}>
          <EquipBallpen attack={attack}>
            <img
              src={ballPenList[equipBallpen]}
              alt='무기'
            ></img>
          </EquipBallpen>
          <img
            src={캐릭터배경}
            alt='캐릭터배경'
          ></img>
        </Character>
      </CharacterWrap>
    </>
  );
};

export default CharacterBox;
