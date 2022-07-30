import styled from 'styled-components';
import BackGround from '../components/BackGround';
import BackHistoryBtn from '../components/BackHistoryBtn';
import BasicBoxs from '../components/userInfo';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { pengame_boxcount_success } from '../modules/pengameBoxCount';
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

  const readyBoxCount = (boxCount: number): void => {
    dispatch(pengame_boxcount_success(boxCount));
    navigate('/playpengame');
  };

  return (
    <>
      <PenCountWrap>
        <PenCountTitle> 원하는 칸의 개수를 골라주세요!</PenCountTitle>
        <PenCountBox>
          <PenCount onClick={() => readyBoxCount(3)}>3</PenCount>
          <PenCount onClick={() => readyBoxCount(5)}>5</PenCount>
          <PenCount onClick={() => readyBoxCount(7)}>7</PenCount>
          <PenCount onClick={() => readyBoxCount(10)}>10</PenCount>
        </PenCountBox>
      </PenCountWrap>
      <BackHistoryBtn corner />
      <BasicBoxs></BasicBoxs>
    </>
  );
};

export default ChoicePenCount;
