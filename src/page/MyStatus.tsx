import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import BtnMenu from '../components/BtnMenu';
import CharacterBox from '../components/CharacterBox';
import StatusPiece from '../components/StatusPiece';
import SkillPiece from '../components/SkillPiece';
import StatList from '../components/StatList';
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
  /* background: #aaa; */
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
  background: #aaaaaa;
  margin-right: 5px;
  height: 60px;
  &:last-child {
    margin-right: 0px;
  }
  &:hover {
    background: #8d8d8d;
  }
  &.active {
    background: #fcbb26;
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
                {i.name}
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
