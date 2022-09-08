import React, { MutableRefObject, useRef } from 'react';
import BasicButtons from '../components/BasicBtn';
import BasicInputs from '../components/BasicInput';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../modules/register';
import { confirm_id_request } from '../modules/confirmId';
import { RootState } from '../modules/modules_index';
import { useNavigate } from 'react-router-dom';
import BtnMenu from '../components/BtnMenu';
import styled, { css } from 'styled-components';
import 배경 from '../img/회원가입배경2.png';

interface inputWrap {
  isConfirm?: boolean | undefined | null;
  pTop?: string;
  isPassword?: boolean | undefined | null;
  isPasswordCheck?: boolean | undefined | null;
}

const InputDiv = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    z-index: -1;
    position: absolute;
    width: 500px;
    top: 100px;
    left: 265px;
  }
`;

const InputWrap = styled.div<inputWrap>`
  width: auto;
  height: 120px;
  display: flex;
  flex-direction: column;
  & > p {
    position: relative;
    /* top: ${(props) => props.pTop}; */
    top: 10px;
    width: auto;
    height: auto;
    color: red;
  }
  ${(props) =>
    props.isConfirm === null &&
    css`
      & > p {
        color: #000;
      }
    `}
  ${(props) =>
    props.isConfirm &&
    css`
      & > p {
        color: green;
      }
    `}
  ${(props) =>
    props.isPassword &&
    css`
      & > p {
        color: green;
      }
    `}
    ${(props) =>
    props.isPasswordCheck &&
    css`
      & > p {
        color: green;
      }
    `}
  & .inputTitle {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  & > input {
    border-bottom: 2px solid#333;
    background: #fff;
    /* background: rgba(255, 255, 255, 0); */
  }
`;

const Register = () => {
  const [Name, setName] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const [CheckPassword, setCheckPassword] = useState<string>('');
  const [isId, setIsId] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const [isCheckPassword, setIsCheckPassword] = useState<boolean>(false);
  const [PasswordAuthText, setPasswordAuthText] = useState<string>();
  const [isPasswordAuthText, setIsPasswordAuthText] = useState<string>();
  const isConfirmId = useSelector((state: RootState) => state.confirmId);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const passwordRef = useRef() as any;
  const nameRef = useRef() as any;

  const onNameHandler = (e: any) => {
    setName(e.currentTarget.value);
  };

  const registerRequest = () => {
    dispatch(register(Name, Password));
  };

  const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,20}$/;
  //아이디 양식
  const idCheckRegex = /^[가-힣a-zA-Z0-9]{2,10}$/g;

  //특수문자 체크
  const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  //공백체크 표현식
  const spaceCheck = /\s/g;

  const onPasswordHandler = (e: any) => {
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

  const onCheckPasswordHandler = (e: any) => {
    setCheckPassword(e.currentTarget.value);
  };

  //회원가입 버튼
  const onSubmitRegister = () => {
    if (Name === '') {
      alert(' 2~10자 영문,한글,숫자만 사용 가능합니다.');
      nameRef.current.focus();
      return;
    }
    if (spaceCheck.test(Name)) {
      return;
    }
    if (special_pattern.test(Name)) {
      return;
    }
    if (!idCheckRegex.test(Name)) {
      return;
    }
    if (isConfirmId.confirmId === false) {
      alert('사용중인 아이디입니다.');
      nameRef.current.focus();
      return;
    }
    //비밀번호 양식 체크
    if (!passwordRegex.test(Password)) {
      alert('비밀번호가 양식에 맞지않아요.');
      passwordRef.current.focus();
      return;
    }

    if (Password === CheckPassword) {
      registerRequest();
      alert('회원가입 완료');
      navigate('/');
    } else {
      alert('비밀번호를 확인해주세요.');
    }
  };

  //아이디 중복확인 액션
  const confirmIdRequest = () => {
    console.log(isConfirmId);
    dispatch(confirm_id_request(Name));
  };
  // 아이디 확인 함수
  useEffect(() => {
    if (isConfirmId.confirmId === null) {
      setIsId(() => false);
    }
    if (isConfirmId.confirmId === true) {
      setIsId(() => true);
    } else {
      setIsId(() => false);
    }
  }, [Name, isConfirmId]);

  // 패스워드 확인 함수
  useEffect(() => {
    if (Password === '' || CheckPassword === '') {
      setIsPasswordAuthText('');
      setIsCheckPassword(false);
      return;
    } else if (Password === CheckPassword) {
      setIsPasswordAuthText('패스워드가 일치합니다.');
      setIsCheckPassword(true);
    } else {
      setIsPasswordAuthText('패스워드가 틀립니다.');
      setIsCheckPassword(false);
    }
  }, [CheckPassword, Password]);

  return (
    <>
      <BtnMenu BackHistory></BtnMenu>

      <InputDiv>
        {' '}
        <img src={배경}></img>
        <InputWrap
          isConfirm={isConfirmId.confirmId}
          pTop='368px'
        >
          <div className='inputTitle'>아이디</div>
          <BasicInputs
            width='15rem'
            OnChange={onNameHandler}
            OnBlur={confirmIdRequest}
            value={Name}
            color='#fff'
            ref={nameRef}
            maxLength={10}
            margin={'0 0 0 0'}
          ></BasicInputs>
          <p> {isConfirmId.text}</p>
        </InputWrap>
        <InputWrap
          pTop='390px'
          isPassword={isPassword}
        >
          <div className='inputTitle'>비밀번호</div>
          <BasicInputs
            width='15rem'
            ref={passwordRef}
            type='password'
            OnChange={onPasswordHandler}
            value={Password}
            margin={'0 0 0 0'}
          ></BasicInputs>
          {isPassword ? <p>{PasswordAuthText}</p> : <p>{PasswordAuthText}</p>}
        </InputWrap>
        <InputWrap
          pTop='515px'
          isPasswordCheck={isCheckPassword}
        >
          <div className='inputTitle'>비밀번호 확인</div>
          <BasicInputs
            width='15rem'
            type='password'
            OnChange={onCheckPasswordHandler}
            value={CheckPassword}
            margin={'0 0 0 0'}
          ></BasicInputs>
          {isCheckPassword ? <p>{isPasswordAuthText}</p> : <p>{isPasswordAuthText}</p>}
        </InputWrap>
        <BasicButtons
          // as='button'
          disabled={!(isId && isPassword && isCheckPassword)}
          ButtonText='회원가입'
          color='#fff'
          OnClick={onSubmitRegister}
        ></BasicButtons>
      </InputDiv>
    </>
  );
};

export default React.memo(Register);
