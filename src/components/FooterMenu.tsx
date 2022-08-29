import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

const FooterWrap = styled.div`
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
`;

const FooterIcon = styled.div`
  width: 100px;
  height: 100px;
  background: #fff;
  margin: 0 25px 10px 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
`;

const FooterTitle = styled.div`
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  position: absolute;
  width: 120px;
  height: 40px;
  background: #333;
  color: #fff;
  border-radius: 20px;
  text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;
`;

const FooterMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <FooterWrap>
        <FooterIcon onClick={() => navigate('/status')}>
          <FooterTitle>내 상태</FooterTitle>
        </FooterIcon>
        <FooterIcon onClick={() => navigate('/ballpenshop')}>
          <FooterTitle>상점</FooterTitle>
        </FooterIcon>
        <FooterIcon onClick={() => navigate('/choicepencount')}>
          <FooterTitle>볼펜 굴리기</FooterTitle>
        </FooterIcon>
        <FooterIcon onClick={() => navigate('/dungeon')}>
          <FooterTitle>던전</FooterTitle>
        </FooterIcon>
        <FooterIcon onClick={() => navigate('/ranking')}>
          <FooterTitle>랭킹</FooterTitle>
        </FooterIcon>
      </FooterWrap>
    </>
  );
};

export default FooterMenu;
