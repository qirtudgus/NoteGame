import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
// import { expTable } from '../util/ExpTable';
import { expTable } from '../util/expTable';
import React from 'react';
import { LoginUserInfoInterface } from '../modules/login';

const BasicBox = styled.div`
  width: auto;
  height: 190;
  position: absolute;
  bottom: 20px;
  left: 35px;
  z-index: 10;
  font-size: 22px;
  font-weight: bold;
  line-height: 32px;
`;

const UserInfo = () => {
  const userId = useSelector((state: RootState) => state.login.id);
  const { Level, BasicHp, BasicDamage, Gold, Exp } = useSelector(
    (state: RootState) => state.login.userInfo,
  ) as LoginUserInfoInterface;

  return (
    <BasicBox>
      <p>{userId}</p>
      <p>레벨 {Level}</p>
      <p>체력 {BasicHp}</p>
      <p>공격력 {BasicDamage}</p>
      <p>골드 {Gold.toLocaleString()}</p>
      <p>
        경험치 {Exp} / {expTable[Level]}
      </p>
    </BasicBox>
  );
};

export default React.memo(UserInfo);
