import styled from 'styled-components';
import logOut from '../img/로그아웃.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../modules/login';
import { Back } from './BtnMenu';
import React from 'react';
//이미지 사용
//https://velog.io/@shinwonse/React-styled-components%EC%97%90%EC%84%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80
const BtnImg = styled.img.attrs({
  src: `${logOut}`,
})`
  width: 30px;
  height: 30px;
`;

const LogOutBtn = () => {
  const dispatch = useDispatch();
  const logOutRequest = () => {
    dispatch(logout());
  };

  return (
    <>
      <Back
        onClick={() => {
          logOutRequest();
        }}
        title='로그아웃'
      >
        <BtnImg alt='logOut' />
      </Back>
    </>
  );
};

export default React.memo(LogOutBtn);
