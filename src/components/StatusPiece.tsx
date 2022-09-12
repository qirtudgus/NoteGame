import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface, skill_request, stat_request } from '../modules/login';
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

const StatBox = styled(ButtonColor)<skillBoxInterface>`
  width: 100%;
  height: 100px;
  background: #fff;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;

  &:first-child {
    margin-top: 20px;
  }
  &:last-child {
    margin-bottom: 20px;
  }
`;
const StatTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  padding: 10px 0 10px 0;
  width: 400px;
`;
const StatTitle = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const StatDesc = styled.p`
  font-size: 16px;
`;
const StatIcon = styled.div`
  width: 100px;
  height: 100px;
  background: #fff;
`;

const StatBtn = styled(ButtonColor)`
  width: 10%;
  height: 100px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 30px;
  }
  &:hover {
    filter: invert(80%);
  }
`;

const StatWrap = styled.div`
  height: 480px;
  overflow-y: scroll;
  background: #eaeaea;
`;

const StatList = styled.li`
  display: flex;
  font-size: 1.5rem;
`;

const StatusPiece = (props: any) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const statArr = [
    {
      statName: 'UpMaxHp',
      title: '굳은살이 베겼다',
      desc: `기본 체력이 ${userInfo.UpMaxHp * 100} 상승합니다.`,
      level: userInfo.UpMaxHp,
    },
    {
      statName: 'UpBasicDamage',
      title: '쉬는시간엔 팔씨름',
      desc: `기본 공격력이 ${userInfo.UpBasicDamage * 50} 상승합니다.`,
      level: userInfo.UpBasicDamage,
    },
    {
      statName: 'UpGoldPen',
      title: '황금 볼펜',
      desc: `볼펜 굴리기로 획득하는 골드가 ${userInfo.UpGoldPen * 1}% 상승합니다.`,
      level: userInfo.UpGoldPen,
    },
    {
      statName: 'UpGoldHunt',
      title: '부지런한 학생',
      desc: `던전에서 획득하는 골드가 ${userInfo.UpGoldHunt * 1}% 상승합니다.`,
      level: userInfo.UpGoldHunt,
    },
    {
      statName: 'BetterPen',
      title: '펜은 칼보다 강하다',
      desc: `던전에서 공격력이 ${userInfo.BetterPen * 2}% 상승합니다.`,
      level: userInfo.BetterPen,
    },
  ];

  return (
    <>
      <StatList>
        <StatName>스텟 포인트</StatName>
        <StatValue>{userInfo.StatPoint}</StatValue>
      </StatList>
      <StatWrap>
        {statArr.map((i: any, index: number) => {
          return (
            <StatBox
              as='div'
              key={index}
            >
              <StatIcon></StatIcon>
              <StatTextWrap>
                <StatTitle>
                  {i.title} Lv . {i.level}
                </StatTitle>
                <StatDesc>{i.desc}</StatDesc>
              </StatTextWrap>
              <StatBtn
                onClick={() => {
                  if (userInfo.StatPoint <= 0) return;
                  dispatch(stat_request(`${i.statName}`, userInfo.StatPoint));
                }}
              >
                <img
                  src={플러스}
                  alt='스텟 업그레이드'
                ></img>
              </StatBtn>
            </StatBox>
          );
        })}
      </StatWrap>
    </>
  );
};

export default React.memo(StatusPiece);
