import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../modules/modules_index';
import { logout } from '../modules/login';
// import { expTable } from '../util/ExpTable';
import { expTable } from '../util/expTable';
import React from 'react';

const BasicBox = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  bottom: 20px;
  left: 50px;
  z-index: 10;
  font-size: 22px;
  font-weight: bold;
  line-height: 32px;
`;
interface children {
  children?: React.ReactNode;
}

const UserInfo = ({ children }: children) => {
  const userId = useSelector((state: RootState) => state.login.id);
  const userInfo = useSelector((state: RootState) => state.login.userInfo);

  //   console.log(userInfo);

  const dispatch = useDispatch();
  const logOutRequest = () => {
    dispatch(logout());
  };

  return (
    <BasicBox>
      {children}

      <p>{userId}</p>
      <p>레벨 {userInfo?.Level}</p>
      <p>체력 {userInfo?.BasicHp}</p>
      <p>공격력 {userInfo?.BasicDamage}</p>
      <p>골드 {userInfo?.Gold.toLocaleString()}</p>
      <p>보유 경험치 {userInfo?.Exp}</p>
      <p>필요 경험치 {expTable[userInfo?.Level!]}</p>
      <button onClick={logOutRequest}>로그아웃</button>
    </BasicBox>
  );
};

export default React.memo(UserInfo);
