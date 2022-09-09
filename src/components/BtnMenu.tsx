import React from 'react';
import styled from 'styled-components';
import BackHistoryBtn from './BackHistoryBtn';
import HomeBtn from './HomeBtn';
import RefreshBtn from './RefreshBtn';
import FastFowardBtn from './FastFowardBtn';
import LogOutBtn from './LogoutBtn';
import RevivalBtn from './RevivalBtn';
import DetailViewBtn from './DetailViewBtn';

const BtnWrap = styled.div`
  display: flex;
  position: absolute;
  left: 30px;
  bottom: 30px;
  z-index: 500;
`;
export const ButtonColor = styled.div`
  box-shadow: inset 0px 0px 4px 0px rgba(0, 0, 0, 0.4);
  outline: 1px solid#ddd;
  outline-offset: -1px;
`;

export const Back = styled(ButtonColor)`
  cursor: pointer;
  width: 65px;
  height: 65px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;

  &:hover {
    filter: invert(80%);
  }
`;

interface btn {
  BackHistory?: boolean;
  Home?: boolean;
  FastForward?: boolean;
  FastForwardFunc?: () => void;
  FastForwardText?: number;
  Refresh?: boolean;
  RefreshFunc?: () => void;
  LogOut?: boolean;
  Revival?: boolean;
  RevivalDispatch?: () => { type: 'modalState/MODAL_SUCCESS' };
  DetailView?: boolean;
}

const BtnMenu = ({
  BackHistory,
  Home,
  FastForward,
  FastForwardFunc,
  FastForwardText,
  Refresh,
  LogOut,
  RefreshFunc,
  Revival,
  RevivalDispatch,
  DetailView,
}: btn) => {
  return (
    <BtnWrap>
      {BackHistory && <BackHistoryBtn></BackHistoryBtn>}
      {Home && <HomeBtn></HomeBtn>}
      {Refresh && <RefreshBtn func={RefreshFunc}></RefreshBtn>}
      {FastForward && (
        <FastFowardBtn
          func={FastForwardFunc}
          text={FastForwardText}
        ></FastFowardBtn>
      )}
      {LogOut && <LogOutBtn></LogOutBtn>}
      {DetailView && <DetailViewBtn></DetailViewBtn>}
      {Revival && <RevivalBtn OnClick={RevivalDispatch}></RevivalBtn>}
    </BtnWrap>
  );
};
export default React.memo(BtnMenu);
