import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { real_buy_ballpen_request } from '../modules/buyBallpenList';
import { LoginUserInfoInterface, equip_ballpen_request } from '../modules/login';
import { ButtonColor } from './BtnMenu';
import { penObj } from '../util/shopList';
import styled, { css } from 'styled-components';

import { useInView } from 'react-intersection-observer';

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
  padding: 10px 0 10px 0;
  width: 400px;
`;

const ShopDesc = styled.p`
  font-size: 16px;
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

const ShopWrap = styled.div`
  height: 480px;
  overflow-y: scroll;
  background: #eaeaea;
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
  width: 593px;
  height: 150px;
  background: #fff;
  /* margin-bottom: 20px; */
  display: flex;
  padding: 10px;
  /* border-radius: 10px; */
  justify-content: space-around;
  //장착한 장비의 css
  ${(props) =>
    props.penname === props.nowEquip &&
    css`
      background: #ffbc26;
      outline: 2px solid#888;
      outline-offset: -2px;
    `}
`;

const NewShopPiece = (props: any) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const buyBallpenList = useSelector((state: RootState) => state.buyBallpenList.buyBallpenList);
  let equip = userInfo.EquipBallpen;
  //장착할 무기의 공격력을 할당
  const penDamage = (equipBallpenName: string): number => {
    let result = penObj.find((e) => e.ballPenName === equipBallpenName)?.weaponDamage!;
    return result;
  };
  //장착할 무기의 스피드를 할당
  const penSpeed = (equipBallpenName: string) => {
    let result = penObj.find((e) => e.ballPenName === equipBallpenName);
    let reulstObj = {
      DungeonPenSpeed: result?.dungeonPenSpeed as number,
      PenGamePenSpeed: result?.penGamePenSpeed as number,
    };
    return reulstObj;
  };

  const [ref, InView] = useInView({
    threshold: 0.8, //타겟이 화면에 얼만큼 보였을 때 InView를 토글할 것인지
    // delay: 2000, //로딩되는 딜레이
  });
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    setList((list: any) => [...list, ...penObj.slice(0, 4)]);
  }, []);

  useEffect(() => {
    if (InView === true) {
      setList(list.concat(...penObj.slice(list.length, list.length + 2)));
    }
  }, [InView]);

  return (
    <>
      <ShopWrap>
        {list.map((i: any, index: number) => {
          return (
            <ShopBox
              as='div'
              ref={ref}
              key={index}
              data-penname={i.ballPenName}
              nowEquip={equip}
              penname={i.ballPenName}
            >
              <ShopIcon as='div'>
                <img
                  src={i.img}
                  alt='볼펜 이미지'
                ></img>
              </ShopIcon>
              <ShopTextWrap>
                <ShopTitle
                  nowEquip={equip}
                  penname={i.ballPenName}
                >
                  {i.title} Lv . {i.level}
                </ShopTitle>
                <ShopDesc>
                  <p>{i.desc}</p>
                  <p>공격력 {i.weaponDamage}</p>
                  <p>최소 공격률 {Math.min(...i.rewardList)}</p>
                  <p>최대 공격률 {Math.max(...i.rewardList)}</p>
                  <p>가격 {i.Gold} 잉크</p>
                </ShopDesc>
              </ShopTextWrap>
              {
                //렌더링 될 때 구매목록에 해당볼펜의 penname이 들어있는지 체크 후 값을 반환한다.
                buyBallpenList.find((el: any) => el === i.ballPenName) ? (
                  <ShopBtn
                    as='div'
                    buy={i.ballPenName}
                    onClick={() => {
                      console.log(i.ballPenName);
                      dispatch(
                        equip_ballpen_request(`${i.ballPenName}`, penDamage(i.ballPenName), penSpeed(i.ballPenName)),
                      );
                    }}
                  >
                    장착
                  </ShopBtn>
                ) : (
                  <ShopBtn
                    as='div'
                    onClick={() => {
                      if (userInfo.Gold! < i.Gold) {
                        alert('골드가 부족해요');
                        return;
                      } else {
                        dispatch(real_buy_ballpen_request(`${i.ballPenName}`, i.Gold));
                      }
                    }}
                  >
                    구매
                  </ShopBtn>
                )
              }
            </ShopBox>
          );
        })}
      </ShopWrap>
    </>
  );
};

export default React.memo(NewShopPiece);
