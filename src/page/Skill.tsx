import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/modules_index';
import BackHistoryBtn from '../components/BackHistoryBtn';
import { skill_request } from '../modules/login';
import styled from 'styled-components';

const SkillPageWrap = styled.div`
width:100%;
height:100%;
background:#e5005a;
`

const SkillTap = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:33.3%;
height:100%;
background:#eee;
`

const SkillTabWrap = styled.div`
display:flex;
width:100%;
height:90px;
background:#555;
`

const SkillWrap = styled.div`
display:flex;
flex-direction: column;
width:700px;
height:600px;
background:#333;
`




const Skill = () => {
  const userInfo = useSelector((state: RootState) => state.login.userInfo);
  const dispatch = useDispatch();
  const [isSkillTab, setIsSkillTab] = useState('passive')

  return (
    <>
      <BackHistoryBtn corner></BackHistoryBtn>
      <SkillWrap>
        <SkillTabWrap>
          <SkillTap>패시브</SkillTap>
          <SkillTap>액티브</SkillTap>
          <SkillTap>케케브</SkillTap>
          <p>스킬 포인트 {userInfo?.SkillPoint}</p>

        </SkillTabWrap>
        <SkillPageWrap>{{
          passive:
          <>
      <div>
        <p>황금 볼펜</p>
        <p>Lv {userInfo?.UpGoldPen}</p>
        볼펜 굴리기로 획득하는 골드가 {userInfo?.UpGoldPen! * 1}% 상승합니다.
        <button
          onClick={(e) => {
            if(userInfo?.SkillPoint! <= 0) return
            dispatch(skill_request('UpGoldPen', userInfo?.SkillPoint!));
          }}
        >
          레벨업
        </button>
      </div>
      <div>
        <p>부지런한 학생</p>
        <p>Lv {userInfo?.UpGoldHunt}</p>
        던전에서 획득하는 골드가 {userInfo?.UpGoldHunt! * 1}% 상승합니다.
      </div>
      <button
        onClick={(e) => {
          if(userInfo?.SkillPoint! <= 0) return
          dispatch(skill_request('UpGoldHunt', userInfo?.SkillPoint!));
        }}
      >
        레벨업
      </button>
      <div>
        <p>펜은 칼보다 강하다.</p>
        <p>Lv {userInfo?.BetterPen}</p>
        던전에서 공격력이  {userInfo?.BetterPen! * 2}% 상승합니다.
      </div>
      <button
        onClick={(e) => {
          if(userInfo?.SkillPoint! <= 0) return
          dispatch(skill_request('BetterPen', userInfo?.SkillPoint!));
        }}
      >
        레벨업
      </button>
      </>
      }[isSkillTab]}

      </SkillPageWrap>
      </SkillWrap>
    </>
    
  );
};

export default React.memo(Skill);
