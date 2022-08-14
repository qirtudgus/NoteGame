import styled, { css,keyframes } from 'styled-components';
import { gelatine } from '../styledComponents/DungeonFight';
import { monsterArr } from '../util/dungeonMonsterList';


export const attack = keyframes`
  from, to { transform: translateX(0) ; }
  25% { transform: translateX(30px); }
  75% { transform:  translateX(-100px); }
  `;

const CharacterWrap = styled.div<children>`
  width: 200px;
  height: 300px;
  position: relative;
  z-index: 10;
  ${(props) =>
    props.gelatine &&
    css`
      animation: ${gelatine} 0.35s 0.35s;
    `}
    ${(props) =>
      props.attack &&
      css`
        animation: ${attack} 0.35s 0.1s;
      `}
`;
interface children {
  children?: React.ReactNode;
  id?: string | undefined;
  gelatine?: boolean;
  monsterCall?: number;
  attack?:boolean;
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

const MonsterBox = ({ children, id, gelatine, monsterCall, attack }: children) => {
  console.log(attack)
  return (
    <CharacterWrap id={id} gelatine={gelatine} attack={attack}>
      {children}
      <Character>{monsterArr[monsterCall!]}</Character>
    </CharacterWrap>
  );
};

export default MonsterBox;
