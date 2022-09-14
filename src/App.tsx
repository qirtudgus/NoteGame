import React, { useEffect, useRef, useState } from 'react';

import './App.css';
import './Reset.css';
import BasicInputs from './components/BasicInput';
import BasicBtn from './components/BasicBtn';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './modules/modules_index';
import { login_request } from './modules/login';
import 하얀체크 from './img/하얀체크.svg';
import styled, { keyframes } from 'styled-components';

const LoginErrorText = styled.p`
  color: red;
  font-size: 1.3rem;
`;

const checkAni = keyframes`
  /* from{transition:translateY(0px)}
  to{transition:translateY(40px)} */
  /* from{height:0px}
  to{height:40px} */
  from {transform: scale(0);}
  50% {transform: scale(1.3); }
  to {transform: scale(0.9);}
`;
const Check = styled.div`
  width: 40px;
  height: 40px;
  background: green;
  border-radius: 40px;
  animation: ${checkAni} 0.45s ease;
`;

function App() {
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
  const navigate = useNavigate();
  const [Id, setId] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  // const [isLoading, setIsLoading] = useState(false);
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const isLoading = useSelector((state: RootState) => state.isLoadingRequest.isLoading);
  const isLoadingText = useSelector((state: RootState) => state.isLoadingRequest.text);
  const isLoadingCode = useSelector((state: RootState) => state.isLoadingRequest.code);

  const IdRef = useRef() as any;
  const PasswordRef = useRef() as any;
  const loginRequest = () => {
    if (Id === '') {
      alert('아이디를 입력해주세요');
      IdRef.current.focus();
      return;
    }
    if (Password === '') {
      alert('비밀번호를 입력해주세요');
      PasswordRef.current.focus();
      return;
    }
    dispatch(login_request(Id, Password));
  };

  const onChangeId = (e: any) => {
    setId(e.currentTarget.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.currentTarget.value);
  };

  useEffect(() => {
    if (isLogin === true) {
      navigate('/home');
    }
  }, [isLogin]);

  const statusArr = [
    null,
    <div className='lds-ring'>
      <div></div>
    </div>,
    <Check>
      <img src={하얀체크}></img>
    </Check>,
    null,
  ];

  const statusTextarr = ['로그인', null, null, '로그인'];

  return (
    <>
      <BasicInputs
        ref={IdRef}
        value={Id}
        placeholder='아이디'
        margin='0 0 0 0'
        OnChange={onChangeId}
      ></BasicInputs>
      <BasicInputs
        ref={PasswordRef}
        value={Password}
        placeholder='비밀번호'
        margin='0 0 1rem 0'
        OnChange={onChangePassword}
        type='password'
      ></BasicInputs>
      <LoginErrorText> {isLoadingText}</LoginErrorText>
      <BasicBtn
        ButtonText={statusTextarr[isLoadingCode]}
        OnClick={loginRequest}
      >
        {statusArr[isLoadingCode]}
      </BasicBtn>
      <BasicBtn
        ButtonText='회원가입'
        OnClick={() => navigate('/register')}
      ></BasicBtn>
    </>
  );
}

export default React.memo(App);
