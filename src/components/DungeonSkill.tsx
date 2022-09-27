import styled, { css } from 'styled-components';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface } from '../modules/login';
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

const Icon = styled.div<useSkill>`
  width: 50px;
  height: 50px;
  background: #eee;
  margin: 4px;
  ${(props) =>
    props.useDoubleAttack &&
    css`
      background: #e5005a;
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
            더블어택
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
