import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface } from '../modules/login';
import styled, { css } from 'styled-components';
import SkillPiece from '../components/SkillPiece';
import BtnMenu from '../components/BtnMenu';

const SkillPageWrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;

  overflow-y: scroll;
  background: #999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

interface TabColor {
  active?: number;
}

const SkillTap = styled.div<TabColor>`
  display: flex;
  cursor: pointer;
  border-radius: 20px 20px 0 0;
  font-size: 1.7rem;
  box-shadow: 5px 1px 3px rgba(0, 0, 0, 0.3);
  justify-content: center;
  z-index: 3;
  align-items: center;
  width: 33.3%;
  height: 100%;
  background: #eee;
  ${(props) =>
    props.active === 1 &&
    css`
      z-index: 3;
      font-weight: bold;
      background: #ffbc26;
    `}
`;
const SkillTap2 = styled.div<TabColor>`
  display: flex;
  cursor: pointer;

  border-radius: 20px 20px 0 0;
  font-size: 1.7rem;
  box-shadow: 5px 1px 3px rgba(0, 0, 0, 0.3);
  justify-content: center;

  align-items: center;
  width: 33.3%;
  height: 100%;
  background: #eee;
  ${(props) =>
    props.active === 2 &&
    css`
      z-index: 2;
      font-weight: bold;
      background: #ffbc26;
    `}
`;
const SkillTap3 = styled.div<TabColor>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  height: 100%;
  background: #eee;
  ${(props) =>
    props.active === 3 &&
    css`
      background: #e5005a;
    `}
`;

const SkillTabWrap = styled.div`
  display: flex;
  width: 100%;
  height: 90px;
`;

const SkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 600px;
`;

const Skill = () => {
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const [isSkillTab, setIsSkillTab] = useState({
    passive: 'passive1',
    TabNum: 1,
  });
  return (
    <>
      <BtnMenu BackHistory></BtnMenu>
      <SkillWrap>
        <SkillTabWrap>
          <SkillTap
            active={isSkillTab.TabNum}
            onClick={() => {
              setIsSkillTab({ passive: 'passive1', TabNum: 1 });
            }}
          >
            패시브
          </SkillTap>
          <SkillTap2
            active={isSkillTab.TabNum}
            onClick={() => {
              setIsSkillTab({ passive: 'passive2', TabNum: 2 });
            }}
          >
            액티브
          </SkillTap2>

          <p>스킬 포인트 {userInfo.SkillPoint}</p>
        </SkillTabWrap>
        <SkillPageWrap>
          {
            {
              passive1: (
                <>
                  <SkillPiece
                    skillName='UpGoldPen'
                    title='황금 볼펜'
                    desc={`볼펜 굴리기로 획득하는 골드가 ${userInfo.UpGoldPen * 1}%
                    상승합니다.`}
                    level={userInfo.UpGoldPen}
                  ></SkillPiece>
                  <SkillPiece
                    skillName='UpGoldHunt'
                    title='부지런한 학생'
                    desc={`던전에서 획득하는 골드가 ${userInfo.UpGoldHunt * 1}%
            상승합니다.`}
                    level={userInfo.UpGoldHunt}
                  ></SkillPiece>
                  <SkillPiece
                    skillName='BetterPen'
                    title='펜은 칼보다 강하다.'
                    desc={`던전에서 공격력이 ${userInfo.BetterPen * 2}% 상승합니다.`}
                    level={userInfo.BetterPen}
                  ></SkillPiece>
                  <SkillPiece
                    skillName='UpMaxHp'
                    title='굳은살이 베겼다.'
                    desc={`기본 체력이 ${userInfo.UpMaxHp * 100} 상승합니다.`}
                    level={userInfo.UpMaxHp}
                  ></SkillPiece>
                  <SkillPiece
                    skillName='UpBasicDamage'
                    title='쉬는시간에 팔씨름'
                    desc={`기본 공격력이 ${userInfo.UpBasicDamage * 50} 상승합니다.`}
                    level={userInfo.UpBasicDamage}
                  ></SkillPiece>
                </>
              ),
              passive2: (
                <>
                  <SkillPiece title='준비중'></SkillPiece>
                  <SkillPiece></SkillPiece>
                  <SkillPiece></SkillPiece>
                </>
              ),
              passive3: (
                <>
                  <SkillPiece title='준비중'></SkillPiece>
                  <SkillPiece></SkillPiece>
                  <SkillPiece></SkillPiece>
                </>
              ),
            }[isSkillTab.passive]
          }
        </SkillPageWrap>
      </SkillWrap>
    </>
  );
};

export default React.memo(Skill);
