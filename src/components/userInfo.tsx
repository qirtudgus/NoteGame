import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { expTable } from '../util/expTable';
import React from 'react';
import 물음표 from '../img/물음표_원형.svg';
import 칼 from '../img/흰칼.svg';
import 잉크 from '../img/잉크.png';
import { LoginUserInfoInterface } from '../modules/login';
import { userInfo_visible_on } from '../modules/userInfoVisible';

const BasicBox = styled.div`
  width: 100%;
  position: absolute;
  top: 77px;
  left: 1px;
  z-index: 10;
  font-size: 1.1rem;
  padding-bottom: 7px;
  line-height: 32px;
  letter-spacing: 1px;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  /* background: #ffbc26; */
  padding: 3px 10px 3px 20px;
`;

const UserId = styled.div`
  border: 1px solid#aaa;
  background: #333;
  font-size: 1.5rem;
  color: #fff;
  box-shadow: 2px 2px 5px 2px rgb(0 0 0 / 35%);
  margin-left: 0.6rem;
  padding: 3px 0.6rem 3px 0.6rem;
  border-radius: 6px;
`;
const UserLevel = styled.div`
  border: 1px solid#aaa;
  background: #333;
  color: #fff;
  box-shadow: 2px 2px 5px 2px rgb(0 0 0 / 35%);
  margin-left: 0.1rem;
  padding: 3px 0.6rem 3px 0.6rem;
  border-radius: 6px;
`;

const UserGold = styled.div`
  cursor: default;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 100px;
  background: #333;
  color: #fff;
  margin-left: 0.1rem;
  padding: 3px 0.6rem 3px 0.6rem;
  border-radius: 6px;
  border: 1px solid#aaa;
  box-shadow: 2px 2px 5px 2px rgb(0 0 0 / 35%);

  & img {
    width: 28px;
  }
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
  }
`;

const Help = styled.div`
  cursor: pointer;
  z-index: 1000;
  position: absolute;
  border-radius: 100%;
  right: 30px;
  margin-left: 0.6rem;
  width: 40px;
  height: 40px;
  & img {
    width: 100%;
  }
  &:hover {
    box-shadow: 2px 2px 5px 2px rgb(0 0 0 / 35%);
  }
`;

const UserInfo = () => {
  const dispatch = useDispatch();
  const { Nickname, Level, BasicHp, BasicDamage, WeaponDamage, WeaponHp, Gold, Exp } = useSelector(
    (state: RootState) => state.login.userInfo,
  ) as LoginUserInfoInterface;

  return (
    <BasicBox>
      <UserBox>
        <UserId>{Nickname}</UserId>
        <UserLevel>Lv. {Level}</UserLevel>
        <UserGold>
          <span>Exp</span> {Exp} / {expTable[Level]}
        </UserGold>
        <UserGold as='div'>
          <span>HP</span> {(BasicHp + WeaponHp).toLocaleString()}
        </UserGold>
        <UserGold as='div'>
          <span>
            <img
              src={칼}
              alt='공격력'
            ></img>
          </span>
          {(BasicDamage + WeaponDamage).toLocaleString()}
        </UserGold>
        <UserGold as='div'>
          <span>
            <img
              src={잉크}
              alt='잉크'
            ></img>
          </span>
          {Gold.toLocaleString()}
        </UserGold>
        <Help
          onClick={() => dispatch(userInfo_visible_on())}
          title='도움말'
        >
          <img
            src={물음표}
            alt='물음표'
          ></img>
        </Help>
      </UserBox>
    </BasicBox>
  );
};

export default React.memo(UserInfo);
