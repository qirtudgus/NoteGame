import React from 'react';

import './App.css';
import './Reset.css'
import BackGround from './components/BackGround';
import BasicInputs from './components/BasicInput';


function App() {
  return (
    <BackGround>
      <BasicInputs placeholder="아이디"></BasicInputs>
      <BasicInputs placeholder="비밀번호"></BasicInputs>

    </BackGround>
  );
}


export default App;
