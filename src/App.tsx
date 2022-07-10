import React from 'react';

import './App.css';
import './Reset.css'
import BackGround from './components/BackGround';
import BasicInputs from './components/BasicInput';
import BasicButtons from './components/BasicButton';


function App() {
  return (
    <BackGround>
      <BasicInputs placeholder="아이디"></BasicInputs>
      <BasicInputs placeholder="비밀번호"></BasicInputs>
      <BasicButtons ButtonText='로그인' color='#e1550a'></BasicButtons>
      <BasicButtons ButtonText='회원가입' color='#e1550a'></BasicButtons>
  

    </BackGround>
  );
}


export default App;
