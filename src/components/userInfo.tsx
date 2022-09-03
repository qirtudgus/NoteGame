import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/modules_index';
// import { expTable } from '../util/ExpTable';
import { expTable } from '../util/expTable';
import React from 'react';
import 위쪽화살표 from '../img/위쪽화살표.svg';
import 칼 from '../img/흰칼.svg';
import 잉크 from '../img/잉크.png';
import { LoginUserInfoInterface } from '../modules/login';
import { userInfo_visible_on, userInfo_visible_off } from '../modules/userInfoVisible';
import { ButtonColor } from './BtnMenu';
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
  padding: 4px 1rem 4px 1rem;
  border-radius: 6px;
`;
const UserLevel = styled.div`
  border: 1px solid#aaa;
  background: #333;
  color: #fff;
  box-shadow: 2px 2px 5px 2px rgb(0 0 0 / 35%);
  margin-left: 0.1rem;
  padding: 4px 1rem 4px 1rem;
  border-radius: 6px;
`;

const UserStat = styled.div<btnAni>`
  position: relative;
  padding: 3px;
  ${(props) => props.isVisible && css``}
`;

interface btnAni {
  isVisible: boolean;
}

const UserBtnCircle = styled.div<btnAni>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 5px;
  border-radius: 100px;
  height: 35px;
  width: 35px;
  background: #fff;
  ${(props) =>
    props.isVisible &&
    css`
      & > img {
        transition: 0.2s all;
        transform: rotate(0deg);
      }
    `}
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
  padding: 3px 1rem 3px 1rem;
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

const UserInfo = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.login.id);
  const isVisible = useSelector((state: RootState) => state.userInfo_visibleRequest.isVisible);
  const { Level, BasicHp, BasicDamage, WeaponDamage, Gold, Exp } = useSelector(
    (state: RootState) => state.login.userInfo,
  ) as LoginUserInfoInterface;

  return (
    <BasicBox>
      <UserBox>
        <UserId>{userId}</UserId>
        <UserLevel>Lv. {Level}</UserLevel>
        <UserLevel>
          Exp {Exp} / {expTable[Level]}
        </UserLevel>
        <UserGold as='div'>
          <span>HP</span> {BasicHp.toLocaleString()}
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
        {/* <UserBtnCircle
          isVisible={isVisible}
          onClick={
            isVisible
              ? () => {
                  dispatch(userInfo_visible_off());
                }
              : () => {
                  dispatch(userInfo_visible_on());
                }
          }
        >
          <img
            src={위쪽화살표}
            alt='보기'
          ></img>
        </UserBtnCircle> */}
      </UserBox>
      {isVisible ? (
        <UserStat isVisible={isVisible}>
          <p>체력 {BasicHp}</p>
          <p>공격력 {BasicDamage + WeaponDamage}</p>

          <p>
            경험치 {Exp} / {expTable[Level]}
          </p>
        </UserStat>
      ) : null}
    </BasicBox>
  );
};

export default React.memo(UserInfo);
