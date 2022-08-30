import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../modules/modules_index';
import { logout } from '../modules/login';
import BtnMenu from '../components/BtnMenu';
import FooterMenu from '../components/FooterMenu';
import React from 'react';
import CharacterBox from '../components/CharacterBox';
const Home = () => {
  const isTokenExPired = useSelector((state: RootState) => state.login.tokenExpired);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutRequest = () => {
    dispatch(logout());
  };
  return (
    <>
      <BtnMenu LogOut></BtnMenu>
      {isTokenExPired ? (
        <div>
          <p>토큰이 만료되었습니다 재로그인해주세요.</p>
          <button
            onClick={() => {
              navigate('/');
            }}
          >
            로그인
          </button>
          <button onClick={logOutRequest}>로그아웃</button>
        </div>
      ) : (
        <>
          <CharacterBox></CharacterBox>
          <FooterMenu></FooterMenu>
        </>
      )}
    </>
  );
};

export default React.memo(Home);
