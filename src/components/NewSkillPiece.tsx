import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface, skill_request } from '../modules/login';
import { ButtonColor } from './BtnMenu';
import styled from 'styled-components';
import 플러스 from '../img/플러스.svg';
import { StatName, StatValue } from './StatList';

interface skillBoxInterface {
  title?: string;
  level?: number;
  desc?: string;
  skillUp?: () => void;
  icon?: string;
}

const SkillBox = styled(ButtonColor)<skillBoxInterface>`
  width: 100%;
  height: 100px;
  background: #fff;
  margin-bottom: 20px;
  display: flex;
  padding: 0px;
  &:first-child {
    margin-top: 20px;
  }
  &:last-child {
    margin-bottom: 0px;
  }
`;
const SkillTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  width: 400px;
`;
const SkillTitle = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const SkillDesc = styled.p`
  font-size: 16px;
`;
const SkillIcon = styled.div`
  width: 100px;
  height: 100px;
  background: #fff;
`;

const SkillBtn = styled(ButtonColor)`
  width: 10%;
  height: 100px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 30px;
  }
`;

const SkillWrap = styled.div`
  height: 420px;
  overflow-y: scroll;
`;

const StatList = styled.li`
  display: flex;
  font-size: 1.5rem;
`;

const NewSkillPiece = (props: any) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const skillArr = [
    {
      skillName: 'UpMaxHp',
      title: '굳은살이 베겼다',
      desc: `기본 체력이 ${userInfo.UpMaxHp * 100} 상승합니다.`,
      level: userInfo.UpMaxHp,
    },
    {
      skillName: 'UpBasicDamage',
      title: '쉬는시간엔 팔씨름',
      desc: `기본 공격력이 ${userInfo.UpBasicDamage * 50} 상승합니다.`,
      level: userInfo.UpBasicDamage,
    },
    {
      skillName: 'UpGoldPen',
      title: '황금 볼펜',
      desc: `볼펜 굴리기로 획득하는 골드가 ${userInfo.UpGoldPen * 1}% 상승합니다.`,
      level: userInfo.UpGoldPen,
    },
    {
      skillName: 'UpGoldHunt',
      title: '부지런한 학생',
      desc: `던전에서 획득하는 골드가 ${userInfo.UpGoldHunt * 1}% 상승합니다.`,
      level: userInfo.UpGoldHunt,
    },
    {
      skillName: 'BetterPen',
      title: '펜은 칼보다 강하다',
      desc: `던전에서 공격력이 ${userInfo.BetterPen * 2}% 상승합니다.`,
      level: userInfo.BetterPen,
    },
  ];
  return (
    <>
      {' '}
      <StatList>
        <StatName>스킬포인트</StatName>
        <StatValue>{userInfo.SkillPoint}</StatValue>
      </StatList>
      <SkillWrap>
        {skillArr.map((i: any, index: number) => {
          return (
            <SkillBox
              as='div'
              key={index}
            >
              <SkillIcon></SkillIcon>
              <SkillTextWrap>
                <SkillTitle>
                  {i.title} Lv . {i.level}
                </SkillTitle>
                <SkillDesc>{i.desc}</SkillDesc>
              </SkillTextWrap>
              <SkillBtn
                onClick={() => {
                  if (userInfo.SkillPoint! <= 0) return;
                  dispatch(skill_request(`${i.skillName}`, userInfo.SkillPoint!));
                }}
              >
                <img
                  src={플러스}
                  alt='스킬 업그레이드'
                ></img>
              </SkillBtn>
            </SkillBox>
          );
        })}
      </SkillWrap>
    </>
  );
};

export default React.memo(NewSkillPiece);
