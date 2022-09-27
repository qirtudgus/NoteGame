import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import BtnMenu from '../components/BtnMenu';
import CharacterBox from '../components/CharacterBox';
import StatusPiece from '../components/StatusPiece';
import SkillPiece from '../components/SkillPiece';
import StatList from '../components/StatList';
import 형광펜 from '../img/형광펜.png';
const StatusWrap = styled.div`
  width: 90%;
  margin-top: 50px;
  height: 565px;
  display: flex;
`;

const Character = styled.div`
  width: 35%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Status = styled.div`
  width: 65%;
  height: 100%;
  box-shadow: 0px 0px 7px 6px rgb(0 0 0 / 20%);
  overflow: hidden;
  z-index: 10;
  /* background: #aaa; */
`;

const TabWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const HighLightAni = keyframes`
from{transform:scaleX(1); transform-origin:100% 0 0;}
to{transform:scaleX(0); transform-origin:100% 0 0;}
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
    width: 150px;
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
  /* padding: 20px 0 20px 0; */
`;

const MyStatus = () => {
  const [tabNum, SetTabNum] = useState(0);

  const menuArr = [
    {
      name: '기본정보',
      content: <StatList></StatList>,
    },
    {
      name: '스텟',
      content: <StatusPiece></StatusPiece>,
    },
    { name: '스킬', content: <SkillPiece></SkillPiece> },
  ];

  const SetTabNumberFunc = (index: number): void => {
    SetTabNum(index);
  };

  return (
    <StatusWrap>
      <Character>
        <CharacterBox></CharacterBox>
      </Character>
      <Status>
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
      </Status>
      <BtnMenu BackHistory></BtnMenu>
    </StatusWrap>
  );
};

export default React.memo(MyStatus);
