import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import BtnMenu from '../components/BtnMenu';
import CharacterBox from '../components/CharacterBox';
import ShopPaperList from '../components/shopPaperList';
import ShopPiece from '../components/ShopPiece';
import 형광펜 from '../img/형광펜.png';
const ShopWrap = styled.div`
  width: 90%;
  margin-top: 50px;
  height: 540px;
  display: flex;
`;

const Character = styled.div`
  width: 30%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Shops = styled.div`
  width: 70%;
  height: 100%;
  box-shadow: 0px 0px 7px 6px rgb(0 0 0 / 20%);
  overflow: hidden;
  /* background: #aaa; */
`;

const HighLightAni = keyframes`
from{transform:scaleX(1); transform-origin:100% 0 0;}
to{transform:scaleX(0); transform-origin:100% 0 0;}
`;

const TabWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const Tab = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
  align-items: center;
  background: #fff;
  margin-right: 5px;
  height: 60px;
  &:last-child {
    margin-right: 0px;
  }
  &:hover {
    font-weight: bold;
    background: #fff;
  }
  &.active {
    background: #fff;
    font-weight: bold;
  }
  &.active > div {
  }
  & > img {
    display: none;
  }
  &.active > div > div {
    display: block;
    animation: ${HighLightAni} 0.55s cubic-bezier(0, 0, 0.2, 1);
    animation-fill-mode: forwards;
  }
`;

const HighLight = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  & p {
    z-index: 50;
  }
  & > div {
    width: 200px;
    height: 50px;
    background: #fff;
    position: absolute;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > img {
    position: absolute;
    width: 130px;
  }
`;

const TabContent = styled.div`
  height: 100%;
`;

const Shop = () => {
  const [tabNum, SetTabNum] = useState(0);

  const menuArr = [
    {
      name: '볼펜',
      content: <ShopPiece></ShopPiece>,
    },
    {
      name: '종이',
      content: <ShopPaperList></ShopPaperList>,
    },
    // { name: '스킬', content: <ShopPiece></ShopPiece> },
  ];

  const SetTabNumberFunc = (index: number): void => {
    SetTabNum(index);
  };

  return (
    <ShopWrap>
      <Character>
        <CharacterBox></CharacterBox>
      </Character>
      <Shops>
        <TabWrap>
          {menuArr.map((i: any, index: number) => {
            return (
              <Tab
                key={index}
                className={tabNum === index ? 'active' : ''}
                onClick={() => SetTabNumberFunc(index)}
              >
                <HighLight>
                  <p> {i.name}</p>
                  <div></div>
                  <img src={형광펜}></img>
                </HighLight>
              </Tab>
            );
          })}
        </TabWrap>
        <TabContent>{menuArr[tabNum].content}</TabContent>
      </Shops>
      <BtnMenu BackHistory></BtnMenu>
    </ShopWrap>
  );
};

export default React.memo(Shop);
