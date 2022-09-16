import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface } from '../modules/login';
import { expTable } from '../util/expTable';

const StatLists = styled.li`
  display: flex;
  font-size: 1.5rem;
  margin-bottom: 1px;
`;

export const StatName = styled.span`
  width: 50%;
  height: 35px;
  padding: 5px 0 5px 10px;
  background: #eee;
  /* border-bottom: 1px solid#000; */
  display: flex;
  align-items: center;
  font-weight: bold;
`;

export const StatValue = styled.span`
  width: 50%;
  height: 35px;
  padding: 5px 10px 5px 0;
  background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StatList = () => {
  const userInfo: LoginUserInfoInterface = useSelector(
    (state: RootState) => state.login.userInfo,
  ) as LoginUserInfoInterface;

  const statArr = [
    { statName: '닉네임', statValue: userInfo.Nickname },
    { statName: '레벨', statValue: userInfo.Level },
    {
      statName: '경험치',
      statValue: userInfo.Exp.toLocaleString() + ' / ' + expTable[userInfo.Level].toLocaleString(),
    },
    { statName: '체력', statValue: userInfo.BasicHp.toLocaleString() },
    { statName: '공격력', statValue: (userInfo.BasicHp + userInfo.WeaponDamage).toLocaleString() },
    { statName: '환생 포인트', statValue: userInfo.RevivalPoint },
    { statName: '보유 잉크', statValue: userInfo.Gold.toLocaleString() },
    { statName: '던전 최고 기록', statValue: userInfo.MaxDungeonFloor },
    { statName: '볼펜 굴린 횟수', statValue: userInfo.PenCount },
    { statName: '던전을 클리어한 횟수', statValue: userInfo.DungeonClearCount },
    { statName: '환생 횟수', statValue: userInfo.RevivalCount },
  ];

  return (
    <>
      {statArr.map((i: any, index: number) => {
        return (
          <StatLists key={index}>
            <StatName>{i.statName}</StatName>
            <StatValue>{i.statValue}</StatValue>
          </StatLists>
        );
      })}
    </>
  );
};

export default React.memo(StatList);
