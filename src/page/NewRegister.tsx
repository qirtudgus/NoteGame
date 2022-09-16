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
import sleep from '../util/sleep';
import { emailReg } from '../util/RegExps';

interface inputWrap {
  isConfirm?: boolean | undefined | null;
  isPassword?: boolean | undefined | null;
  isPasswordCheck?: boolean | undefined | null;
  inputDisabled?: boolean;
  isSendEmail?: boolean;
  isEmailAuth?: boolean;
}

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
  isReg?: boolean;
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

  ${(props) =>
    props.isReg === false &&
    css`
      color: red;
    `}
`;

const NewRegister = () => {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfrim, setPasswordConfirm] = useState('');

  //정규표현식 여부 값
  const [idReg, setIdReg] = useState(false);
  const [nicknameReg, setNicknameReg] = useState(false);
  const [passwordReg, setPasswordReg] = useState(false);

  //오류가 날 시 출력할 텍스트
  const [idRegText, setIdRegText] = useState('');
  const [nicknameRegText, setNicknameRegText] = useState('');
  const [passwordRegText, setPasswordRegText] = useState('');
  const [passwordConfrimRegText, setPasswordConfirmRegText] = useState('');

  const idRef = useRef() as MutableRefObject<HTMLInputElement>;
  const nicknameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordConfirmRef = useRef() as MutableRefObject<HTMLInputElement>;

  //비밀번호 양식
  const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,20}$/;
  //아이디 양식
  const idCheckRegex = /^[a-zA-Z0-9]{2,10}$/g;
  //특수문자 체크
  const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  //공백체크 표현식
  const spaceCheck = /\s/g;

  var regExp = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{2,10}$/;

  const inputHandler = (e: any, setState: any) => {
    const { value } = e.target;
    setState(value);
  };

  const idCheck = () => {
    if (!regExp.test(id)) {
      setIdReg(false);
      setIdRegText('2~10자의 영문,숫자만 사용가능합니다.');
      return;
    }
    setIdReg(true);
    setIdRegText('');
  };

  const passwordCheck = () => {
    if (!passwordRegex.test(password)) {
      setPasswordReg(false);
      setPasswordRegText('5~20자의 영문,숫자를 사용하세요.');
      return;
    }
    setPasswordReg(true);
    setPasswordRegText('');
  };

  return (
    <>
      <InputBox>
        <InputWrap>
          <InputTitle>아이디</InputTitle>
          <Input
            ref={idRef}
            value={id}
            onBlur={idCheck}
            onChange={(e) => inputHandler(e, setId)}
          ></Input>
        </InputWrap>
        <InputText isReg={idReg}>{idRegText}</InputText>
      </InputBox>
      <InputBox>
        <InputWrap>
          <InputTitle>닉네임</InputTitle>
          <Input
            ref={nicknameRef}
            value={nickname}
            onChange={(e) => inputHandler(e, setNickname)}
          ></Input>
        </InputWrap>
        <InputText>경고창이 뜨는 공간입니다.</InputText>
      </InputBox>
      <InputBox>
        <InputWrap>
          <InputTitle>비밀번호</InputTitle>
          <Input
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
            ref={passwordConfirmRef}
            value={passwordConfrim}
            onChange={(e) => inputHandler(e, setPasswordConfirm)}
          ></Input>
        </InputWrap>
        <InputText>경고창이 뜨는 공간입니다.</InputText>
      </InputBox>
      <BasicButtons ButtonText={'z'}></BasicButtons>
    </>
  );
};

export default React.memo(NewRegister);
