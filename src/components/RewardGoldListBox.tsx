import React, { useMemo } from 'react';
import styled from 'styled-components';
import { createRandomRewardsArray } from '../util/createRandomRewardsArray';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface } from '../modules/login';
import BasicBtn from './BasicBtn';
import { useNavigate } from 'react-router-dom';
const Wrap = styled.div`
  position: relative;
  width: auto;
  padding: 2rem;
  height: auto;
  background: #414141;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Reward = styled.div`
  width: 90px;
  height: 160px;
  background: #fff;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  flex-direction: column;

  & > p {
    margin-bottom: 10px;
    font-size: 1.2rem;
    letter-spacing: -1px;
  }
  & > p:first-child {
    margin-top: 20px;
  }
  border-left: 1px solid#555555;
  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-right: 1px solid#555555;
    border-radius: 0 10px 10px 0;
  }

  & .action {
    font-family: 'Damage' !important;
    font-size: 2rem;
  }
`;

const ErrorPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const RewardGoldListBox = (props: any) => {
  const boxCount = useSelector((state: RootState) => state.boxCount.boxCount);
  const { Level, UpMulilpleReward } = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  //useMemo를 사용하여 해결!!!!!!
  const randomRewardArray = useMemo(() => {
    return createRandomRewardsArray(boxCount, 'penGame', UpMulilpleReward);
  }, [props.refresh, boxCount]);
  const navigate = useNavigate();

  return (
    <>
      <Wrap>
        {boxCount === 0 ? (
          <ErrorPage>
            <div>뒤로 돌아가 다시 박스 갯수를 정해주세요!</div>
            <BasicBtn
              OnClick={() => navigate(-1)}
              ButtonText='뒤로가기'
            ></BasicBtn>
          </ErrorPage>
        ) : (
          <>
            {randomRewardArray.map((i: any, index: any) =>
              i.action === 'multiple' ? (
                <Reward
                  key={index}
                  data-action={i.action}
                  data-number={i.number}
                  data-actionname={i.back}
                >
                  <p className='action'> {i.back}</p>
                  <p>{i.number}</p>
                </Reward>
              ) : (
                <Reward
                  key={index}
                  data-action={i.action}
                  data-actionname={i.back}
                  data-number={i.number * Level * props.penSpeed}
                >
                  <p className='action'> {i.back}</p>
                  <p>{(i.number * Level * props.penSpeed).toLocaleString()}</p>
                </Reward>
              ),
            )}
          </>
        )}
      </Wrap>
    </>
  );
};

export default React.memo(RewardGoldListBox);
