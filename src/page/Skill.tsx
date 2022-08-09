import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/modules_index';
import BackHistoryBtn from '../components/BackHistoryBtn';
import { skill_request } from '../modules/login';
const Skill = () => {
  const userInfo = useSelector((state: RootState) => state.login.userInfo);
  const dispatch = useDispatch();
  return (
    <>
      <BackHistoryBtn corner></BackHistoryBtn>
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
      
      <p>남은 스킬 포인트 {userInfo?.SkillPoint}</p>
    </>
  );
};

export default React.memo(Skill);
