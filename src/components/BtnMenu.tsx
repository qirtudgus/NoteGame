import React from 'react';
import styled from 'styled-components';
import BackHistoryBtn from './BackHistoryBtn';
import HomeBtn from './HomeBtn';
import RefreshBtn from './RefreshBtn';
import FastFowardBtn from './FastFowardBtn';
import LogOutBtn from './LogoutBtn';
import RevivalBtn from './RevivalBtn';
//props 사용을 위해 인터페이스로 타입 명시
//https://blog.devgenius.io/using-styled-components-and-props-with-typescript-react-a3c32a496f47
interface cornerBtn {
  corner?: boolean;
  url?: string;
}

const BtnWrap = styled.div`
  display: flex;
  position: absolute;
  left: 30px;
  top: 90px;
`;
export const ButtonColor = styled.button`
  box-shadow: inset 0px 0px 4px 0px rgba(0, 0, 0, 0.4);
  outline: 1px solid#ddd;
  outline-offset: -1px;
`;

export const Back = styled(ButtonColor)<cornerBtn>`
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
  FastFoward?: boolean;
  FastFowardFunc?: any;
  FastFowardText?: number;
  Refresh?: boolean;
  RefreshFunc?: () => void;
  LogOut?: boolean;
  Revival?: boolean;
  RevivalDispatch?: () => { type: 'modalState/MODAL_SUCCESS' };
}

const BtnMenu = ({
  BackHistory,
  Home,
  FastFoward,
  FastFowardFunc,
  FastFowardText,
  Refresh,
  LogOut,
  RefreshFunc,
  Revival,
  RevivalDispatch,
}: btn) => {
  return (
    <BtnWrap>
      {BackHistory && <BackHistoryBtn></BackHistoryBtn>}
      {Home && <HomeBtn></HomeBtn>}
      {Refresh && <RefreshBtn func={RefreshFunc}></RefreshBtn>}
      {FastFoward && (
        <FastFowardBtn
          func={FastFowardFunc}
          text={FastFowardText}
        ></FastFowardBtn>
      )}
      {LogOut && <LogOutBtn></LogOutBtn>}
      {Revival && <RevivalBtn OnClick={RevivalDispatch}></RevivalBtn>}
    </BtnWrap>
  );
};
export default React.memo(BtnMenu);
