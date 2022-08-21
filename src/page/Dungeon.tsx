import styled from 'styled-components';
import arrowRight from '../img/오른쪽화살표.svg';
import arrowLeft from '../img/왼쪽화살표.svg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { useNavigate } from 'react-router-dom';
import { create_monster_request } from '../modules/createMonster';
import CharacterBox from '../components/CharacterBox';
import FloorBox from '../components/FloorBox';
import { useState } from 'react';
import BtnMenu from '../components/BtnMenu';
import { modal_failure, modal_success } from '../modules/modalState';
import {revival_request,revival_success } from '../modules/login';
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
  const isModal = useSelector((state: RootState) => state.modalState.isModal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [before, setBefore] = useState(true);


  //환생 후 받을 스킬포인트
  let addSkillPoint = Math.floor( userInfo?.DungeonFloor as number / 50 );
  //환생 후 돌아갈 층
  let revivalFloor = Math.ceil(((userInfo?.DungeonFloor as number) * (userInfo?.RevivalPoint as number )  / 100));

  const revival = () => {

  }

  return (
    <>
      <FloorBox></FloorBox>

      <MoveBoxWrap>
        <MoveBox
          onClick={() => {
            dispatch(create_monster_request(userInfo?.DungeonFloor! - 1));
            navigate('/dungeonfightbefore', { state: before });
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
      <BottomBox>
        <div onClick={() => dispatch(modal_success())}>환생하기</div>
        {isModal && <>
        받을 스킬 포인트입니다.
        {addSkillPoint}<br/>
        환생 시 시작하는 층입니다.
        {revivalFloor}
        </>}
        {isModal && <div onClick={() =>{ dispatch(revival_request())}}>예</div>}
        {isModal && <div onClick={() => dispatch(modal_failure())}>아니요</div>}
      </BottomBox>
      <BtnMenu BackHistory></BtnMenu>
    </>
  );
};

export default Dungeon;
