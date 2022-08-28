import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
// import { expTable } from '../util/ExpTable';
import { expTable } from '../util/expTable';
import React from 'react';
import 위쪽화살표 from '../img/위쪽화살표.svg';
import { LoginUserInfoInterface } from '../modules/login';

const BasicBox = styled.div`
  width: auto;
  position: absolute;
  bottom: -1px;
  left: 5px;
  z-index: 10;
  font-size: 22px;
  font-weight: bold;
  line-height: 32px;
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
  background: #ffbc26;
  padding: 3px 10px 3px 20px;
  border-radius: 0 20px 20px 22px;
  &:hover {
    background: #b6861f;
  }
`;

const UserId = styled.p`
  font-size: 2rem;
`;
const UserLevel = styled.span`
  font-size: 1.2rem;
  padding: 5px;
  border-radius: 5px;
`;

const UserStat = styled.div`
  padding: 3px;
`;

const UserBtnCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 5px;
  border-radius: 100px;
  height: 35px;
  width: 35px;
  background: #fff;
  & > img {
    width: 40px;
  }
`;

const UserInfo = () => {
  const userId = useSelector((state: RootState) => state.login.id);
  const { Level, BasicHp, BasicDamage, WeaponDamage, Gold, Exp } = useSelector(
    (state: RootState) => state.login.userInfo,
  ) as LoginUserInfoInterface;

  return (
    <BasicBox>
      <UserStat>
        <p>체력 {BasicHp}</p>
        <p>공격력 {BasicDamage + WeaponDamage}</p>
        <p>골드 {Gold.toLocaleString()}</p>
        <p>
          경험치 {Exp} / {expTable[Level]}
        </p>
      </UserStat>
      <UserBox>
        <UserId>
          {userId} <UserLevel>Lv.{Level}</UserLevel>
        </UserId>
        <UserBtnCircle>
          <img
            src={위쪽화살표}
            alt='보기'
          ></img>
        </UserBtnCircle>
      </UserBox>
    </BasicBox>
  );
};

export default React.memo(UserInfo);
