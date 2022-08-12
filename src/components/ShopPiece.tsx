import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import styled from 'styled-components';
import 플러스 from '../img/플러스.svg';
import { buy_ballpen_request } from '../modules/buyBallpenList';
interface shopBoxInterface {
  title?: string;
  level?: number;
  desc?: string;
  icon?: string;
}

const ShopBox = styled.div<shopBoxInterface>`
  width: 600px;
  height: 150px;
  background: #888;
  margin-bottom: 20px;
  display: flex;
  padding: 10px;
`;
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

const ShopBtn = styled.div`
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

const ShopPiece = (props: any) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login.userInfo);

  return (
    <ShopBox data-penname={props.penname}>
      <ShopIcon></ShopIcon>
      <ShopTextWrap>
        <ShopTitle>
          {props.title} Lv . {props.level}
        </ShopTitle>
        <ShopDesc>{props.desc}</ShopDesc>
      </ShopTextWrap>
      <ShopBtn
        onClick={() => {
          dispatch(buy_ballpen_request(`${props.penname}`));
        }}
      >
        <img src={플러스} alt='스킬 업그레이드'></img>
      </ShopBtn>
    </ShopBox>
  );
};

export default React.memo(ShopPiece);
