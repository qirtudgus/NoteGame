import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import { LoginUserInfoInterface, buy_skillpoint_request } from '../modules/login';
import { ButtonColor } from './BtnMenu';
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
  etcname?: string;
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
  justify-content: space-between;
`;
const StatList = styled.li`
  display: flex;
  font-size: 1.5rem;
`;
const StatName = styled.span`
  width: 31.3%;
  height: 35px;
  padding: 5px 0 5px 10px;
  background: #eee;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const StatValue = styled.span`
  width: 50%;
  height: 35px;
  padding: 5px 0 5px 10px;
  background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ShopList_etc = (props: any) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  const isModal = useSelector((state: RootState) => state.modalState.isModal);
  const [equipPenModal, setEquipPenModal] = useState(false);
  const [goldCheck, setGoldCheck] = useState(true);
  const [needSkillPoint, SetNeedSkillPoint] = useState(100);

  const etcList = [
    {
      title: '스킬 포인트',
      desc: '1 포인트를 획득할 수 있다.',
      level: '1',
      etcName: 'buySkillPoint',
      Gold: needSkillPoint,
    },
  ];

  const [ref, InView] = useInView({
    threshold: 0.8, //타겟이 화면에 얼만큼 보였을 때 InView를 토글할 것인지
    // delay: 2000, //로딩되는 딜레이
  });
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    SetNeedSkillPoint((userInfo.BuySkillPointCount + 1) * 100);
  }, [userInfo.BuySkillPointCount]);

  useEffect(() => {
    setList((list: any) => [...list, ...etcList.slice(0, 4)]);
  }, []);

  useEffect(() => {
    if (InView === true) {
      setList(list.concat(...etcList.slice(list.length, list.length + 2)));
    }
  }, [InView]);

  const buySkillPoint = () => {
    if (userInfo.StatPoint < needSkillPoint) {
      setGoldCheck(false);
      dispatch(modal_success());
    } else {
      dispatch(modal_success());
    }
  };
  const buySkillPoint_closeModal = () => {
    dispatch(buy_skillpoint_request(needSkillPoint));
    dispatch(modal_failure());
  };

  const a = (
    <>
      <p>{needSkillPoint}스텟포인트</p>
      <p>구매하시겠습니까?</p>
      <BasicBtn
        ButtonText='네, 구매하겠습니다.'
        color='#333'
        OnClick={buySkillPoint_closeModal}
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
      <p>스텟포인트가 부족해요!</p>
    </>
  );

  return (
    <>
      <StatList>
        <StatName>스텟 포인트</StatName>
        <StatValue>{userInfo.StatPoint}</StatValue>
      </StatList>
      {equipPenModal && (
        <RevivalModal
          close
          OnClick={() => {
            setEquipPenModal(false);
          }}
        >
          <p>요구 레벨이 부족해요!</p>
        </RevivalModal>
      )}
      {isModal && <RevivalModal close>{goldCheck ? a : b}</RevivalModal>}
      <ShopWrap>
        {list.map((i: any, index: number) => {
          return (
            <ShopBox
              as='div'
              ref={ref}
              key={index}
              etcname={i.etcName}
            >
              <ShopIcon as='div'>
                {/* <img
                ></img> */}
              </ShopIcon>
              <ShopTextWrap>
                <ShopTitle etcname={i.etcName}>{i.title}</ShopTitle>
                <ShopDesc>
                  <p>{i.desc}</p>

                  <p className='penGold'> {needSkillPoint} 스텟 포인트</p>
                </ShopDesc>
              </ShopTextWrap>

              <ShopBtn
                as='div'
                onClick={buySkillPoint}
              >
                구매
              </ShopBtn>
            </ShopBox>
          );
        })}
      </ShopWrap>
    </>
  );
};

export default React.memo(ShopList_etc);
