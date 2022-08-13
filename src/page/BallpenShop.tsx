import BackHistoryBtn from '../components/BackHistoryBtn';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/modules_index';
import styled, { css } from 'styled-components';
import ShopPiece from '../components/ShopPiece';
import React, { useEffect, useState } from 'react';
import Notfound from './Notfound';
import { useInView } from 'react-intersection-observer';
import { penObj } from '../util/shopList';

const SkillPageWrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  background: #999;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

interface TabColor {
  active?: number;
}

const SkillTap = styled.div<TabColor>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  height: 100%;
  background: #eee;
  ${(props) =>
    props.active === 1 &&
    css`
      background: #e5005a;
    `}
`;
const SkillTap2 = styled.div<TabColor>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  height: 100%;
  background: #eee;
  ${(props) =>
    props.active === 2 &&
    css`
      background: #e5005a;
    `}
`;

const SkillTabWrap = styled.div`
  display: flex;
  width: 100%;
  height: 90px;
  background: #555;
`;

const SkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 600px;
  background: #333;
`;

const BallpenShop = () => {
  const [ref, InView] = useInView({
    threshold: 0.5, //타겟이 화면에 얼만큼 보였을 때 InView를 토글할 것인지
    // delay: 2000, //로딩되는 딜레이
  });
  const [list, setList] = useState<any>([]);
  const buyBallpenList = useSelector(
    (state: RootState) => state.buyBallpenList.buyBallpenList,
  );
  // console.log(InView.toString());
  useEffect(() => {
    if (InView === true) {
      setList((list: any) => [
        ...list,
        ...penObj.slice(list.length, list.length + 2),
      ]);
    }
  }, [InView]);

  useEffect(() => {
    setList((list: any) => [...list, ...penObj.slice(0, 4)]);
  }, []);
  const userInfo = useSelector((state: RootState) => state.login.userInfo);
  const [isSkillTab, setIsSkillTab] = useState({
    passive: 'passive1',
    TabNum: 1,
  });

  //서버에서 구입한 팬목록 배열을 받아온다.
  const penNameArr2 = buyBallpenList.buyBallpenList;

  return (
    <>
      {penNameArr2 ? (
        <>
          <BackHistoryBtn corner></BackHistoryBtn>
          <SkillWrap>
            <SkillTabWrap>
              <SkillTap
                active={isSkillTab.TabNum}
                onClick={() => {
                  setIsSkillTab({ passive: 'passive1', TabNum: 1 });
                }}
              >
                무기
              </SkillTap>
              <SkillTap2
                active={isSkillTab.TabNum}
                onClick={() => {
                  setIsSkillTab({ passive: 'passive2', TabNum: 2 });
                }}
              >
                방어구
              </SkillTap2>
              <p>골드 {userInfo?.Gold}</p>
            </SkillTabWrap>
            <SkillPageWrap>
              {
                {
                  passive1: (
                    <>
                      {list.map((i: any, index: any) => (
                        <React.Fragment key={index}>
                          {list.length - 1 === index ? (
                            <ShopPiece
                              ref={ref}
                              // key={i.ballPenName}
                              penname={i.ballPenName}
                              title={i.title}
                              desc={i.desc}
                              level={i.level}
                              // buyBallPen={penNameArr2[index]}
                              Gold={i.Gold}
                            ></ShopPiece>
                          ) : (
                            <ShopPiece
                              // ref={ref}
                              // key={i.ballPenName}
                              penname={i.ballPenName}
                              title={i.title}
                              desc={i.desc}
                              level={i.level}
                              // buyBallPen={penNameArr2[index]}
                              Gold={i.Gold}
                            ></ShopPiece>
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  ),
                  passive2: (
                    <>
                      <ShopPiece title='준비중'></ShopPiece>
                      <ShopPiece></ShopPiece>
                      <ShopPiece></ShopPiece>
                    </>
                  ),
                }[isSkillTab.passive]
              }
            </SkillPageWrap>
          </SkillWrap>
        </>
      ) : (
        <Notfound></Notfound>
      )}
    </>
  );
};

export default BallpenShop;
