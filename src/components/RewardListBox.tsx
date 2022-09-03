import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { penObj } from '../util/shopList';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface } from '../modules/login';
import styled, { css } from 'styled-components';
import { createPenRewardArray } from '../util/createRandomRewardsArray';
import { choiceRewordEffect, highRewordEffect } from '../styledComponents/DungeonFight_Effect';
import 칼 from '../img/칼.svg';
import { userDamage } from '../util/createDamage';
import { ButtonColor } from './BtnMenu';
interface reward {
  highReward?: boolean;
}

const Wrap = styled(ButtonColor)`
  position: absolute;
  z-index: 1;
  bottom: 30px;
  display: flex;
  width: auto;
  padding: 10px 20px 10px 20px;
  height: 175px;
  background: #eee;
  align-items: center;
  border-radius: 10px;
`;

const Reward = styled.div<reward>`
  font-size: 1.5rem;
  width: 70px;
  height: 160px;
  background: #fff;
  border-left: 1px solid#555555;
  position: relative;
  font-family: 'Damage' !important;
  justify-content: center;
  align-items: center;
  display: flex;
  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-right: 1px solid#555555;
    border-radius: 0 10px 10px 0;
  }

  ${(props) =>
    props.highReward &&
    css`
      //평소 높은 리워드에 표시할 스타일
      font-weight: bold;
      font-size: 1.5rem;
      background: linear-gradient(0deg, #ff2819, #ffcc32);
      background-size: 200% 200%;
      animation: ${highRewordEffect} 1.25s ease-in infinite;
    `}

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &.active::after {
    background: #fff;
    animation: ${choiceRewordEffect} 0.7s ease;
  }
`;

const DetailViewAttackNumber = styled.div`
  display: flex;
  color: #333;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  letter-spacing: 3px;
  position: absolute;
  top: 20px;
`;

const RewardListBox = (props: any) => {
  const { EquipBallpen, BasicDamage, WeaponDamage, BetterPen } = useSelector(
    (state: RootState) => state.login.userInfo,
  ) as LoginUserInfoInterface;
  const isVisible = useSelector((state: RootState) => state.visibleState.isVisible) as boolean;

  let penReward = penObj.find((i) => i.ballPenName === EquipBallpen);

  //리워드리스트를 특정값마다 새로 생성해주어야한다. 의존성을 부모컴포넌트에서 상태값을 받아오자
  let penRewardArray = useMemo(() => {
    return createPenRewardArray(penReward?.rewardList!);
  }, [props.refresh]);

  //공격 리워드중 높은 값을 리턴하여 스타일드컴포넌트 조건부렌더링에 사용
  function highRewordNum2(): number | undefined {
    if (!penRewardArray) return;
    let result = Math.max(...penRewardArray);
    return result;
  }
  return (
    <>
      <Wrap as='div'>
        {penRewardArray?.map((i: any, index: number) => (
          <React.Fragment key={index}>
            {highRewordNum2() === i ? (
              <Reward
                highReward={true}
                data-attacknumber={i}
              >
                {isVisible ? (
                  <>
                    <DetailViewAttackNumber>
                      <img
                        src={칼}
                        alt='칼'
                      ></img>
                      x{Math.ceil(props.monsterHp / userDamage(i, BasicDamage, WeaponDamage, BetterPen))}
                    </DetailViewAttackNumber>
                  </>
                ) : null}
                {i}
              </Reward>
            ) : (
              <Reward data-attacknumber={i}>
                {isVisible ? (
                  <>
                    <DetailViewAttackNumber>
                      <img
                        src={칼}
                        alt='칼'
                      ></img>
                      x{Math.ceil(props.monsterHp / userDamage(i, BasicDamage, WeaponDamage, BetterPen))}
                    </DetailViewAttackNumber>
                  </>
                ) : null}
                {i}
              </Reward>
            )}
          </React.Fragment>
        ))}
      </Wrap>
    </>
  );
};
export default React.memo(RewardListBox);
