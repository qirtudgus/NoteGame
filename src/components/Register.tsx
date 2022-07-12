import BackGround from "./BackGround"
import BasicButtons from "./BasicButton"
import BasicInputs from "./BasicInput"
import axios from "axios";
import { useState } from "react";



const Register = () => {
    const [Name, setName] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [CheckPassword, setCheckPassword] = useState<string>("");
    const onNameHandler = (e:any) => {
      setName(e.currentTarget.value);
    };

    const onPasswordHandler = (e:any) => {
        setPassword(e.currentTarget.value);
      };
      const onCheckPasswordHandler = (e:any) => {
        setCheckPassword(e.currentTarget.value);
      };  
  


    return (
        <BackGround>
        <BasicInputs placeholder="아이디" onChange={onNameHandler} value={Name}></BasicInputs>
        <BasicInputs placeholder="비밀번호" onChange={onPasswordHandler} value={Password}></BasicInputs>
        <BasicInputs placeholder="비밀번호 확인" onChange={onCheckPasswordHandler} value={CheckPassword}></BasicInputs>
        <BasicButtons ButtonText="회원가입" color="#fff"></BasicButtons>
        </BackGround>
    )
}

export default Register

