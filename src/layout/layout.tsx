import { Outlet } from 'react-router-dom';
import BackGround from '../components/BackGround';
import HeaderInfo from '../components/HeaderInfo';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/modules_index';
import React from 'react';
import TokenExpired from '../page/TokenExpired';
import HelpModal from '../components/HelpModal';
import { userInfo_visible_off } from '../modules/userInfoVisible';
const Layout = () => {
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const isTokenExpired = useSelector((state: RootState) => state.login.tokenExpired);
  const isVisible = useSelector((state: RootState) => state.userInfo_visibleRequest.isVisible);
  const dispatch = useDispatch();
  return (
    <BackGround>
      {isVisible && (
        <HelpModal
          close
          OnClick={() => {
            dispatch(userInfo_visible_off());
          }}
        ></HelpModal>
      )}
      {isTokenExpired ? (
        <TokenExpired></TokenExpired>
      ) : (
        <>
          <Outlet />
          {isLogin && <HeaderInfo></HeaderInfo>}
        </>
      )}
    </BackGround>
  );
};

export default React.memo(Layout);
