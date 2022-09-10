import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { createRandomRewardsArray } from '../util/createRandomRewardsArray';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface } from '../modules/login';
import BasicBtn from './BasicBtn';
import { useNavigate } from 'react-router-dom';
const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Reward = styled.div`
  width: 70px;
  height: 160px;
  background: #fff;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  & > p {
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
  const { Level } = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  //useMemo를 사용하여 해결!!!!!!
  const randomRewardArray = useMemo(() => {
    return createRandomRewardsArray(boxCount, 'penGame');
  }, [props.refresh, boxCount]);
  const navigate = useNavigate();
  console.log(randomRewardArray);

  console.log(props);
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
                >
                  <p> {i.front}</p>
                  <p>{i.number}</p>
                  <p> {i.back}</p>
                </Reward>
              ) : (
                <Reward
                  key={index}
                  data-action={i.action}
                  data-number={i.number * Level * props.penSpeed}
                >
                  <p> {i.front}</p>
                  <p>{i.number * Level * props.penSpeed}</p>
                  <p> {i.back}</p>
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
