import BackGround from "./BackGround"
import BasicButtons from "./BasicButton"
import BasicInputs from "./BasicInput"
import axios from "axios";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { register } from "../modules/register";
import { RootState } from "../modules/modules_index";


const Register = () => {
    const [Name, setName] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [CheckPassword, setCheckPassword] = useState<string>("");
    const isRegister = useSelector((state:RootState) => state.register.isRegister);

    const dispatch = useDispatch();
    const onNameHandler = (e:any) => {
      setName(e.currentTarget.value);
    };

    const registerRequest = () => {
        dispatch(register(
            Name,Password
        ))
      }

    const onPasswordHandler = (e:any) => {
        setPassword(e.currentTarget.value);
      };
      const onCheckPasswordHandler = (e:any) => {
        setCheckPassword(e.currentTarget.value);
      };  
  
      const onSubmitRegister = () => {
        if(Password === CheckPassword){
            
            alert("비밀번호가 일치합니다..")
            registerRequest()
            console.log(isRegister)

        }else{
            alert("비밀번호를 확인해주세요.")
        }
      }


    return (
        <BackGround>
            <div>{isRegister}</div>
            { isRegister === 200 ? 
            <div>200입니다</div> :
            <div>아닙니다.</div>    
        }
        <BasicInputs placeholder="아이디" OnChange={onNameHandler} value={Name}></BasicInputs>
        <BasicInputs placeholder="비밀번호" OnChange={onPasswordHandler} value={Password}></BasicInputs>
        <BasicInputs placeholder="비밀번호 확인" OnChange={onCheckPasswordHandler} value={CheckPassword}></BasicInputs>
        <BasicButtons ButtonText="회원가입" color="#fff" OnClick={onSubmitRegister}></BasicButtons>
        </BackGround>
    )
}

export default Register

