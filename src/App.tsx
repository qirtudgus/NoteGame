import React, { useEffect, useRef, useState } from 'react';

import './App.css';
import './Reset.css';
import BasicInputs from './components/BasicInput';
import BasicBtn from './components/BasicBtn';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './modules/modules_index';
import { login_request } from './modules/login';

function App() {
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
  const navigate = useNavigate();
  const [Id, setId] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const isLogin = useSelector((state: RootState) => state.login.isLogin);

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

  return (
    <>
      <BasicInputs
        ref={IdRef}
        value={Id}
        placeholder='아이디'
        OnChange={onChangeId}
      ></BasicInputs>
      <BasicInputs
        ref={PasswordRef}
        value={Password}
        placeholder='비밀번호'
        OnChange={onChangePassword}
        type='password'
      ></BasicInputs>
      <BasicBtn
        ButtonText='로그인'
        OnClick={loginRequest}
      ></BasicBtn>
      <BasicBtn
        ButtonText='회원가입'
        OnClick={() => navigate('/register')}
      ></BasicBtn>
    </>
  );
}

export default React.memo(App);
