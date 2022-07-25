import styled,{css} from "styled-components";
import { useNavigate } from "react-router-dom";

//props 사용을 위해 인터페이스로 타입 명시
//https://blog.devgenius.io/using-styled-components-and-props-with-typescript-react-a3c32a496f47
interface cornerBtn{
    corner:string
}

const Back = styled.div<cornerBtn>`
width:76px;
height:76px;
background-color:#fff;
border-radius:50px;
 ${(props) =>
    props.corner &&
    css`
    position:absolute;
    top:20px;
    left:20px;
    `
 }
`

const BackHistoryBtn = (props:any) => {
    const navigate = useNavigate();


    return(
        <>
        <Back {...props} onClick={()=> {navigate('/home')}}/>
        </>
    )

}

export default BackHistoryBtn;