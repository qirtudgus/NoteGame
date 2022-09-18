import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import 랭킹 from '../img/랭킹.svg';
import 던전 from '../img/던전.svg';
import 볼펜굴리기 from '../img/볼펜굴리기.svg';
import 상점 from '../img/상점.svg';
import 내상태 from '../img/내상태.svg';

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
  margin: 0 25px 10px 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
  &:hover > div {
    outline: 3px solid#ffbc26;
    background-color: #fff;
    color: #000;
  }
`;

const FooterTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  position: absolute;
  width: 120px;
  height: 40px;
  background: #333;
  color: #fff;
  border-radius: 20px;
  /* text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000; */
`;

const FooterMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <FooterWrap>
        <FooterIcon onClick={() => navigate('/status')}>
          <img
            src={내상태}
            alt='내 상태'
          ></img>

          <FooterTitle>내 상태</FooterTitle>
        </FooterIcon>
        <FooterIcon onClick={() => navigate('/ballpenshop')}>
          <img
            src={상점}
            alt='상점'
          ></img>

          <FooterTitle>상점</FooterTitle>
        </FooterIcon>
        <FooterIcon onClick={() => navigate('/playpengame')}>
          <img
            src={볼펜굴리기}
            alt='볼펜 굴리기'
          ></img>
          <FooterTitle>볼펜 굴리기</FooterTitle>
        </FooterIcon>
        <FooterIcon onClick={() => navigate('/dungeon')}>
          <img
            src={던전}
            alt='던전'
          ></img>
          <FooterTitle>던전</FooterTitle>
        </FooterIcon>
        <FooterIcon onClick={() => navigate('/ranking')}>
          <img
            src={랭킹}
            alt='랭킹'
          ></img>
          <FooterTitle>랭킹</FooterTitle>
        </FooterIcon>
      </FooterWrap>
    </>
  );
};

export default FooterMenu;
