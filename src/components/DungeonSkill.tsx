import styled, { css, keyframes } from 'styled-components';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface } from '../modules/login';
import 더블어택 from '../img/skill/더블어택.jpg';
const Wrap = styled.div`
  position: absolute;
  right: 30px;
  z-index: 100;
  bottom: 30px;
  width: 175px;
  height: 175px;
  padding: 10px;
  background: #fff;
  display: flex;
  border-radius: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

interface useSkill {
  useDoubleAttack?: boolean;
}

const helpHighLight = keyframes`
  from{background:none; box-shadow:none}
  50%{background:rgba(255,255,255,0.8);   box-shadow: 0px 0px 12px -1px #ffffff;}
  to{background:none;box-shadow:none}
`;

const Icon = styled.div<useSkill>`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background: #eee;
  margin: 4px;
  position: relative;

  & img {
    position: relative;
    z-index: 1;
  }
  &::before {
    content: '';
    position: absolute;
    z-index: 2;
    top: 0px;
    left: 0px;
    width: 50px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.3);
  }

  ${(props) =>
    props.useDoubleAttack &&
    css`
      outline: 2px solid#ffbc26;
      &::before {
        content: '';
        position: absolute;
        z-index: 2;
        top: 0px;
        left: 0px;
        width: 50px;
        height: 50px;
        background-color: #e5005a;
        animation: ${helpHighLight} 0.8s infinite;
      }
    `}
`;

const DungeonSKill = (props: any) => {
  const { UpDoubleAttack } = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;

  return (
    <>
      <Wrap>
        {UpDoubleAttack > 0 ? (
          <Icon
            useDoubleAttack={props.useDoubleAttack}
            onClick={props.OnClick}
          >
            <img
              src={더블어택}
              alt='더블어택 아이콘'
            ></img>
          </Icon>
        ) : (
          <Icon></Icon>
        )}

        <Icon></Icon>
        <Icon></Icon>
        <Icon></Icon>
        <Icon></Icon>
        <Icon></Icon>
        <Icon></Icon>
        <Icon></Icon>
        <Icon></Icon>
      </Wrap>
    </>
  );
};

export default React.memo(DungeonSKill);
