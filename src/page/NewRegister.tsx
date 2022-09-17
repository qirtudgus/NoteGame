import React, { MutableRefObject, useRef } from 'react';
import BasicButtons from '../components/BasicBtn';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../modules/register';
import { confirm_id_request } from '../modules/confirmId';
import { RootState } from '../modules/modules_index';
import { useNavigate } from 'react-router-dom';
import BtnMenu from '../components/BtnMenu';
import styled, { css } from 'styled-components';

import { confirm_nickname_request } from '../modules/confirmNickname';
import RevivalModal from '../components/RevivalModal';
import { modal_failure } from '../modules/modalState';

const InputBox = styled.div`
  width: 420px;
  height: 5rem;
  display: flex;
  flex-direction: column;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
`;

const InputTitle = styled.p`
  width: 100px;
  font-size: 1.2rem;
`;

interface InputRegExpCheck {
  isReg?: boolean | null;
}

const Input = styled.input<InputRegExpCheck>`
  width: 230px;
  height: 35px;
  font-size: 1.2rem;
  border-radius: 5px;
  outline: none;
  border: 1px solid#aaa;
  padding: 5px;

  &:focus {
    border: 1px solid#ffbc26;
    outline: 1px solid #ffbc26;
  }
`;

const InputText = styled.p<InputRegExpCheck>`
  margin: 7px 0 0 100px;
  color: red;
  ${(props) =>
    props.isReg &&
    css`
      color: green;
    `}
`;

const Submit = styled.button`
  width: 200px;
  height: 50px;
  font-size: 1.5rem;
  background-color: #ffbc26;
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0);
  transition: all 0.3s;
  &:hover {
    background-color: #fff;
    border: 2px solid #ffbc26;
  }
`;

const NewRegister = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();

  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  //정규표현식 여부 값
  const isConfirmId = useSelector((state: RootState) => state.confirmId);
  const isConfirmNickname = useSelector((state: RootState) => state.confirmNicknameRequest);
  const [passwordReg, setPasswordReg] = useState(false);
  const [passwordConfirmReg, setPasswordConfirmReg] = useState(false);

  //오류가 날 시 출력할 텍스트 (아이디와 닉네임은 redux에서 참조함)
  const [passwordRegText, setPasswordRegText] = useState('');
  const [passwordConfrimRegText, setPasswordConfirmRegText] = useState('');

  //회원가입 완료 시 모달 여부
  const isModal = useSelector((state: RootState) => state.modalState.isModal);

  const idRef = useRef() as MutableRefObject<HTMLInputElement>;
  const nicknameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordConfirmRef = useRef() as MutableRefObject<HTMLInputElement>;

  //비밀번호 양식
  const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,20}$/;

  //공백체크 표현식
  const spaceCheck = /\s/;

  const inputHandler = (e: any, setState: any) => {
    const { value } = e.currentTarget;
    setState(value);
  };

  const passwordCheck = () => {
    if (spaceCheck.test(password)) {
      setPasswordReg(false);
      setPasswordRegText('5~20자의 영문,숫자,특수문자만 사용하세요.');
      return;
    }
    if (!passwordRegex.test(password)) {
      setPasswordReg(false);
      setPasswordRegText('5~20자의 영문,숫자,특수문자만 사용하세요.');
      return;
    }
    setPasswordReg(true);
    setPasswordRegText('사용가능한 비밀번호입니다.');
  };

  //아이디 중복확인 액션
  const confirmIdRequest = () => {
    dispatch(confirm_id_request(id));
  };
  //닉네임 중복확인 액션
  const confirmNicknameRequest = () => {
    dispatch(confirm_nickname_request(nickname));
  };

  const registerRequest = () => {
    if (isConfirmId.confirmId === false) {
      alert('아이디를 확인해주세요.');
      idRef.current.focus();
      return;
    }
    if (isConfirmNickname.confirmNickname === false) {
      alert('닉네임을 확인해주세요.');
      nicknameRef.current.focus();
      return;
    }
    if (passwordReg === false) {
      alert('비밀번호를 확인해주세요.');
      passwordRef.current.focus();
      return;
    }
    if (passwordConfirmReg === false) {
      alert('비밀번호를 확인해주세요.');
      passwordConfirmRef.current.focus();
      return;
    }
    dispatch(register(id, password, nickname));
  };

  const goToLogin = () => {
    naviagate('/');
    dispatch(modal_failure());
  };

  useEffect(() => {
    if (password === '' && passwordConfirm === '') {
      setPasswordConfirmRegText('');
      setPasswordConfirmReg(false);
      return;
    }
    if (passwordConfirm.length < 5) {
      setPasswordConfirmRegText('');
      setPasswordConfirmReg(false);
      return;
    }
    if (passwordReg === false && passwordConfirm === password) {
      setPasswordConfirmRegText('비밀번호를 확인해주세요.');
      setPasswordConfirmReg(false);
      return;
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmRegText('비밀번호를 확인해주세요.');
      setPasswordConfirmReg(false);
      return;
    }
    if (password === passwordConfirm) {
      setPasswordConfirmRegText('비밀번호가 일치합니다.');
      setPasswordConfirmReg(true);
      return;
    }
  }, [password, passwordConfirm]);

  return (
    <>
      {isModal ? (
        <RevivalModal>
          <p>회원가입 완료</p>
          <p>이제 게임을 즐기러가볼까요?</p>
          <BasicButtons
            ButtonText='로그인'
            OnClick={goToLogin}
          ></BasicButtons>
        </RevivalModal>
      ) : null}
      <InputBox>
        <InputWrap>
          <InputTitle>아이디</InputTitle>
          <Input
            ref={idRef}
            value={id}
            onBlur={confirmIdRequest}
            onChange={(e) => inputHandler(e, setId)}
          ></Input>
        </InputWrap>
        <InputText isReg={isConfirmId.confirmId}>{isConfirmId.text}</InputText>
      </InputBox>
      <InputBox>
        <InputWrap>
          <InputTitle>닉네임</InputTitle>
          <Input
            ref={nicknameRef}
            value={nickname}
            onBlur={confirmNicknameRequest}
            onChange={(e) => inputHandler(e, setNickname)}
          ></Input>
        </InputWrap>
        <InputText isReg={isConfirmNickname.confirmNickname}>{isConfirmNickname.text}</InputText>
      </InputBox>
      <InputBox>
        <InputWrap>
          <InputTitle>비밀번호</InputTitle>
          <Input
            type={'password'}
            ref={passwordRef}
            value={password}
            onBlur={passwordCheck}
            onChange={(e) => inputHandler(e, setPassword)}
          ></Input>
        </InputWrap>
        <InputText isReg={passwordReg}>{passwordRegText}</InputText>
      </InputBox>
      <InputBox>
        <InputWrap>
          <InputTitle>비밀번호 확인</InputTitle>
          <Input
            // onBlur={passwordConfirmCheck}
            type={'password'}
            ref={passwordConfirmRef}
            value={passwordConfirm}
            onChange={(e) => inputHandler(e, setPasswordConfirm)}
          ></Input>
        </InputWrap>
        <InputText isReg={passwordConfirmReg}>{passwordConfrimRegText}</InputText>
      </InputBox>
      <Submit onClick={registerRequest}>회원가입</Submit>
      <BtnMenu BackHistory></BtnMenu>
    </>
  );
};

export default React.memo(NewRegister);
