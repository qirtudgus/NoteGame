import styled from 'styled-components';
import arrowRight from '../img/오른쪽화살표.svg';
import arrowLeft from '../img/왼쪽화살표.svg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { useNavigate } from 'react-router-dom';
import BackHistoryBtn from '../components/BackHistoryBtn';
import { create_monster_request } from '../modules/createMonster';
import CharacterBox from '../components/CharacterBox';
import { useEffect, useState } from 'react';
import FloorBox from '../components/FloorBox';
const BottomBox = styled.div`
  width: 100%;
  height: 300px;
  position: absolute;
  border-radius: 0 0 20px 20px;

  bottom: 0px;
  background: #928282;
`;

const MoveBox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 30px;
  font-size: 30px;
  & img {
    width: 50px;
  }
`;

const MoveBox2 = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 30px;
  font-size: 30px;
  & img {
    width: 50px;
  }
`;

const MoveBoxWrap = styled.div`
  width: 100%;
  display: flex;
`;

const Dungeon = () => {
  const userInfo = useSelector((state: RootState) => state.login.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <FloorBox></FloorBox>

      <MoveBoxWrap>
        <MoveBox
          onClick={() => {
            dispatch(create_monster_request(userInfo?.DungeonFloor! - 1));
            navigate('/dungeonfightbefore');
          }}
        >
          <img src={arrowLeft} alt='arrow'></img>이전 층으로
        </MoveBox>
        <MoveBox2
          onClick={() => {
            dispatch(create_monster_request(userInfo?.DungeonFloor));
            navigate('/dungeonfight');
          }}
        >
          도전<img src={arrowRight} alt='arrow'></img>
        </MoveBox2>
      </MoveBoxWrap>
      <CharacterBox></CharacterBox>
      <BottomBox></BottomBox>
      <BackHistoryBtn corner></BackHistoryBtn>
    </>
  );
};

export default Dungeon;
