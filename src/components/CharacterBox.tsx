import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import 캐릭터배경 from '../img/캐릭터배경.png';
import { gelatine } from '../styledComponents/DungeonFight';
import { ballPenList } from '../util/ballPenList';
import { RootState } from '../modules/modules_index';
interface dungeonAni {
  gelatine?: boolean;
}

const CharacterWrap = styled.div<dungeonAni>`
  width: 200px;
  height: 300px;
  position: relative;
  z-index: 10;
  ${(props) =>
    props.gelatine &&
    css`
      animation: ${gelatine} 0.35s;
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

const EquipBallpen = styled.div`
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
`;

interface children {
  children?: React.ReactNode;
  id?: string | undefined;
  gelatine?: boolean;
  userHpBar?: any;
  userInfo?: any;
  dungeonStart?: any;
}

const CharacterBox = ({ children, gelatine }: children) => {
  const userInfo: any = useSelector((state: RootState) => state.login.userInfo);
  const equipBallpen = userInfo.EquipBallpen;
  return (
    <>
      <CharacterWrap gelatine={gelatine}>
        {children}
        <Character>
          <EquipBallpen>
            <img src={ballPenList[equipBallpen]} alt='무기'></img>
          </EquipBallpen>
          <img src={캐릭터배경} alt='캐릭터배경'></img>
        </Character>
      </CharacterWrap>
    </>
  );
};

export default CharacterBox;
