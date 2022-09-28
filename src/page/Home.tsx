import BtnMenu from '../components/BtnMenu';
import FooterMenu from '../components/FooterMenu';
import React, { useEffect, useState } from 'react';
import CharacterBox from '../components/CharacterBox';
import styled, { keyframes } from 'styled-components';
import createRandomNum from '../util/createRandomNum';
import RevivalModal from '../components/RevivalModal';
import BasicBtn from '../components/BasicBtn';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { ishelpmodal_confirm } from '../modules/login';
import { useDispatch } from 'react-redux';
import 물음표 from '../img/물음표_원형.svg';
const MessageBox = styled.div`
  width: auto;
  position: relative;
  top: 20px;
  padding: 20px 0 20px 20px;
  background: #fff;
  box-shadow: 0px 7px 12px 3px rgb(0 0 0 / 30%);
  border-radius: 10px;
  font-size: 1.2rem;
  &:after {
    border-top: 10px solid #fff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: relative;
    top: 53px;
    left: -78px;
  }
`;

const CallCharacterMsg = styled.div`
  cursor: pointer;
`;

const msgArr = [
  '안녕하세요....',
  '요즘은 너무 피곤해...',
  '너 오늘 문방구 다녀왔어?',
  '키...키사마!!',
  '이러다 내 옆구리가 찢어지겠어!!',
  '이러다 내 옆구리가 눅눅해지겠어....',
  '더 이쁜 볼펜은 없어?',
  '잉크가 다 떨어져가는거같아',
  '잉크가 부족하면 볼펜 굴리기를 하는게 어때?',
  '당신이...나의 주인..?',
  '난 연필이 좋더라',
];

const helpHighLight = keyframes`
  from{background:none; box-shadow:none}
  50%{background:#fff;   box-shadow: 0px 0px 12px -1px #ffffff;}
  to{background:none;box-shadow:none}
`;

const Help = styled.div`
  z-index: 1000;
  position: absolute;
  right: -223px;
  top: -191px;
  margin-left: 0.6rem;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 40px;
  }
  animation: ${helpHighLight} 0.7s infinite;
`;

const Home = () => {
  const [msgRandomNumber, setMsgRandomNumber] = useState(0);
  const [firstLoginModal, setFirstLoginModal] = useState(false);
  const IsHelpModal = useSelector((state: RootState) => state.login.userInfo?.IsHelpModal);
  const dispatch = useDispatch();
  const msgRandomReturn = () => {
    setMsgRandomNumber(createRandomNum(0, msgArr.length - 1));
  };

  useEffect(() => {
    setInterval(() => msgRandomReturn(), 5000);
  }, []);

  useEffect(() => {
    if (IsHelpModal === 0) {
      setFirstLoginModal(true);
    } else {
      setFirstLoginModal(false);
    }
  }, [IsHelpModal]);

  return (
    <>
      {firstLoginModal && (
        <RevivalModal
          close
          OnClick={() => setFirstLoginModal(false)}
        >
          <Help>
            <img src={물음표}></img>
          </Help>
          처음이라면 팝업을 닫은 후 오른쪽상단의 <br></br>도움말을 읽어보시면 좋아요!
          <BasicBtn
            ButtonText={'팝업은 그만 볼래요..'}
            OnClick={() => dispatch(ishelpmodal_confirm())}
          ></BasicBtn>
        </RevivalModal>
      )}
      <BtnMenu LogOut></BtnMenu>
      <MessageBox>{msgArr[msgRandomNumber]}</MessageBox>
      <CallCharacterMsg onClick={msgRandomReturn}>
        <CharacterBox normally={true}></CharacterBox>
      </CallCharacterMsg>
      <FooterMenu></FooterMenu>
    </>
  );
};

export default React.memo(Home);
