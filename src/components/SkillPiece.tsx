import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { skill_request } from '../modules/login';

import styled from 'styled-components';
import 플러스 from '../img/플러스.svg';

interface skillBoxInterface {
  title?: string;
  level?: number;
  desc?: string;
  skillUp?: () => void;
  icon?: string;
}

const SkillBox = styled.div<skillBoxInterface>`
  width: 600px;
  height: 100px;
  background: #e5005a;
  margin-bottom: 20px;
  display: flex;
  padding: 10px;
`;
const SkillTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 500px;
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

const SkillBtn = styled.div`
  width: 10%;
  height: 100%;
  border-radius: 10px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 30px;
  }
`;

const SkillPiece = (props: any) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login.userInfo);

  return (
    <>
      <SkillBox>
        <SkillIcon></SkillIcon>
        <SkillTextWrap>
          <SkillTitle>
            {props.title} Lv . {props.level}
          </SkillTitle>
          <SkillDesc>{props.desc}</SkillDesc>
        </SkillTextWrap>
        <SkillBtn
          onClick={() => {
            if (userInfo?.SkillPoint! <= 0) return;
            dispatch(
              skill_request(`${props.skillName}`, userInfo?.SkillPoint!),
            );
          }}
        >
          <img src={플러스} alt='스킬 업그레이드'></img>
        </SkillBtn>
      </SkillBox>
    </>
  );
};

export default React.memo(SkillPiece);