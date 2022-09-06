import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import BtnMenu from '../components/BtnMenu';
import CharacterBox from '../components/CharacterBox';
import ShopPaperList from '../components/shopPaperList';
import ShopPiece from '../components/ShopPiece';
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

const TabWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const Tab = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
  align-items: center;
  background: #eee;
  height: 60px;
  &.active {
    background: #fcbb26;
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
    { name: '스킬', content: <ShopPiece></ShopPiece> },
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
                {i.name}
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
