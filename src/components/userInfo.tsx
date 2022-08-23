import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
// import { expTable } from '../util/ExpTable';
import { expTable } from '../util/expTable';
import React from 'react';

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
  const userInfo = useSelector((state: RootState) => state.login.userInfo);

  return (
    <BasicBox>
      <p>{userId}</p>
      <p>레벨 {userInfo?.Level}</p>
      <p>체력 {userInfo?.BasicHp}</p>
      <p>공격력 {userInfo?.BasicDamage}</p>
      <p>골드 {userInfo?.Gold.toLocaleString()}</p>
      <p>
        경험치 {userInfo?.Exp} / {expTable[userInfo?.Level!]}
      </p>
    </BasicBox>
  );
};

export default React.memo(UserInfo);
