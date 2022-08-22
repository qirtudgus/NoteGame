import { useSelector } from 'react-redux';
import { RootState } from '../modules/modules_index';
import styled, { css } from 'styled-components';
import ShopPiece from '../components/ShopPiece';
import React, { useEffect, useState } from 'react';
import Notfound from './Notfound';
import { useInView } from 'react-intersection-observer';
import { penObj } from '../util/shopList';
import BtnMenu from '../components/BtnMenu';
import {ButtonColor} from '../components/BtnMenu';

const SkillPageWrap = styled(ButtonColor)`
  width: 100%;
  height: 100%;
  padding: 20px 0 20px 0;
  background: #eaeaea;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0px 0px 20px 20px;

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


`;

const BallpenShop = () => {
  const [ref, InView] = useInView({
    threshold: 0.8, //타겟이 화면에 얼만큼 보였을 때 InView를 토글할 것인지
    // delay: 2000, //로딩되는 딜레이
  });
  const [list, setList] = useState<any>([]);
  const buyBallpenList = useSelector(
    (state: RootState) => state.buyBallpenList.buyBallpenList,
  );

  useEffect(() => {
    setList((list: any) => [...list, ...penObj.slice(0, 4)]);
  }, []);


  useEffect(() => {
    if (InView === true) {
      setList((list: any) => [
        ...list,
        ...penObj.slice(list.length, list.length + 2),
      ]);
    }
  }, [InView]);


  const userInfo = useSelector((state: RootState) => state.login.userInfo);
  const [isSkillTab, setIsSkillTab] = useState({
    passive: 'passive1',
    TabNum: 1,
  });

  return (
    <>
      {buyBallpenList.buyBallpenList ? (
        <>
        <BtnMenu BackHistory></BtnMenu>
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
            <SkillPageWrap as='div'>
              {
                {
                  passive1: (
                    <>
                      {list.map((i: any, index: any) => (
                        <React.Fragment key={index}>
                         {/* 마지막 요소에는 ref로 InView를 감지할 수 있는 요소로 렌더링 */}
                          {list.length -1 === index ? (
                            <ShopPiece
                              ref={ref}
                              penname={i.ballPenName}
                              penThumbnail={i.img}
                              title={i.title}
                              desc={i.desc}
                              level={i.level}
                              Gold={i.Gold}
                            ></ShopPiece>
                          ) : (
                            <ShopPiece
                              penname={i.ballPenName}
                              penThumbnail={i.img}
                              title={i.title}
                              desc={i.desc}
                              level={i.level}
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

export default React.memo(BallpenShop);
