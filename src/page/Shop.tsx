import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import BtnMenu from '../components/BtnMenu';
import CharacterBox from '../components/CharacterBox';
import NewShopPiece from '../components/NewShopPiece';
const ShopWrap = styled.div`
  width: 90%;
  margin-top: 50px;
  height: 570px;
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
  /* padding: 20px 0 20px 0; */
`;

const Shop = () => {
  const [tabNum, SetTabNum] = useState(0);

  const menuArr = [
    {
      name: '볼펜',
      content: <NewShopPiece></NewShopPiece>,
    },
    {
      name: '종이',
      content: <NewShopPiece></NewShopPiece>,
    },
    { name: '스킬', content: '스킬입니다.' },
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
