import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { real_buy_ballpen_request } from '../modules/buyBallpenList';
import { LoginUserInfoInterface, equip_ballpen_request } from '../modules/login';
import { ButtonColor } from './BtnMenu';
import { penObj } from '../util/shopList';
import styled, { css } from 'styled-components';

import { useInView } from 'react-intersection-observer';
import RevivalModal from './RevivalModal';
import { modal_failure, modal_success } from '../modules/modalState';
import BasicBtn from './BasicBtn';

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
  padding: 10px 0 10px 0;
  width: 430px;
`;

const ShopDesc = styled.div`
  font-size: 18px;
  & .penGold {
    text-align: right;
  }
`;
const ShopIcon = styled(ButtonColor)`
  width: 100px;
  height: 100%;
  background: #fff;
  overflow: hidden;
  object-fit: cover;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  & img {
    margin: 20px 0 20px 0;
    transform: rotate(35deg);
  }
`;

const ShopTitle = styled.div<shopBoxInterface>`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 5px;
  ${(props) =>
    props.penname === props.nowEquip &&
    css`
      &::after {
        content: ' (장착중)';
      }
    `}
`;

const ShopWrap = styled.div`
  height: 480px;
  overflow-y: scroll;
  background: #333;
`;

interface buy {
  buy?: boolean;
}
const ShopBtn = styled(ButtonColor)<buy>`
  width: 10%;
  height: 100%;
  cursor: pointer;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 30px;
  }
  &:hover {
    background: #333;
    color: #fff;
  }
`;

const ShopBox = styled.div<shopBoxInterface>`
  width: auto;
  height: 150px;
  background: #fff;
  margin-bottom: 4px;
  display: flex;
  /* border-radius: 10px; */
  border: 1px solid#aaa;
  justify-content: space-between;
  //장착한 장비의 css
  ${(props) =>
    props.penname === props.nowEquip &&
    css`
      background: #ffbc26;
      /* outline: 2px solid#888;
      outline-offset: -2px; */
    `}
`;

const ShopPiece = (props: any) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const isModal = useSelector((state: RootState) => state.modalState.isModal);
  const buyBallpenList = useSelector((state: RootState) => state.buyBallpenList.buyBallpenList);

  const [goldCheck, setGoldCheck] = useState(true);
  const [buyPenObj, setBuyPenObj] = useState({
    ballPenName: '',
    Gold: '',
    title: '',
  });

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

  //알림창을 띄우고, 예를 눌렀을 때 ballPenName을 담아서 디스패치해주어야한다.
  function buyPen(ballPenName: string, Gold: string, title: string) {
    //상태값에 할당하여 디스패치할 때
    if (userInfo.Gold < Number(Gold)) {
      setGoldCheck(false);
    }
    setBuyPenObj({ ballPenName, Gold, title });
    dispatch(modal_success());
  }
  function takePen() {
    dispatch(real_buy_ballpen_request(`${buyPenObj.ballPenName}`, buyPenObj.Gold));
    dispatch(modal_failure());
    dispatch(
      equip_ballpen_request(
        `${buyPenObj.ballPenName}`,
        penDamage(buyPenObj.ballPenName),
        penSpeed(buyPenObj.ballPenName),
      ),
    );
  }

  const a = (
    <>
      <p>{buyPenObj.title}</p>
      <p>{buyPenObj.Gold.toLocaleString()}잉크</p>
      <p>구매하시겠습니까?</p>
      <BasicBtn
        ButtonText='네, 구매하겠습니다.'
        color='#333'
        OnClick={() => takePen()}
      ></BasicBtn>
      <BasicBtn
        ButtonText='아니요, 다음에 살래요.'
        color='#333'
        OnClick={() => dispatch(modal_failure())}
      ></BasicBtn>
    </>
  );
  const b = (
    <>
      <p>잉크가 부족해요!</p>
    </>
  );
  return (
    <>
      {isModal && <RevivalModal close>{goldCheck ? a : b}</RevivalModal>}
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
                  {i.title}
                </ShopTitle>
                <ShopDesc>
                  <p>{i.desc}</p>
                  <p>공격력 {i.weaponDamage.toLocaleString()}</p>
                  <p>
                    공격률 {Math.min(...i.rewardList).toLocaleString()} ~ {Math.max(...i.rewardList).toLocaleString()}
                  </p>
                  <p className='penGold'> {i.Gold.toLocaleString()} 잉크</p>
                </ShopDesc>
              </ShopTextWrap>
              {
                //렌더링 될 때 구매목록에 해당볼펜의 penname이 들어있는지 체크 후 값을 반환한다.
                buyBallpenList.find((el: any) => el === i.ballPenName) ? (
                  <ShopBtn
                    as='div'
                    buy={i.ballPenName}
                    onClick={() => {
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
                      buyPen(i.ballPenName, i.Gold, i.title);
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

export default React.memo(ShopPiece);
