import React, { useMemo } from 'react';
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
import { LoginUserInfoInterface, revival_request } from '../modules/login';
import RevivalModal from '../components/RevivalModal';
import BasicButtons from '../components/BasicBtn';
import BasicBtn from '../components/BasicBtn';
const BottomBox = styled.div`
  width: 100%;
  height: 240px;
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

const FloorInputModal = styled.input`
  width: 200px;
  height: 50px;
`;

const Dungeon = () => {
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const isModal = useSelector((state: RootState) => state.modalState.isModal);
  const [floorInputModal, setFloorInputModal] = useState(false);
  const [notFloor, setNotFloor] = useState(false);
  const [notFloorText, setNotFloorText] = useState('');
  const [floorInput, setFloorInput] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let giveSkillPoint = 50;
  //환생 후 받을 스킬포인트
  let addSkillPoint = Math.floor((userInfo.DungeonFloor as number) / giveSkillPoint) * userInfo.UpRevivalStatPoint;
  //환생 후 돌아갈 층
  let revivalFloor = Math.ceil(((userInfo.DungeonFloor as number) * (userInfo.RevivalPoint as number)) / 100);

  const beforeFloorInput = () => {
    setFloorInputModal(true);
  };
  const FloorInputSubmit = () => {
    dispatch(create_monster_request(floorInput));
    navigate('/dungeonfightbefore', { state: floorInput });
  };

  const floorInputHandler = (e: any): number | void => {
    let onlyNumber: number = e.currentTarget.value.replace(/[^0-9]/g, '');
    if (onlyNumber <= 0) {
      setNotFloorText('1층부터 도전할 수 있어요!');
      setNotFloor(true);
      setFloorInput(1);
      return;
    }
    if (onlyNumber > userInfo.MaxDungeonFloor - 1) {
      setNotFloor(true);
      setNotFloorText('최고층 이상은 도전할 수 없어요!');
      setFloorInput(userInfo.MaxDungeonFloor - 1);
      return;
    }
    setFloorInput(onlyNumber);
  };

  const closeFloorInputModal = () => {
    setFloorInput(1);
    setNotFloor(false);
    setFloorInputModal(false);
  };

  return (
    <>
      <BtnMenu
        BackHistory
        Revival
        RevivalDispatch={() => dispatch(modal_success())}
      ></BtnMenu>

      <FloorBox></FloorBox>

      {floorInputModal && (
        <RevivalModal
          close
          OnClick={closeFloorInputModal}
        >
          <p>도전할 층을 입력해주세요!</p>
          <p>자신의 최고층전까지 도전가능합니다.</p>
          <p>이동 가능한 층 : {userInfo.MaxDungeonFloor - 1}</p>
          {notFloor && <p>{notFloorText}</p>}
          <FloorInputModal
            value={floorInput}
            onChange={floorInputHandler}
          ></FloorInputModal>
          <BasicBtn
            ButtonText='이동하기'
            OnClick={FloorInputSubmit}
          ></BasicBtn>
        </RevivalModal>
      )}

      <MoveBoxWrap>
        <MoveBox onClick={beforeFloorInput}>
          <img
            src={arrowLeft}
            alt='arrow'
          ></img>
          이전 층으로
        </MoveBox>
        <MoveBox2
          onClick={() => {
            dispatch(create_monster_request(userInfo.DungeonFloor));
            navigate('/dungeonfight');
          }}
        >
          도전
          <img
            src={arrowRight}
            alt='arrow'
          ></img>
        </MoveBox2>
      </MoveBoxWrap>
      <CharacterBox></CharacterBox>
      <BottomBox></BottomBox>
      {isModal && (
        <RevivalModal close>
          스텟 포인트 {addSkillPoint} 획득
          <br />
          던전 {revivalFloor} 층에서 시작
          <p>환생하시겠습니까?</p>
          <BasicButtons
            margin='5px 5px 5px 5px'
            ButtonText='예'
            OnClick={() => dispatch(revival_request())}
          ></BasicButtons>
          <BasicButtons
            margin='5px 5px 5px 5px'
            ButtonText='아니요'
            OnClick={() => dispatch(modal_failure())}
          ></BasicButtons>
        </RevivalModal>
      )}
    </>
  );
};

export default React.memo(Dungeon);
