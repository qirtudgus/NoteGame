import React from 'react';

import './App.css';
import './Reset.css'
import BackGround from './components/BackGround';
import BasicInputs from './components/BasicInput';
import BasicButtons from './components/BasicButton';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from './modules/modules_index';
import {login} from './modules/register';


function App() {
  // const [isLogin, SetIsLogin] = useState<boolean>(false)
  const isLogin = useSelector((state:RootState) => state.register.isLogin);
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다

  const loginRequest = () => {
    dispatch(login())
  }

  return ( <>
    {isLogin ? 
        <BackGround>
          <BasicButtons ButtonText='환영합니다!' color='#e1550a'></BasicButtons>
        </BackGround>
    :     
     
      <BackGround>
      <BasicInputs placeholder="아이디"></BasicInputs>
      <BasicInputs placeholder="비밀번호"></BasicInputs>
      <BasicButtons ButtonText='로그인' color='#e1550a' func={loginRequest}></BasicButtons>
      <Link to='/register'><BasicButtons ButtonText='회원가입' color='#e1550a'></BasicButtons></Link>
    </BackGround>
  
  }
  </>
  );
}


export default App;
