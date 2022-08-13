import React, { forwardRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import styled, { css } from 'styled-components';
import 플러스 from '../img/플러스.svg';
import { real_buy_ballpen_request } from '../modules/buyBallpenList';
import { equip_ballpen_request } from '../modules/login';
// import { useInView } from 'react-intersection-observer';

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
  font-size: 22px;
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

const ShopPiece = (props: any, ref: any) => {
  // const [ref, inView] = useInView();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login.userInfo);
  const buyBallpenList = useSelector(
    (state: RootState) => state.buyBallpenList.buyBallpenList,
  );

  //서버에서 구입한 팬목록 배열을 받아온다.
  const penNameArr2 = useMemo(() => buyBallpenList.buyBallpenList, []);

  let equip = userInfo?.EquipBallpen;
  // console.log(`받아온 볼펜구매 목록 ${props.buyBallPen}`);
  // console.log(`볼펜 목록 ${props.penname}`);

  return (
    <ShopBox
      ref={ref}
      data-penname={props.penname}
      nowEquip={equip}
      penname={props.penname}
    >
      <ShopIcon></ShopIcon>
      <ShopTextWrap>
        <ShopTitle nowEquip={equip} penname={props.penname}>
          {props.title} Lv . {props.level}
        </ShopTitle>
        <ShopDesc>
          {props.desc}
          <br />
          {props.Gold}
        </ShopDesc>
      </ShopTextWrap>
      {
        //렌더링 될 때 구매목록에 해당볼펜의 penname이 들어있는지 체크 후 값을 반환한다.
        penNameArr2.find((i: Element) => i === props.penname) ? (
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
        )
      }
    </ShopBox>
  );
};

export default React.memo(forwardRef(ShopPiece));
