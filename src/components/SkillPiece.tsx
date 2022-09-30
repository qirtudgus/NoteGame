import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface, skill_request } from '../modules/login';
import { ButtonColor } from './BtnMenu';
import styled from 'styled-components';
import 플러스 from '../img/플러스.svg';
import 스킬아이콘배경 from '../img/스킬아이콘배경.jpg';
import { StatName, StatValue } from './StatList';
import { modal_success } from '../modules/modalState';
import RevivalModal from './RevivalModal';

interface skillBoxInterface {
  title?: string;
  level?: number;
  desc?: string;
  icon?: string;
  descColor?: string;
}

const SkillBox = styled.div<skillBoxInterface>`
  width: auto;
  height: 100px;
  background: #fff;
  margin-bottom: 4px;
  display: flex;
  border: 1px solid#aaa;
  justify-content: space-between;
  /* &:first-child {
    margin-top: 20px;
  } */
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
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const SkillDesc = styled.p<skillBoxInterface>`
  font-size: 16px;
  color: ${(props) => props.descColor};
`;

const SkillNeedLevel = styled.p<skillBoxInterface>`
  font-size: 16px;
  position: relative;
  top: 20px;
  color: ${(props) => props.descColor};
`;

const SkillIcon = styled.div`
  width: 100px;
  height: 100px;
  background: #fff;
`;

const SkillBtn = styled(ButtonColor)`
  cursor: pointer;
  width: 10%;
  height: 100px;
  padding: 0 5px;
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

const SkillLevel = styled.div`
  width: 15%;
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

const SkillWrap = styled.div`
  height: 480px;
  overflow-y: scroll;
  background: #333;
`;

const StatList = styled.li`
  display: flex;
  font-size: 1.5rem;
`;

const SkillPiece = (props: any) => {
  const dispatch = useDispatch();
  const [skillText, setSkillText] = useState('요구 레벨이 부족합니다.');
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const isModal = useSelector((state: RootState) => state.modalState.isModal);
  const skillArr = [
    {
      skillName: 'UpMoreFloor',
      title: '계단은 올라갈 때 두칸씩',
      desc: `1렙당 던전을 깰 시 올라가는 층이 1씩 상승합니다.`,
      level: userInfo.UpMoreFloor,
      requestLevel: 1,
      maxLevel: 30,
    },
    {
      skillName: 'UpRevivalStatPoint',
      title: '내려갈때도 두칸씩',
      desc: `1렙당 환생 시 획득하는 능력치가 배로 상승합니다.`,
      level: userInfo.UpRevivalStatPoint,
      requestLevel: 1,
      maxLevel: 30,
    },
    {
      skillName: 'RevivalPoint',
      title: '다음생에는..',
      desc: `환생 시 현재 층의 ${userInfo.RevivalPoint}%로 돌아갑니다.`,
      level: userInfo.RevivalPoint,
      requestLevel: 1,
      maxLevel: 30,
    },
    {
      skillName: 'UpDoubleAttack',
      title: '더블어택',
      desc: `한 턴에 한하여 2배의 데미지를 입힙니다.`,
      level: userInfo.UpDoubleAttack,
      requestLevel: 5,
      maxLevel: 1,
    },
  ];

  function skillUp(skillName: string, maxLevel: number, requestLevel: number) {
    console.log(skillName);
    console.log(userInfo[skillName]);
    if (userInfo[skillName] >= maxLevel) {
      setSkillText('이미 마스터한 스킬입니다.');
      dispatch(modal_success());
      return;
    }
    if (userInfo.Level < requestLevel) {
      setSkillText('요구 레벨이 부족합니다.');
      dispatch(modal_success());
      return;
    }
    if (userInfo.SkillPoint === 0) {
      setSkillText('스킬포인트가 부족합니다.');
      dispatch(modal_success());
      return;
    } else {
      dispatch(skill_request(`${skillName}`, userInfo.SkillPoint));
    }
  }

  return (
    <>
      {isModal && (
        <RevivalModal close>
          <p>{skillText}</p>
        </RevivalModal>
      )}
      <StatList>
        <StatName>스킬 포인트</StatName>
        <StatValue>{userInfo.SkillPoint}</StatValue>
      </StatList>
      <SkillWrap>
        {skillArr.map((i: any, index: number) => {
          return i.requestLevel > userInfo.Level ? (
            <SkillBox
              as='div'
              key={index}
              className='requestLevel'
            >
              <SkillIcon>
                <img
                  src={스킬아이콘배경}
                  alt='스킬아이콘'
                ></img>
              </SkillIcon>
              <SkillTextWrap>
                <SkillTitle>{i.title}</SkillTitle>

                <SkillDesc>{i.desc}</SkillDesc>
                <SkillNeedLevel descColor='#f01616'>요구 레벨 {i.requestLevel}</SkillNeedLevel>
              </SkillTextWrap>
              <SkillLevel>
                <p>{i.level}</p> 스킬레벨
              </SkillLevel>
              <SkillBtn onClick={() => skillUp(i.skillName, i.maxLevel, i.requestLevel)}>
                <img
                  src={플러스}
                  alt='스킬 업그레이드'
                ></img>
              </SkillBtn>
            </SkillBox>
          ) : (
            <SkillBox
              as='div'
              key={index}
            >
              <SkillIcon>
                {' '}
                <img
                  src={스킬아이콘배경}
                  alt='스킬아이콘'
                ></img>
              </SkillIcon>
              <SkillTextWrap>
                <SkillTitle>{i.title}</SkillTitle>

                <SkillDesc>{i.desc}</SkillDesc>
                <SkillNeedLevel>요구 레벨 {i.requestLevel}</SkillNeedLevel>
              </SkillTextWrap>
              <SkillLevel>
                <p>
                  {i.level} / {i.maxLevel}
                </p>{' '}
                스킬레벨
              </SkillLevel>
              <SkillBtn onClick={() => skillUp(i.skillName, i.maxLevel, i.requestLevel)}>
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
