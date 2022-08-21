import React from "react";
import styled,{css} from "styled-components";
import { useNavigate } from 'react-router-dom';
import BackHistoryBtn from './BackHistoryBtn'
import HomeBtn from "./HomeBtn";
import RefreshBtn from "./RefreshBtn";
import FastFowardBtn from "./FastFowardBtn";
import LogOutBtn from "./LogoutBtn";
import RevivalBtn from "./RevivalBtn";

//props 사용을 위해 인터페이스로 타입 명시
//https://blog.devgenius.io/using-styled-components-and-props-with-typescript-react-a3c32a496f47
interface cornerBtn {
    corner?: boolean;
    url?: string;

  }
  

const BtnWrap = styled.div`
display:flex;
position:absolute;
left:30px;
top:90px;
& > div {
    margin-right:30px;
}
`

export const Back = styled.div<cornerBtn>`
cursor: pointer;
width: 76px;
height: 76px;
background-color: #fff;
border-radius: 50px;
display: flex;
justify-content: center;
align-items: center;
&:hover{
outline:2px solid#555;
outline-offset:-2px;
}
`;


interface btn {
    BackHistory?:boolean;
    Home?:boolean;
    FastFoward?:boolean;
    FastFowardFunc?:any;
    FastFowardText?:number;
    Refresh?:boolean;
    RefreshFunc?:any;
    LogOut?:boolean;
    Revival?:boolean;
    RevivalDispatch?:() => { type: "modalState/MODAL_SUCCESS" } ;
}

const BtnMenu = ({BackHistory,Home,FastFoward,FastFowardFunc,FastFowardText,Refresh,LogOut,RefreshFunc,Revival,RevivalDispatch}:btn) => {
    return(
    <BtnWrap>
    {BackHistory && <BackHistoryBtn></BackHistoryBtn>} 
    {Home &&<HomeBtn></HomeBtn>}
    {Refresh && <RefreshBtn func={RefreshFunc}></RefreshBtn>}    
    {FastFoward && <FastFowardBtn func={FastFowardFunc} text={FastFowardText}></FastFowardBtn>}
    {LogOut && <LogOutBtn></LogOutBtn>}    
    {Revival && <RevivalBtn OnClick={RevivalDispatch}></RevivalBtn>}    
    </BtnWrap>
    )
}
export default React.memo (BtnMenu)