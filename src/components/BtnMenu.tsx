import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import BackHistoryBtn from './BackHistoryBtn'
import HomeBtn from "./HomeBtn";
import RefreshBtn from "./RefreshBtn";
import FastFowardBtn from "./FastFowardBtn";
import LogOutBtn from "./LogoutBtn";
const BtnWrap = styled.div`
display:flex;
position:absolute;
left:30px;
top:90px;
& > div {
    margin-right:30px;
}
`
interface btn {
    BackHistory?:boolean;
    Home?:boolean;
    FastFoward?:boolean;
    FastFowardFunc?:any;
    FastFowardText?:number;
    Refresh?:boolean;
    RefreshFunc?:any;
    LogOut?:boolean;

}

const BtnMenu = ({BackHistory,Home,FastFoward,FastFowardFunc,FastFowardText,Refresh,LogOut,RefreshFunc}:btn) => {
    return(
    <BtnWrap>
    {BackHistory && <BackHistoryBtn></BackHistoryBtn>} 
    {Home &&<HomeBtn></HomeBtn>}
    {Refresh && <RefreshBtn func={RefreshFunc}></RefreshBtn>}    
    {FastFoward && <FastFowardBtn func={FastFowardFunc} text={FastFowardText}></FastFowardBtn>}
    {LogOut && <LogOutBtn></LogOutBtn>}    
    </BtnWrap>
    )
}
export default BtnMenu