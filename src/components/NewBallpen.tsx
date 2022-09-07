import { useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import { RootState } from '../modules/modules_index';
// import { PenImgDun, PenImgWrapDun, PenEndDun } from '../styledComponents/DungeonFight_Effect';
import { LoginUserInfoInterface } from '../modules/login';
import { penObj } from '../util/shopList';
import React from 'react';

interface ballpen {
  penTop?: number;
  penLeft?: number;
  detailView?: boolean;
}

const PenImgWrap = styled.div<ballpen>`
  top: ${(props) => props.penTop + 'px'};
  left: ${(props) => props.penLeft + 'px'};
  position: absolute;
  height: auto;
  width: 50px;
  display: flex;
  justify-content: center;
`;

const PenPoint = styled.div<ballpen>`
  width: 1px;
  height: 30px;
  background: rgba(0, 0, 0, 1);
  position: absolute;
  z-index: 100;
  top: -30px;
  visibility: hidden;
  ${(props) =>
    props.detailView &&
    css`
      visibility: visible;
    `}
`;

const PenImg = styled.img`
  z-index: 100;
  display: block;
  position: relative;
  height: auto;
  width: 60%;
  top: 0px;
  left: 0px;
  margin: none;
`;

const NewBallpen = ({ penTop, penLeft, detailView }: ballpen) => {
  const { EquipBallpen } = useSelector((state: RootState) => state.login.userInfo) as LoginUserInfoInterface;
  let equipBallpenImg = penObj.find((i: any) => i.ballPenName === EquipBallpen)?.img;

  return (
    <>
      <PenImgWrap
        penTop={penTop}
        penLeft={penLeft}
      >
        <PenImg
          id='penBody'
          src={equipBallpenImg}
        ></PenImg>
        <PenPoint
          detailView={detailView}
          id='penPoint'
        ></PenPoint>
      </PenImgWrap>
    </>
  );
};

export default React.memo(NewBallpen);
