import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import styled, { css } from 'styled-components';
import 플러스 from '../img/플러스.svg';
import { real_buy_ballpen_request } from '../modules/buyBallpenList';
import { equip_ballpen_request } from '../modules/login';
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
const ShopTitle = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const ShopDesc = styled.p`
  font-size: 16px;
`;
const ShopIcon = styled.div`
  width: 100px;
  height: 150px;
  background: #fff;
`;

interface buy {
  buy?: boolean;
}
const ShopBtn = styled.div<buy>`
  width: 10%;
  height: 100%;
  border-radius: 10px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 30px;
  }
`;

const ShopBox = styled.div<shopBoxInterface>`
  width: 600px;
  height: 150px;
  background: #888;
  margin-bottom: 20px;
  display: flex;
  padding: 10px;

  //장착한 장비의 css
  ${(props) =>
    props.penname === props.nowEquip &&
    css`
      background: #fff;
    `}
`;

const ShopPiece = (props: any) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login.userInfo);

  let equip = userInfo?.EquipBallpen;

  //   console.log(props.buyBallPen);
  return (
    <ShopBox
      data-penname={props.penname}
      nowEquip={equip}
      penname={props.penname}
    >
      <ShopIcon></ShopIcon>
      <ShopTextWrap>
        <ShopTitle>
          {props.title} Lv . {props.level}
        </ShopTitle>
        <ShopDesc>
          {props.desc}
          <p>{props.Gold}골드</p>
        </ShopDesc>
      </ShopTextWrap>
      {props.buyBallPen ? (
        <ShopBtn
          buy={props.penname}
          onClick={() => {
            dispatch(equip_ballpen_request(`${props.penname}`));
          }}
        >
          장착
        </ShopBtn>
      ) : (
        <ShopBtn
          onClick={() => {
            if (userInfo?.Gold! < props.Gold) {
              alert('골드가 부족해요');
              return;
            } else {
              dispatch(
                real_buy_ballpen_request(`${props.penname}`, props.Gold),
              );
            }
          }}
        >
          구매
        </ShopBtn>
      )}
    </ShopBox>
  );
};

export default React.memo(ShopPiece);
