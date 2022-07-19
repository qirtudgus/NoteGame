import BackGround from "./BackGround"
import BasicButtons from "./BasicButton"
import BasicInputs from "./BasicInput"
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { register } from "../modules/register";
import { confirm_id_request } from "../modules/confirmId";
import { RootState } from "../modules/modules_index";


const Register = () => {
    const [Name, setName] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [CheckPassword, setCheckPassword] = useState<string>("");
    const [isPassword, setIsPassword] = useState<boolean>();
    const [isCheckPassword, setIsCheckPassword] = useState<boolean>();
    const [PasswordAuthText, setPasswordAuthText] = useState<string>();
    const [isPasswordAuthText, setIsPasswordAuthText] = useState<string>();
    const isRegister = useSelector((state:RootState) => state.register.isRegister);
    const isConfirmId = useSelector((state:RootState) => state.confirmId.confirmId)

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
      const passwordRegex :RegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,20}$/;
      const passwordCurrent = e.currentTarget.value;


        setPassword(e.currentTarget.value);
        if (!passwordRegex.test(passwordCurrent)) {
          setPasswordAuthText('5~20자의 영문,숫자를 사용하세요.');
          setIsPassword(false);
        } else {
          setPasswordAuthText('올바른패스워드입니다.');
          setIsPassword(true);
        }
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

      const confirmIdRequest = () => {
        console.log(isConfirmId)
        dispatch(confirm_id_request(Name))
      }


       // 패스워드 확인 함수
  useEffect(() => {
      if (Password === CheckPassword) {
        setIsPasswordAuthText('패스워드가 일치합니다.');
        setIsCheckPassword(true);
      } else {
        setIsPasswordAuthText('패스워드가 틀립니다.');
        setIsCheckPassword(false);
      }
    
  }, [CheckPassword, Password]);

    return (
        <BackGround>
            { isRegister === 200 ? 
            <div>200입니다</div> :
            <div>아닙니다.</div>    
        }
        <BasicInputs placeholder="아이디" OnChange={onNameHandler} OnBlur={confirmIdRequest} value={Name} color="#555"></BasicInputs>
        { isConfirmId  ? 
            <div>사용가능한 아이디입니다.</div> :
            <div>이미 사용중인 아이디입니다.</div>    
        }
        <BasicInputs placeholder="비밀번호" type="password" OnChange={onPasswordHandler} value={Password}></BasicInputs>
        
        { isPassword  ? 
            <div>{PasswordAuthText}</div> :
            <div>{PasswordAuthText}</div>    
        }
        <BasicInputs placeholder="비밀번호 확인" type="password" OnChange={onCheckPasswordHandler} value={CheckPassword}></BasicInputs>
        { isCheckPassword  ? 
            <div>{isPasswordAuthText}</div> :
            <div>{isPasswordAuthText}</div>    
        }
        <BasicButtons ButtonText="회원가입" color="#fff" OnClick={onSubmitRegister}></BasicButtons>
        </BackGround>
    )
}

export default Register

