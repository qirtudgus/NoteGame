import styled from 'styled-components';
import BackHistoryBtn from '../components/BackHistoryBtn';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { pengame_boxcount_success } from '../modules/pengameBoxCount';
import { useState } from 'react';
import BtnMenu from '../components/BtnMenu';
const PenCountWrap = styled.div`
  width: 473px;
  height: 293px;
  margin: auto;
  background: #fff;
`;
const PenCountTitle = styled.p`
  font-size: 30px;
  text-align: center;
  top: 80px;
  position: relative;
`;

const PenCountBox = styled.ul`
  display: flex;
  justify-content: space-evenly;
  bottom: -160px;
  position: relative;
`;

const PenCount = styled.li`
  font-size: 30px;
  text-align: center;
  line-height: 55px;
  font-weight: bold;
  width: 55px;
  height: 55px;
  background: #d9d9d9;
  cursor: pointer;
`;

const ChoicePenCount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [boxCount, setBoxCount] = useState<number>(0);

  const readyBoxCount = (boxCount: number): void => {
    dispatch(pengame_boxcount_success(boxCount));
    navigate('/playpengame');
  };

  const go = () => {
    if (boxCount > 10) {
      alert('10칸이 넘으면 안돼요!');
    } else {
      dispatch(pengame_boxcount_success(boxCount));
      navigate('/playpengame');
    }
  };

  const inputCheck = (e: any) => {
    setBoxCount(parseInt(e.target.value));
  };

  return (
    <>
          <BtnMenu BackHistory></BtnMenu>

      <PenCountWrap>
        <PenCountTitle>
          {' '}
          원하는 칸의 개수를 골라주세요!<br></br>1 ~ 10칸까지 가능합니다.
        </PenCountTitle>
        <PenCountBox>
          <PenCount onClick={() => readyBoxCount(3)}>3</PenCount>
          <PenCount onClick={() => readyBoxCount(5)}>5</PenCount>
          <PenCount onClick={() => readyBoxCount(7)}>7</PenCount>
          <PenCount onClick={() => readyBoxCount(10)}>10</PenCount>
          <input
            name='count'
            type='number'
            min='1'
            max='10'
            value={boxCount}
            placeholder='1 ~ 10칸까지 가능해요!'
            onChange={inputCheck}
          ></input>
          <button onClick={go}>Go</button>
        </PenCountBox>
      </PenCountWrap>
    </>
  );
};

export default ChoicePenCount;
