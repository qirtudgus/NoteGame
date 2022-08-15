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
    Refresh?:boolean;
    LogOut?:boolean;
}

const BtnMenu = ({BackHistory,Home,FastFoward,Refresh,LogOut}:btn) => {
    return(
    <BtnWrap>
    {BackHistory && <BackHistoryBtn></BackHistoryBtn>} 
    {Home &&<HomeBtn></HomeBtn>}
    {FastFoward && <FastFowardBtn></FastFowardBtn>}
    {Refresh && <RefreshBtn></RefreshBtn>}    
    {LogOut && <LogOutBtn></LogOutBtn>}    
    </BtnWrap>
    )
}
export default BtnMenu