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
import 물음표박스 from '../img/물음표박스.svg';

import customAxios from '../util/axios';
import createRandomNum from '../util/createRandomNum';
import { confirm_nickname_request } from '../modules/confirmNickname';

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
  /* & img {
    z-index: -1;
    position: absolute;
    width: 500px;
    top: 100px;
    left: 265px;
  } */
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

  &.authNumberInput {
    height: 3.5rem;
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

const EmailUseConfirm = styled.div`
  height: 24px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  & img {
    width: 24px;
  }
`;

const EmailUseQuestionMark = styled.div`
  &:hover {
    filter: invert(40%);
  }
`;

interface EmailHoverTextBoolean {
  display: boolean;
}
const EmailHoverText = styled.div<EmailHoverTextBoolean>`
  position: absolute;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 16px -4px rgb(0 0 0 / 30%);
  width: 300px;
  left: 540px;
  top: 625px;
  z-index: 5;
  display: none;
  ${(props) =>
    props.display &&
    css`
      display: block;
    `}
`;

const Register = () => {
  const [Name, setName] = useState<string>('');
  const [Nickname, SetNickname] = useState<string>('');
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
  const [emailAuthText, setEmailAuthText] = useState(false);
  const [emailAuthChecked, setEmailAuthChecked] = useState(false);
  const isConfirmId = useSelector((state: RootState) => state.confirmId);
  const isConfirmNickname = useSelector((state: RootState) => state.confirmNicknameRequest);

  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const passwordRef = useRef() as any;
  const nameRef = useRef() as any;
  const nicknameRef = useRef() as any;

  const onNameHandler = (e: any) => {
    setName(e.currentTarget.value);
  };

  const onNicknameHandler = (e: any) => {
    SetNickname(e.currentTarget.value);
  };

  const onEamilAuthHandler = (e: any) => {
    setEmailAuthPassword(e.currentTarget.value);
  };

  const onCheckHandler = () => {
    setEmailAuthChecked(!emailAuthChecked);
  };

  const registerRequest = () => {
    dispatch(register(Name, Password, Nickname));
  };

  const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,20}$/;
  //아이디 양식
  const idCheckRegex = /^[a-zA-Z0-9]{2,10}$/g;

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
      alert(' 2~10자 영문,숫자만 사용 가능합니다.');
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
    if (isConfirmNickname.confirmNickname === false) {
      alert('사용중인 닉네임입니다.');
      nicknameRef.current.focus();
      return;
    }
    //비밀번호 양식 체크
    if (!passwordRegex.test(Password)) {
      alert('비밀번호가 양식에 맞지않아요.');
      passwordRef.current.focus();
      return;
    }
    if (emailAuthChecked === false) {
      alert('이메일 이용약관을 동의해주세요!');
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

  //닉네임 중복확인 액션
  const confirmNicknameRequest = () => {
    dispatch(confirm_nickname_request(Nickname));
  };

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

        {/* 닉네임 */}
        <InputWrap
          isConfirm={isConfirmNickname.confirmNickname}
          pTop='368px'
        >
          <div className='inputTitle'>닉네임</div>
          <BasicInputs
            width='12rem'
            OnChange={onNicknameHandler}
            OnBlur={confirmNicknameRequest}
            value={Nickname}
            color='#fff'
            ref={nicknameRef}
            maxLength={10}
            margin={'0 0 0 0'}
          ></BasicInputs>
          <p> {isConfirmNickname.text}</p>
        </InputWrap>
        {/* 닉네임 */}

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
                let authPasswordValue = arr.join('');
                console.log(authPasswordValue);
                setAuthPassword(authPasswordValue);
                setIsSendEmail(false);
                let userEmail = `${email}@${emailInputValue}`;
                console.log(userEmail);
                customAxios('post', '/mail/mailauth', { userEmail, authPasswordValue }).then((res) => {
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
          className='authNumberInput'
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

        <EmailUseConfirm>
          <input
            type='checkbox'
            checked={emailAuthChecked}
            onChange={onCheckHandler}
          ></input>
          <span>이메일 사용 동의</span>
          <EmailUseQuestionMark
            onMouseOver={() => setEmailAuthText(true)}
            onMouseOut={() => setEmailAuthText(false)}
          >
            <img
              src={물음표박스}
              alt={'questionMark'}
            ></img>
          </EmailUseQuestionMark>
          <EmailHoverText display={emailAuthText}>
            입력하신 이메일 정보는
            <br />
            가입 인증을 위한 목적으로만 사용되며,
            <br />
            해당 정보는 즉시 파기됩니다.
          </EmailHoverText>
        </EmailUseConfirm>
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
