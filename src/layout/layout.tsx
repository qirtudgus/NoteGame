import { Outlet } from 'react-router-dom';
import BackGround from '../components/BackGround';
import UserInfo from '../components/userInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import React, { useEffect, useState } from 'react';
import TokenExpired from '../page/TokenExpired';
const Layout = () => {
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const isTokenExpired = useSelector((state: RootState) => state.login.tokenExpired);

  return (
    <BackGround>
      {isTokenExpired ? (
        <TokenExpired></TokenExpired>
      ) : (
        <>
          <Outlet />
          {isLogin && <UserInfo></UserInfo>}
        </>
      )}
    </BackGround>
  );
};

export default React.memo(Layout);
