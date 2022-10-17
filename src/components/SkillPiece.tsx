import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface, skill_request } from '../modules/login';
import { ButtonColor } from './BtnMenu';
import styled from 'styled-components';
import 플러스 from '../img/플러스.svg';
import 스킬아이콘배경 from '../img/스킬아이콘배경.jpg';
import skill_moreFloor from '../img/skill/skill_moreFloor.png';
import skill_moreRevivalPoint from '../img/skill/skill_moreRevivalPoint.png';
import skill_Revival from '../img/skill/skill_Revival.png';
import skill_multiple from '../img/skill/skill_multiple.png';
import skill_doubleAttack from '../img/skill/skill_doubleAttack.png';
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
  position: relative;
  /* border: 1px solid#aaa; */
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
  padding: 10px 0 5px 0;
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
  word-break: keep-all;
`;

const SkillNeedLevel = styled.p<skillBoxInterface>`
  font-size: 15px;
  position: absolute;
  bottom: 5px;
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
      img: (
        <img
          src={skill_moreFloor}
          alt='계단은 올라갈 때 두칸씩'
        ></img>
      ),
    },
    {
      skillName: 'UpRevivalStatPoint',
      title: '내려갈때도 두칸씩',
      desc: `1렙당 환생 시 주어지는 스텟포인트가 스킬레벨만큼 \n 증가합니다.`,
      level: userInfo.UpRevivalStatPoint,
      requestLevel: 1,
      maxLevel: 30,
      img: (
        <img
          src={skill_moreRevivalPoint}
          alt='내려갈때도 두칸씩'
        ></img>
      ),
    },
    {
      skillName: 'RevivalPoint',
      title: '다음생에는..',
      desc: `1렙당 환생 시 돌아가는 층이 1% 증가합니다.(현재 ${userInfo.BasicRevivalPoint + userInfo.RevivalPoint}%)`,
      level: userInfo.RevivalPoint,
      requestLevel: 1,
      maxLevel: 30,
      img: (
        <img
          src={skill_Revival}
          alt='다음생에는..'
        ></img>
      ),
    },
    {
      skillName: 'UpDoubleAttack',
      title: '더블어택',
      desc: `한 턴에 한하여 2배의 데미지를 입힙니다.`,
      level: userInfo.UpDoubleAttack,
      requestLevel: 5,
      maxLevel: 1,
      img: (
        <img
          src={skill_doubleAttack}
          alt='더블어택'
        ></img>
      ),
    },
    {
      skillName: 'UpMulilpleReward',
      title: '곱하기 출현',
      desc: `볼펜 굴리기에서 일정확률로 1.5배 리워드가 등장합니다.`,
      level: userInfo.UpMulilpleReward,
      requestLevel: 10,
      maxLevel: 1,
      img: (
        <img
          src={skill_multiple}
          alt='곱하기 출현'
        ></img>
      ),
    },
  ];

  function skillUp(skillName: string, maxLevel: number, requestLevel: number) {
    console.log(skillName);
    console.log(userInfo[skillName]);
    if (userInfo[skillName] >= maxLevel) {
      setSkillText('이미 마스터한 스킬이에요.');
      dispatch(modal_success());
      return;
    }
    if (userInfo.Level < requestLevel) {
      setSkillText('요구 레벨이 부족해요.');
      dispatch(modal_success());
      return;
    }
    if (userInfo.SkillPoint === 0) {
      setSkillText('스킬포인트가 부족해요.');
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
          <h1>{skillText}</h1>
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
              <SkillIcon>{i.img}</SkillIcon>
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
              <SkillIcon>{i.img}</SkillIcon>
              <SkillTextWrap>
                <SkillTitle>{i.title}</SkillTitle>

                <SkillDesc>{i.desc}</SkillDesc>
                <SkillNeedLevel>요구 레벨 {i.requestLevel}</SkillNeedLevel>
              </SkillTextWrap>
              <SkillLevel>
                <p>
                  {i.level} / {i.maxLevel}
                </p>
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
