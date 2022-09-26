import BtnMenu from '../components/BtnMenu';
import FooterMenu from '../components/FooterMenu';
import React, { useEffect, useState } from 'react';
import CharacterBox from '../components/CharacterBox';
import styled from 'styled-components';
import createRandomNum from '../util/createRandomNum';

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

const Home = () => {
  const [msgRandomNumber, setMsgRandomNumber] = useState(0);

  const msgRandomReturn = () => {
    setMsgRandomNumber(createRandomNum(0, msgArr.length - 1));
  };

  useEffect(() => {
    setInterval(() => msgRandomReturn(), 5000);
  }, []);

  return (
    <>
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
