import BackHistoryBtn from '../components/BackHistoryBtn';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/modules_index';
import styled, { css } from 'styled-components';
import ShopPiece from '../components/ShopPiece';
import { useState } from 'react';

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
  const buyBallpenList = useSelector(
    (state: RootState) => state.buyBallpenList.buyBallpenList,
  );
  console.log(buyBallpenList.buyBallpenList);

  const userInfo = useSelector((state: RootState) => state.login.userInfo);
  const [isSkillTab, setIsSkillTab] = useState({
    passive: 'passive1',
    TabNum: 1,
  });

  //서버에서 구입한 팬목록 배열을 받아온다.
  const penNameArr = ['weapon1', 'weapon2'];
  const penNameArr2 = buyBallpenList.buyBallpenList;
  console.log(penNameArr2);
  const penObj = [
    { title: '모나미', desc: '그냥볼펜', level: '5', ballPenName: 'weapon1' },
    {
      title: '하이테크',
      desc: '하이테크입니다.',
      level: '5',
      ballPenName: 'weapon2',
    },
    {
      title: '만년필',
      desc: '만년필입니다.',
      level: '5',
      ballPenName: 'weapon3',
    },
    {
      title: '5주년 모나미',
      desc: '기념품입니다.',
      level: '5',
      ballPenName: 'weapon4',
    },
    {
      title: '6주년 모나미',
      desc: '기념품입니다.',
      level: '5',
      ballPenName: 'weapon5',
    },
  ];

  return (
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
                  {penObj.map((i, index) => (
                    <ShopPiece
                      key={i.ballPenName}
                      penname={i.ballPenName}
                      title={i.title}
                      desc={i.desc}
                      level={i.level}
                      buyBallPen={penNameArr[index]}
                    ></ShopPiece>
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
  );
};

export default BallpenShop;
