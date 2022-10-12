import styled, { keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import { modal_failure } from '../modules/modalState';
import 엑스 from '../img/엑스.svg';
import { ReactNode, useState } from 'react';
import 형광펜 from '../img/형광펜.png';
import 도움말_게임소개 from '../img/도움말_게임소개.jpg';
import 도움말_자주묻는질문 from '../img/도움말_자주묻는질문.jpg';
import 도움말_던전 from '../img/도움말_던전.jpg';
import 도움말_볼펜굴리기 from '../img/도움말_볼펜굴리기.jpg';

const BgWrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000 !important;
  background: rgba(0, 0, 0, 0.2);
  left: 0;
  top: 0;
`;

const Bg = styled.div`
  border-radius: 20px;
  z-index: 100000 !important;
  width: 900px;
  height: 600px;
  background: ${(props) => props.color || '#eee'};
  margin: 50px auto;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  user-select: none;

  & h1 {
    font-size: 2rem;
    height: 10%;
  }
`;

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  & img {
    width: 35px;
  }
`;

const HighLightAni = keyframes`
from{transform:scaleX(1); transform-origin:100% 0 0;}
to{transform:scaleX(0); transform-origin:100% 0 0;}
`;

const HelpWrap = styled.div`
  width: 95%;
  height: 82%;
  display: flex;
`;

const HelpList = styled.div`
  width: 150px;
  height: 100%;
`;

const HelpContentWrap = styled.div`
  width: 705px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const HelpContent = styled.div`
  width: 97%;
  height: 95%;
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  overflow-y: scroll;
`;

const HelpTab = styled.div`
  cursor: pointer;
  width: 150px;
  height: 55px;
  font-size: 1.4rem;
  display: flex;
  justify-content: left;
  align-items: center;
  & p {
    position: absolute;
    z-index: 10;
    margin-left: 20px;
  }

  & div {
    position: absolute;
    width: 150px;
    height: 65px;
    background: #eee;
  }

  & img {
    width: 100%;
  }

  &.active {
    font-weight: bold;
  }

  &.active div {
    animation: ${HighLightAni} 0.55s cubic-bezier(0, 0, 0.2, 1);
    animation-fill-mode: forwards;
  }

  &:hover {
    font-weight: bold;
  }
`;

interface RevivalModalInterface {
  close?: boolean;
  OnClick?: () => void;
  children?: ReactNode;
}

const HelpModal = ({ close, OnClick, children }: RevivalModalInterface) => {
  const [tabNum, SetTabNum] = useState(0);
  const dispatch = useDispatch();
  function closeModal() {
    dispatch(modal_failure());
  }

  const menuArr = [
    {
      name: '게임 진행',
      content: (
        <img
          src={도움말_게임소개}
          alt='게임소개'
        ></img>
      ),
    },
    {
      name: '자주 묻는 질문',
      content: (
        <img
          src={도움말_자주묻는질문}
          alt='자주 묻는 질문'
        ></img>
      ),
    },
    {
      name: '볼펜 굴리기',
      content: (
        <img
          src={도움말_볼펜굴리기}
          alt='볼펜 굴리기'
        ></img>
      ),
    },
    {
      name: '던전',
      content: (
        <img
          src={도움말_던전}
          alt='던전'
        ></img>
      ),
    },
  ];

  return (
    <BgWrap>
      <Bg>
        {close && (
          <Close onClick={OnClick || closeModal}>
            <img
              src={엑스}
              alt='닫기'
            />
          </Close>
        )}
        <h1>도움말</h1>
        <HelpWrap>
          <HelpList>
            {menuArr.map((i: any, index: number) => {
              return (
                <HelpTab
                  key={index}
                  className={tabNum === index ? 'active' : ''}
                  onClick={() => SetTabNum(index)}
                >
                  <p> {i.name}</p>
                  <div></div>
                  <img
                    src={형광펜}
                    alt='형광펜'
                  ></img>
                </HelpTab>
              );
            })}
          </HelpList>
          <HelpContentWrap>
            <HelpContent>{menuArr[tabNum].content}</HelpContent>
          </HelpContentWrap>
        </HelpWrap>
      </Bg>
    </BgWrap>
  );
};

export default HelpModal;
