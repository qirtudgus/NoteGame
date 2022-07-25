import React, { useEffect, useState } from 'react';

import './App.css';
import './Reset.css'
import BackGround from './components/BackGround';
import BasicInputs from './components/BasicInput';
import BasicButtons from './components/BasicBtn';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from './modules/modules_index';
import {login_request} from './modules/login';
import customAxios from './util/axios';


function App() {
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
  const navigate = useNavigate();
  const [Id, setId] = useState<string>("")
  const [Password, setPassword] = useState<string>("")
  const isLogin = useSelector((state:RootState) => state.login.isLogin);
  const isTokenExPired =useSelector((state:RootState) => state.login.tokenExpired);
  const userId =useSelector((state:RootState) => state.login.id);

  const loginRequest = () => {
    dispatch(login_request(Id,Password))

  }

 const onChangeId = (e:any) => {
  setId(e.currentTarget.value)
 }

 const onChangePassword = (e:any) => {
  setPassword(e.currentTarget.value)
 }

const logoutRequest = () => {
  localStorage.removeItem('token')
  window.location.replace('/')
}

useEffect(()=>{
  if(isLogin === true){
    navigate('/home')
  }
},[isLogin])



  return ( <>
  
      <BackGround>
      <BasicInputs value={Id} placeholder="아이디" OnChange={onChangeId}></BasicInputs>
      <BasicInputs value={Password} placeholder="비밀번호" OnChange={onChangePassword}></BasicInputs>
      <BasicButtons ButtonText='로그인' color='#e1550a' OnClick={loginRequest}></BasicButtons>
      <Link to='/register'><BasicButtons ButtonText='회원가입' color='#e1550a'></BasicButtons></Link>
    </BackGround>

  </>
  );
}


export default App;
