import styled, { css } from 'styled-components';
import { gelatine } from '../styledComponents/DungeonFight';
import { monsterArr } from '../util/dungeonMonsterList';

const CharacterWrap = styled.div<children>`
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
interface children {
  children?: React.ReactNode;
  id?: string | undefined;
  gelatine?: boolean;
  monsterCall?: number;
}

const Character = styled.div`
  justify-content: center;
  display: flex;
  align-items: flex-end;
  width: 200px;
  height: 280px;
  top: 0;
  position: absolute;
  z-index: 10;
  & img {
    width: 100%;
  }
`;

const MonsterBox = ({ children, id, gelatine, monsterCall }: children) => {
  return (
    <CharacterWrap id={id} gelatine={gelatine}>
      {children}
      <Character>{monsterArr[monsterCall!]}</Character>
    </CharacterWrap>
  );
};

export default MonsterBox;
