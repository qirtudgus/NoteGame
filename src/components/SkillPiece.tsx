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

  &:first-child {
    margin-top: 20px;
  }
  &:last-child {
    margin-bottom: 20px;
  }
`;
const SkillTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  padding: 10px 0 10px 0;
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
  height: 480px;
  overflow-y: scroll;
  background: #eaeaea;
`;

const StatList = styled.li`
  display: flex;
  font-size: 1.5rem;
`;

const SkillPiece = (props: any) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const skillArr = [
    {
      skillName: 'UpMoreFloor',
      title: '계단은 올라갈 때 두칸씩',
      desc: `던전 클리어 시 올라가는 층이 ${userInfo.UpMoreFloor} 상승합니다.`,
      level: userInfo.UpMoreFloor,
    },
    {
      skillName: 'UpRevivalStatPoint',
      title: '내려갈때도 두칸씩',
      desc: `환생 시 획득하는 능력치가 ${userInfo.UpRevivalStatPoint}배 상승합니다.`,
      level: userInfo.UpRevivalStatPoint,
    },
    {
      skillName: 'UpDoubleAttack',
      title: '더블어택',
      desc: `한 턴에 한하여 2배의 데미지를 입힙니다.`,
      level: userInfo.UpDoubleAttack,
    },
  ];
  return (
    <>
      {' '}
      <StatList>
        <StatName>스킬 포인트</StatName>
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
                  if (userInfo.SkillPoint <= 0) return;
                  else if (userInfo.UpDoubleAttack >= 1) {
                    alert('이미 마스터한 스킬입니다.');
                    return;
                  } else {
                    dispatch(skill_request(`${i.skillName}`, userInfo.SkillPoint));
                  }
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

export default React.memo(SkillPiece);
