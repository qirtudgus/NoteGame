import React, { useEffect, useState } from 'react';

import './App.css';
import './Reset.css'
import BackGround from './components/BackGround';
import BasicInputs from './components/BasicInput';
import BasicButtons from './components/BasicButton';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from './modules/modules_index';
import {login_request, logout} from './modules/login';
import customAxios from './util/axios';


function App() {
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
  const navigate = useNavigate();
  const [Id, setId] = useState<string>("")
  const [Password, setPassword] = useState<string>("")
  const isLogin = useSelector((state:RootState) => state.login.isLogin);
  const isToken =useSelector((state:RootState) => state.login.token);
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
  
 const tokenCheck = () => {
  customAxios('post','/login/tokencheck',{isToken}).then(res => {
    console.log(res.data)
  })
 }

 const tokenCheck2 = () => {
  customAxios('post','/login/tokencheck2',{isToken}).then(res => {
    console.log(res.data)
  })
 }


const tokenConfirm = () => {
  console.log(isToken)
  console.log(userId)
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
    {isLogin ? 
        <BackGround>
          <p>{userId}님 안녕하세요!</p>
          <BasicButtons ButtonText='환영합니다!' color='#e1550a'></BasicButtons>
          <BasicButtons ButtonText='토큰 테스트' color='#e1550a' OnClick={tokenCheck}></BasicButtons>
          <BasicButtons ButtonText='토큰 테스트2' color='#e1550a' OnClick={tokenCheck2}></BasicButtons>
          <BasicButtons ButtonText='토큰 값 확인' color='#e1550a' OnClick={tokenConfirm}></BasicButtons>
          <BasicButtons ButtonText='로그아웃' color='#e1550a' OnClick={logoutRequest}></BasicButtons>
        </BackGround>
      
    :     
     
      <BackGround>
      <BasicInputs value={Id} placeholder="아이디" OnChange={onChangeId}></BasicInputs>
      <BasicInputs value={Password} placeholder="비밀번호" OnChange={onChangePassword}></BasicInputs>
      <BasicButtons ButtonText='로그인' color='#e1550a' OnClick={loginRequest}></BasicButtons>
      <Link to='/register'><BasicButtons ButtonText='회원가입' color='#e1550a'></BasicButtons></Link>
    </BackGround>
  
  }
  </>
  );
}


export default App;
