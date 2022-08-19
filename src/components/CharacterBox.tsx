import { useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import 캐릭터배경 from '../img/캐릭터배경.png';
import { gelatine } from '../styledComponents/DungeonFight';
import { ballPenList } from '../util/ballPenList';
import { RootState } from '../modules/modules_index';
interface dungeonAni {
  gelatine?: boolean;
  attack?: string;
  attack1?: string;
  attack2?: string;
}

export const attack1 = keyframes`
  from, to { transform: rotate(60deg) ; }
  25% { transform: rotate(-20deg); }
  30% { transform:  rotate(-22deg) ; }
  40% { transform:  rotate(110deg) ; }
  75% { transform:  rotate(100deg); }
  `;

export const attack2 = keyframes`
  from, to { transform: rotate(60deg) ; }
  25% { transform: rotate(-20deg); }
  30% { transform:  rotate(-22deg) ; }
  40% { transform:  rotate(110deg) ; }
  75% { transform:  rotate(150deg); }
  `;
export const attack3 = keyframes`
  from, to { transform: rotate(30deg) ; }
  25% { transform: rotate(-20deg); }
  30% { transform:  rotate(-22deg) ; }
  40% { transform:  rotate(60deg) ; }
  `;

// const WeaponWrap = styled.div<dungeonAni>`
// position:relative;
// left:0px;
// top:0px;
// width:100%;
// height:100%;
// background:#555;

// `

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
const Character = styled.div`
  justify-content: center;
  display: flex;
  align-items: flex-end;
  width: 200px;
  height: 300px;
  top: 0;
  position: absolute;
  z-index: 10;
  & img {
    width: 100%;
  }
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
  animation-timing-function: ease-in;

  ${(props) =>
    props.attack === 'attack1' &&
    css`
      animation: ${attack1} 0.8s;
    `}
  ${(props) =>
    props.attack === 'attack2' &&
    css`
      animation: ${attack2} 0.8s;
    `}
    ${(props) =>
    props.attack === 'attack3' &&
    css`
      animation: ${attack3} 0.8s;
    `}
`;

interface children {
  children?: React.ReactNode;
  id?: string | undefined;
  gelatine?: boolean;
  userHpBar?: any;
  userInfo?: any;
  dungeonStart?: any;
  attack?: string;
  attack1?: string;
  attack2?: string;
}

const CharacterBox = ({ children, gelatine, attack }: children) => {
  const userInfo: any = useSelector((state: RootState) => state.login.userInfo);
  const equipBallpen = userInfo.EquipBallpen;
  return (
    <>
      <CharacterWrap gelatine={gelatine}>
        {children}
        <Character>
          <EquipBallpen attack={attack}>
            <img src={ballPenList[equipBallpen]} alt='무기'></img>
          </EquipBallpen>
          <img src={캐릭터배경} alt='캐릭터배경'></img>
        </Character>
      </CharacterWrap>
    </>
  );
};

export default CharacterBox;
