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

import customAxios from '../util/axios';
import createRandomNum from '../util/createRandomNum';

interface inputWrap {
  isConfirm?: boolean | undefined | null;
  pTop?: string;
  isPassword?: boolean | undefined | null;
  isPasswordCheck?: boolean | undefined | null;
  inputDisabled?: boolean;
  isSendEmail?: boolean;
  isEmailAuth?: boolean;
}

const InputDiv = styled.div`
  margin-top: 100px;
  margin-left: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  height: 6.5rem;
  display: flex;
  flex-direction: column;
  & > p {
    position: relative;
    /* top: ${(props) => props.pTop}; */
    top: 5px;
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
    ${(props) =>
    props.isEmailAuth &&
    css`
      & > p {
        color: green;
      }
    `}
  & .inputTitle {
    font-size: 1.3rem;
    margin-bottom: 5px;
  }
  & input {
    background: #fff;
  }
  ${(props) =>
    props.inputDisabled &&
    css`
      & input {
        background: #a8a8a8;
      }
    `}
  ${(props) =>
    props.isSendEmail &&
    css`
      & > p {
        color: green;
      }
    `}

    & button {
    position: relative;
    width: 70px;
    height: 40px;
    margin-left: 10px;
    background: #555;
    border-radius: 5px;
  }

  & .mailInput {
    position: absolute;
    width: 8.5rem;
    height: 2rem;
    font-size: 1.3rem;
    left: 611px;
    z-index: 5;
    border: none;
    padding: 3px;
  }
  & .mailInputSelect {
    width: 10rem;
    height: 40px;
    border: 1px solid #999;
    border-radius: 5px;
    cursor: pointer;
  }
  & .mailInputSelect:focus-visible {
    outline: none;
  }
  & .mailInputSelect > option {
  }
`;

const InputButtonWrap = styled.div`
  display: flex;
  align-items: center;
`;

const EmailCenter = styled.div`
  font-size: 2rem;
  padding: 0 5px 0 5px;
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

  const [authPassword, setAuthPassword] = useState('');
  const [isEmailAuth, setIsEmailAuth] = useState(false);
  const [isEmailAuthText, setIsEmailAuthText] = useState('');
  const [isSendEmail, setIsSendEmail] = useState(true);
  const [emailAuthPassword, setEmailAuthPassword] = useState('');

  const [emailInputValue, setEmailInputValue] = useState('naver.com');

  const isConfirmId = useSelector((state: RootState) => state.confirmId);

  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const passwordRef = useRef() as any;
  const nameRef = useRef() as any;

  const onNameHandler = (e: any) => {
    setName(e.currentTarget.value);
  };
  const onEamilAuthHandler = (e: any) => {
    setEmailAuthPassword(e.currentTarget.value);
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
    } else if (spaceCheck.test(passwordCurrent)) {
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

  const onEmailHandler = (e: any) => {
    setEmail(e.currentTarget.value);
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
    if (isEmailAuth === false) {
      alert('이메일 인증을 완료해주세요 ');
      return;
    }
    if (!(Password === CheckPassword)) {
      alert('비밀번호가 동일한지 확인해주세요.');
      passwordRef.current.focus();
      setIsPasswordAuthText('패스워드를 확인해주세요.');
      setIsCheckPassword(false);

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
    if (isPassword === false) {
      setIsPasswordAuthText('');
      return;
    }
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

  //패스워드확인을 onBlur로 할까?
  // const checkPasswordFunc = () => {
  //   if (isPassword === false) {
  //     setIsPasswordAuthText('패스워드를 확인해주세요.');

  //     return;
  //   }
  //   if (Password === '' || CheckPassword === '') {
  //     setIsPasswordAuthText('');
  //     setIsCheckPassword(false);
  //     return;
  //   } else if (Password === CheckPassword) {
  //     setIsPasswordAuthText('패스워드가 일치합니다.');
  //     setIsCheckPassword(true);
  //   } else {
  //     setIsPasswordAuthText('패스워드를 확인해주세요.');
  //     setIsCheckPassword(false);
  //   }
  // };

  return (
    <>
      <BtnMenu BackHistory></BtnMenu>

      <InputDiv>
        <InputWrap
          isConfirm={isConfirmId.confirmId}
          pTop='368px'
        >
          <div className='inputTitle'>아이디</div>
          <BasicInputs
            width='12rem'
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
            width='12rem'
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
            width='12rem'
            type='password'
            OnChange={onCheckPasswordHandler}
            // OnBlur={checkPasswordFunc}
            value={CheckPassword}
            margin={'0 0 0 0'}
          ></BasicInputs>
          {isCheckPassword ? <p>{isPasswordAuthText}</p> : <p>{isPasswordAuthText}</p>}
        </InputWrap>
        <InputWrap
          pTop='515px'
          isPasswordCheck={isCheckPassword}
          isSendEmail={!isSendEmail}
        >
          <div className='inputTitle'>이메일</div>
          <InputButtonWrap>
            <BasicInputs
              width='12rem'
              OnChange={onEmailHandler}
              value={email}
              margin={'0 0 0 0'}
            ></BasicInputs>
            <EmailCenter>@</EmailCenter>
            <select
              className='mailInputSelect'
              name='pets'
              id='pet-select'
              onChange={(e) => {
                console.log(e.target.value);
                // direct일 경우 input의 비활성화를 풀고, 그외에는 setState해주기
                setEmailInputValue(e.target.value);
              }}
            >
              <option value='naver.com'>naver.com</option>
              <option value='gmail.com'>gmail.com</option>
              <option value='kakao.com'>kakao.com</option>
              <option value='hanmail.net'>hanmail.net</option>
              <option value='direct'>직접입력</option>
            </select>
            <input
              className='mailInput'
              type='text'
              value={emailInputValue}
              disabled={true}
            />
            <button
              onClick={async () => {
                //인증번호 생성
                let arr = [];
                for (let i = 0; i <= 5; i++) {
                  arr.push(createRandomNum(0, 9));
                }
                let b = arr.join('');
                console.log(b);
                setAuthPassword(b);
                setIsSendEmail(false);
                let userEmail = `${email}@${emailInputValue}`;
                console.log(userEmail);
                customAxios('post', '/mail/mailauth', { userEmail, authPassword }).then((res) => {
                  console.log(res.data);
                  console.log('전송');
                });
              }}
            >
              이메일 전송
            </button>
          </InputButtonWrap>
          {!isSendEmail && <p>이메일이 발송되었습니다.</p>}
        </InputWrap>
        <InputWrap
          isEmailAuth={isEmailAuth}
          pTop='515px'
          isPasswordCheck={isCheckPassword}
          inputDisabled={isSendEmail}
        >
          <InputButtonWrap>
            <BasicInputs
              disabled={isSendEmail}
              width='12rem'
              placeholder='인증번호 입력'
              OnChange={onEamilAuthHandler}
              value={emailAuthPassword}
              margin={'0 0 0 0'}
            ></BasicInputs>
            <button
              disabled={isSendEmail}
              onClick={() => {
                if (emailAuthPassword === authPassword) {
                  setIsEmailAuthText('이메일 인증 완료!');
                  setIsEmailAuth(true);
                } else {
                  setIsEmailAuthText('인증번호를 확인해주세요!');
                  setIsEmailAuth(false);
                }
              }}
            >
              인증번호 확인
            </button>
          </InputButtonWrap>
          {isEmailAuth ? <p>{isEmailAuthText}</p> : <p>{isEmailAuthText}</p>}
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
