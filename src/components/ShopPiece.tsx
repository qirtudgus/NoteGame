import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import styled, { css } from 'styled-components';
import { real_buy_ballpen_request } from '../modules/buyBallpenList';
import { equip_ballpen_request, LoginUserInfoInterface } from '../modules/login';
import { penObj } from '../util/shopList';
import { ButtonColor } from './BtnMenu';

interface shopBoxInterface {
  title?: string;
  level?: number;
  desc?: string;
  icon?: string;
  nowEquip?: any;
  penname?: any;
}

const ShopTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 500px;
`;
const ShopTitle = styled.p<shopBoxInterface>`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
  ${(props) =>
    props.penname === props.nowEquip &&
    css`
      &::after {
        content: '(장착중)';
      }
    `}
`;
const ShopDesc = styled.p`
  font-size: 20px;
`;
const ShopIcon = styled(ButtonColor)`
  width: 100px;
  height: 150px;
  background: #fff;
  border-radius: 10px;

  overflow: hidden;
  object-fit: cover;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  & img {
    margin: 20px 0 20px 0;
  }
`;

interface buy {
  buy?: boolean;
}
const ShopBtn = styled(ButtonColor)<buy>`
  width: 10%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 30px;
  }
`;

const ShopBox = styled(ButtonColor)<shopBoxInterface>`
  width: 600px;
  height: 150px;
  background: #fff;
  margin-bottom: 20px;
  display: flex;
  padding: 10px;
  border-radius: 10px;

  //장착한 장비의 css
  ${(props) =>
    props.penname === props.nowEquip &&
    css`
      background: #ffbc26;
      outline: 2px solid#888;
      outline-offset: -2px;
    `}
`;

const ShopPiece = (props: any, ref: any) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const isModal = useSelector((state: RootState) => state.modalState.isModal);
  const buyBallpenList = useSelector((state: RootState) => state.buyBallpenList.buyBallpenList);

  //서버에서 구입한 팬목록 배열을 받아온다.
  // const penNameArr2 = useMemo(() => buyBallpenList, []);
  let equip = userInfo.EquipBallpen;

  //장착할 무기의 공격력을 할당
  const penDamage = (equipBallpenName: string): number => {
    let result = penObj.find((e) => e.ballPenName === equipBallpenName)?.weaponDamage!;
    return result;
  };

  const penSpeed = (equipBallpenName: string) => {
    let result = penObj.find((e) => e.ballPenName === equipBallpenName);
    let reulstObj = {
      DungeonPenSpeed: result?.dungeonPenSpeed as number,
      PenGamePenSpeed: result?.penGamePenSpeed as number,
    };
    return reulstObj;
  };

  return (
    <ShopBox
      as='div'
      ref={ref}
      data-penname={props.penname}
      nowEquip={equip}
      penname={props.penname}
    >
      <ShopIcon as='div'>
        <img
          src={props.penThumbnail}
          alt='볼펜 이미지'
        ></img>
      </ShopIcon>
      <ShopTextWrap>
        <ShopTitle
          nowEquip={equip}
          penname={props.penname}
        >
          {props.title} Lv . {props.level}
        </ShopTitle>
        <ShopDesc>
          {props.desc}
          <br />
          {props.Gold} 골드
        </ShopDesc>
      </ShopTextWrap>
      {
        //렌더링 될 때 구매목록에 해당볼펜의 penname이 들어있는지 체크 후 값을 반환한다.
        buyBallpenList.find((i: string) => i === props.penname) ? (
          <ShopBtn
            as='div'
            buy={props.penname}
            onClick={() => {
              console.log(props.penname);
              dispatch(equip_ballpen_request(`${props.penname}`, penDamage(props.penname), penSpeed(props.penname)));
            }}
          >
            장착
          </ShopBtn>
        ) : (
          <ShopBtn
            as='div'
            onClick={() => {
              if (userInfo.Gold! < props.Gold) {
                alert('골드가 부족해요');
                return;
              } else {
                dispatch(real_buy_ballpen_request(`${props.penname}`, props.Gold));
              }
            }}
          >
            구매
          </ShopBtn>
        )
      }
    </ShopBox>
  );
};

export default React.memo(forwardRef(ShopPiece));
