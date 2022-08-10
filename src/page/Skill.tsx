import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/modules_index';
import BackHistoryBtn from '../components/BackHistoryBtn';
import { skill_request } from '../modules/login';
import styled from 'styled-components';
import SkillPiece from '../components/SkillPiece';

const SkillPageWrap = styled.div`
  width: 100%;
  height: 100%;
  background: #999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SkillTap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  height: 100%;
  background: #eee;
`;

const SkillTabWrap = styled.div`
  display: flex;
  width: 100%;
  height: 90px;
  background: #555;
`;

const SkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 600px;
  background: #333;
`;

const Skill = () => {
  const userInfo = useSelector((state: RootState) => state.login.userInfo);
  const dispatch = useDispatch();
  const [isSkillTab, setIsSkillTab] = useState('passive1');

  return (
    <>
      <BackHistoryBtn corner></BackHistoryBtn>
      <SkillWrap>
        <SkillTabWrap>
          <SkillTap
            onClick={() => {
              setIsSkillTab('passive1');
            }}
          >
            패시브
          </SkillTap>
          <SkillTap
            onClick={() => {
              setIsSkillTab('passive2');
            }}
          >
            액티브
          </SkillTap>
          <SkillTap
            onClick={() => {
              setIsSkillTab('passive3');
            }}
          >
            케케브
          </SkillTap>
          <p>스킬 포인트 {userInfo?.SkillPoint}</p>
        </SkillTabWrap>
        <SkillPageWrap>
          {
            {
              passive1: (
                <>
                  <SkillPiece
                    skillName='UpGoldPen'
                    title='황금 볼펜'
                    desc={`볼펜 굴리기로 획득하는 골드가 ${
                      userInfo?.UpGoldPen! * 1
                    }%
                    상승합니다.`}
                    level={userInfo?.UpGoldPen}
                  ></SkillPiece>
                  <SkillPiece
                    skillName='UpGoldHunt'
                    title='부지런한 학생'
                    desc={`던전에서 획득하는 골드가 ${
                      userInfo?.UpGoldHunt! * 1
                    }%
            상승합니다.`}
                    level={userInfo?.UpGoldHunt}
                  ></SkillPiece>
                  <SkillPiece
                    skillName='BetterPen'
                    title='펜은 칼보다 강하다.'
                    desc={`던전에서 공격력이 ${
                      userInfo?.BetterPen! * 2
                    }% 상승합니다.`}
                    level={userInfo?.BetterPen}
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
            }[isSkillTab]
          }
        </SkillPageWrap>
      </SkillWrap>
    </>
  );
};

export default React.memo(Skill);
