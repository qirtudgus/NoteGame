import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface, stat_request } from '../modules/login';
import { ButtonColor } from './BtnMenu';
import styled from 'styled-components';
import 플러스 from '../img/플러스.svg';
import 스킬아이콘배경 from '../img/스킬아이콘배경.jpg';
import { StatName } from './StatList';
import RevivalModal from './RevivalModal';

interface skillBoxInterface {
  title?: string;
  level?: number;
  desc?: string;
  skillUp?: () => void;
  icon?: string;
}

const StatBox = styled.div<skillBoxInterface>`
  width: auto;
  height: 100px;
  background: #fff;
  margin-bottom: 4px;
  display: flex;
  /* border: 1px solid#aaa; */
  justify-content: space-between;
  /* &:first-child {
    margin-top: 20px;
  } */
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
  font-size: 19px;
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
  cursor: pointer;
  padding: 0 5px;
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

const StatLevel = styled.div`
  width: 11%;
  padding: 0 5px;
  height: 100px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & p {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const StatWrap = styled.div`
  height: 480px;
  overflow-y: scroll;
  background: #333;
`;

const StatList = styled.li`
  display: flex;
  font-size: 1.5rem;
`;
const StatValue = styled.span`
  position: relative;
  width: 50%;
  height: 35px;
  padding: 5px 0 5px 10px;
  background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const TakePointWrap = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  left: 200px;
`;
const TakePoint = styled.div`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  background: #fff;
  color: #333;
  display: flex;
  margin-left: 10px;
  border-radius: 2px;
  &.active {
    font-weight: bold;
    background: #ffbc26;
  }
`;

const StatusPiece = (props: any) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const [takePoint, setTakePoint] = useState(1);
  const [statCheck, setStatCheck] = useState(false);
  const TakePointArr = [{ number: 1 }, { number: 10 }, { number: 100 }];
  const takeStats = (statName: string) => {
    if (userInfo.StatPoint < takePoint) {
      setStatCheck(true);
    } else {
      dispatch(stat_request(statName, userInfo.StatPoint, takePoint));
    }
  };

  const statArr = [
    {
      statName: 'UpMaxHp',
      title: '굳은살이 베겼다',
      desc: `1렙당 기본 체력이 100 상승합니다.`,

      level: userInfo.UpMaxHp,
    },
    {
      statName: 'UpBasicDamage',
      title: '쉬는시간엔 팔씨름',
      desc: `1렙당 기본 공격력이 50 상승합니다.`,
      level: userInfo.UpBasicDamage,
    },
    {
      statName: 'UpGoldPen',
      title: '황금 볼펜',
      desc: `1렙당 볼펜 굴리기로 획득하는 잉크가 1% 상승합니다.`,
      level: userInfo.UpGoldPen,
    },
    {
      statName: 'UpGoldHunt',
      title: '부지런한 학생',
      desc: `1렙당 던전에서 획득하는 잉크가 1% 상승합니다.`,
      level: userInfo.UpGoldHunt,
    },
    {
      statName: 'BetterPen',
      title: '펜은 칼보다 강하다',
      desc: `1렙당 던전에서 공격력이 2% 상승합니다.`,
      level: userInfo.BetterPen,
    },
  ];
  return (
    <>
      {statCheck ? (
        <RevivalModal
          close
          OnClick={() => {
            setStatCheck(false);
          }}
        >
          <h1>스텟포인트가 부족해요!</h1>
        </RevivalModal>
      ) : null}
      <StatList>
        <StatName>스텟 포인트</StatName>
        <StatValue>
          {userInfo.StatPoint}
          <TakePointWrap>
            {TakePointArr.map((i, index) => {
              return (
                <TakePoint
                  className={i.number === takePoint ? 'active' : undefined}
                  onClick={() => {
                    setTakePoint(i.number);
                  }}
                >
                  +{i.number}
                </TakePoint>
              );
            })}
          </TakePointWrap>
        </StatValue>
      </StatList>
      <StatWrap>
        {statArr.map((i: any, index: number) => {
          return (
            <StatBox
              as='div'
              key={index}
            >
              <StatIcon>
                <img
                  src={스킬아이콘배경}
                  alt='스킬아이콘'
                ></img>
              </StatIcon>
              <StatTextWrap>
                <StatTitle>{i.title}</StatTitle>
                <StatDesc>{i.desc}</StatDesc>
              </StatTextWrap>
              <StatLevel>
                <p>{i.level}</p>스텟레벨
              </StatLevel>
              <StatBtn
                onClick={() => {
                  takeStats(i.statName);
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
