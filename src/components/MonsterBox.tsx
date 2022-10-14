import styled, { css } from 'styled-components';
import {
  gelatine,
  monsterAttack,
  monsetKillEffect,
  monsterAppearEffect,
} from '../styledComponents/DungeonFight_Effect';
import { monsterArr } from '../util/dungeonMonsterList';

const CharacterWrap = styled.div<children>`
  width: 300px;
  height: 300px;
  position: relative;
  z-index: 10;

  ${(props) =>
    props.gelatine &&
    css`
      animation: ${gelatine} 0.35s 0.45s;
    `}
  ${(props) =>
    props.attack &&
    css`
      animation: ${monsterAttack} 0.4s 0.15s;
    `}
`;
interface children {
  children?: React.ReactNode;
  id?: string | undefined;
  gelatine?: boolean;
  monsterCall?: number;
  attack?: boolean;
  monsterKill?: boolean;
}

const Character = styled.div<children>`
  justify-content: center;
  //등장 이펙트
  animation: ${monsterAppearEffect} 0.7s;
  ${(props) =>
    props.monsterKill &&
    css`
      & > img {
        animation: ${monsetKillEffect} 0.9s cubic-bezier(0.165, 0.84, 0.44, 1) both;
      }
    `}
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  z-index: 10;
  & img {
    width: 100%;
  }
`;

const MonsterBox = ({ children, id, gelatine, monsterCall, attack, monsterKill }: children) => {
  return (
    <CharacterWrap
      id={id}
      gelatine={gelatine}
      attack={attack}
    >
      {children}
      <Character monsterKill={monsterKill}>{monsterArr[monsterCall!]}</Character>
    </CharacterWrap>
  );
};

export default MonsterBox;
