import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { equip_paper_request, LoginUserInfoInterface } from '../modules/login';
import { buy_paper_request } from '../modules/buyPaperList';
import { ButtonColor } from './BtnMenu';
import { paperObj } from '../util/paperList';
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
  font-size: 16px;
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

const ShopBox = styled(ButtonColor)<shopBoxInterface>`
  width: 100%;
  height: 150px;
  background: #fff;
  margin-bottom: 15px;
  display: flex;
  /* border-radius: 10px; */
  justify-content: space-between;
  //장착한 장비의 css
  ${(props) =>
    props.penname === props.nowEquip &&
    css`
      background: #ffbc26;
      outline: 2px solid#888;
      outline-offset: -2px;
    `}
`;

const ShopPaperPiece = (props: any) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const isModal = useSelector((state: RootState) => state.modalState.isModal);
  const buyBallpenList = useSelector((state: RootState) => state.buyBallpenList.buyBallpenList);
  const buyPaperList = useSelector((state: RootState) => state.buyPaperListRequest.buyPaperList);
  const [goldCheck, setGoldCheck] = useState(true);
  const [buyPaperObj, setBuyPaperObj] = useState({
    paperName: '',
    Gold: '',
    title: '',
  });

  let equip = userInfo.EquipPaper;
  //장착할 종이의 체력을 할당
  const paperHp = (equipPaperName: string): number => {
    let result = paperObj.find((e) => e.paperName === equipPaperName)?.Hp!;
    return result;
  };

  const [ref, InView] = useInView({
    threshold: 0.8, //타겟이 화면에 얼만큼 보였을 때 InView를 토글할 것인지
    // delay: 2000, //로딩되는 딜레이
  });
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    setList((list: any) => [...list, ...paperObj.slice(0, 4)]);
  }, []);

  useEffect(() => {
    if (InView === true) {
      setList(list.concat(...paperObj.slice(list.length, list.length + 2)));
    }
  }, [InView]);

  //알림창을 띄우고, 예를 눌렀을 때 ballPenName을 담아서 디스패치해주어야한다.
  function buyPen(paperName: string, Gold: string, title: string) {
    //상태값에 할당하여 디스패치할 때
    if (userInfo.Gold < Number(Gold)) {
      setGoldCheck(false);
    }
    setBuyPaperObj({ paperName, Gold, title });
    dispatch(modal_success());
  }
  function takePen() {
    dispatch(buy_paper_request(buyPaperObj.paperName, buyPaperObj.Gold));
    dispatch(equip_paper_request(buyPaperObj.paperName, paperHp(buyPaperObj.paperName)));
    dispatch(modal_failure());
  }

  const a = (
    <>
      <p>{buyPaperObj.title}</p>
      <p>{buyPaperObj.Gold}잉크</p>
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
      <p>골드가 부족해요!</p>
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
              data-penname={i.paperName}
              nowEquip={equip}
              penname={i.paperName}
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
                  penname={i.paperName}
                >
                  {i.title}
                </ShopTitle>
                <ShopDesc>
                  <p>{i.desc}</p>
                  <p>체력 {i.Hp}</p>
                  <p>가격 {i.Gold} 잉크</p>
                </ShopDesc>
              </ShopTextWrap>
              {
                //렌더링 될 때 구매목록에 해당볼펜의 penname이 들어있는지 체크 후 값을 반환한다.
                buyPaperList.find((el: any) => el === i.paperName) ? (
                  <ShopBtn
                    as='div'
                    buy={i.paperName}
                    onClick={() => {
                      console.log('zz');
                      dispatch(equip_paper_request(i.paperName, paperHp(i.paperName)));
                    }}
                  >
                    장착
                  </ShopBtn>
                ) : (
                  <ShopBtn
                    as='div'
                    onClick={() => {
                      buyPen(i.paperName, i.Gold, i.title);
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

export default React.memo(ShopPaperPiece);
