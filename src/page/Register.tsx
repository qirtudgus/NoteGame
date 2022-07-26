import BackGround from "../components/BackGround"
import BasicButtons from "../components/BasicBtn"
import BasicInputs from "../components/BasicInput"
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { register } from "../modules/register";
import { confirm_id_request } from "../modules/confirmId";
import { RootState } from "../modules/modules_index";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [Name, setName] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [CheckPassword, setCheckPassword] = useState<string>("");
    const [isId, setIsId] = useState<boolean>(false);
    const [isPassword, setIsPassword] = useState<boolean>(false);
    const [isCheckPassword, setIsCheckPassword] = useState<boolean>(false);
    const [PasswordAuthText, setPasswordAuthText] = useState<string>();
    const [isPasswordAuthText, setIsPasswordAuthText] = useState<string>();
    const isRegister = useSelector((state:RootState) => state.register.isRegister);
    const isConfirmId = useSelector((state:RootState) => state.confirmId.confirmId)

    const navigate = useNavigate();

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
  
      //회원가입 버튼
      const onSubmitRegister = () => {
        if(Password === CheckPassword){
            registerRequest()
            alert("회원가입 완료")
            navigate('/')
        }else{
            alert("비밀번호를 확인해주세요.")
        }
      }

      //아이디 중복확인 액션
      const confirmIdRequest = () => {
        console.log(isConfirmId)
        dispatch(confirm_id_request(Name))

      }
      // 아이디 확인 함수
  useEffect(() => {
    if(isConfirmId === true){
      setIsId(() => true);
    }else{
      setIsId(() => false)
    }
  },[Name,isConfirmId])

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
        <>
        { isConfirmId  ? 
            <div>사용가능한 아이디입니다.</div> :
            <div>이미 사용중인 아이디입니다.</div>    
        }
        <BasicInputs placeholder="아이디" OnChange={onNameHandler} OnBlur={confirmIdRequest} value={Name} color="#fff"></BasicInputs>
        
        { isPassword  ? 
            <div>{PasswordAuthText}</div> :
            <div>{PasswordAuthText}</div>    
        }
        <BasicInputs placeholder="비밀번호" type="password" OnChange={onPasswordHandler} value={Password}></BasicInputs>
        { isCheckPassword  ? 
            <div>{isPasswordAuthText}</div> :
            <div>{isPasswordAuthText}</div>    
        }
        <BasicInputs placeholder="비밀번호 확인" type="password" OnChange={onCheckPasswordHandler} value={CheckPassword}></BasicInputs>

        <BasicButtons disabled={!(isId && isPassword && isCheckPassword)} ButtonText="회원가입" color="#fff" OnClick={onSubmitRegister}></BasicButtons>
        </>
    )
}

export default Register

