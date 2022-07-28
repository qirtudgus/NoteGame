import styled,{keyframes,css} from "styled-components";
import BackHistoryBtn from "../components/BackHistoryBtn";
import UserInfo from "../components/userInfo";
import { useEffect, useRef, useState } from "react";
import BasicButtons from "../components/BasicBtn";
import { pengame_request } from "../modules/login";
import { useDispatch } from "react-redux";


interface penAni {
    penStatus? :any;
    ref?:any;
}
const animation = keyframes`
  0% {
    transform:translate(-20em);
  }
50%{
  transform:translate(20em);  }
  100%{
    transform:translate(-20em);
  }
`;

const PenWrap = styled.div<penAni>`
position:relative;
bottom:-205px;
z-index:2;
animation-fill-mode: forwards;
animation:${animation} 2s ease-in-out infinite; //1초동안 선형 무한 속성값주기
animation-play-state:running;
${(props) =>
    props.penStatus &&
    css`
    animation-play-state:paused;
    `
 }
 &:focus{
 }


`

const Pen = styled.div`
width:40px;
height:330px;
background:#fff;

`
const PenEnd = styled.div<penAni>`
border-radius:40px 40px 0 0;
width:2px;
height:40px;
background:#000;
position:relative;
left:18px;
margin:none;
`

const PenHead = styled.div`
border-radius:40px 40px 0 0;
width:40px;
height:60px;
background:#000;
`
const BoxWrap = styled.div`
position:absolute;
display:flex;
`

const Box = styled.div`
width:80px;
height:300px;
background:#fff;
border:1px solid#000;
position:relative;
`

document.addEventListener('click', logKey);

function logKey(e:any) {
  console.log( `
    Screen X/Y: ${e.screenX}, ${e.screenY}
    Client X/Y: ${e.clientX}, ${e.clientY}`)
}


const PlayPenGame = () => {

 const [penStatus,setPenSatus] = useState<boolean>(true)
 const inputRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
 const dispatch = useDispatch()
 
 var evt = document.createEvent("MouseEvents");
 evt.initMouseEvent("click", true, true, window, 0,0,0,0,0,false, false, false, false,0, null);
	/* 특정 좌표에 위치한 객체 강제로 클릭 이벤트 발생 수행 */

    function dropClick(x:number,y:number):any {
        // console.log("[dropClick] : [start]");
        // console.log("[X 좌표] : " + x);
        // console.log("[Y 좌표] : " + y);
        // console.log("");

        var cb:any = document.elementFromPoint(x, y);
        console.log(cb)
        cb.dispatchEvent(evt);
    };	    	

 const toggle = () => {
    setPenSatus((penStatus)=> !penStatus)
    console.log(inputRef.current.getBoundingClientRect())
    const x = inputRef.current.getBoundingClientRect().x
    const y = inputRef.current.getBoundingClientRect().y
    // console.log(x)
    // console.log(y)
 }

 const toggleExit = () => {
    setPenSatus((penStatus)=> !penStatus)
    console.log(inputRef.current.getBoundingClientRect())
    inputRef.current.getClientRects()
    const x = inputRef.current.getBoundingClientRect().x
    //y값을 그대로 적용하면 PenEnd 엘레먼트가 반환되기때문에 Box요소에 들어갈 수 있도록 약간 조정합니다.
    const y = inputRef.current.getBoundingClientRect().y - 100
    console.log(x);
    // console.log(y);

    if( 838 <= x && x <= 917 ){
      console.log("x안에 들어옴")
      dispatch(pengame_request(2))
    }
    
    if( 920 <= x && x <= 1000 ){
      console.log("x안에 들어옴")
      dispatch(pengame_request(10))
    }
    if( 1001 <= x && x <= 1082 ){
      console.log("x안에 들어옴")
      dispatch(pengame_request(20))
    }


    // dropClick(x,y)
 }

 

    return(
<>
{penStatus ? 
<BasicButtons ButtonText="스타트" color="#aaa" OnClick={toggle} ></BasicButtons>
:
<BasicButtons ButtonText="종료" color="#aaa" OnClick={toggleExit} ></BasicButtons>
}




<BackHistoryBtn corner></BackHistoryBtn>
<PenWrap penStatus={penStatus}>
<PenEnd ref={inputRef}></PenEnd>
<PenHead></PenHead>
<Pen></Pen>
</PenWrap>
<BoxWrap>
<Box
//  onClick={()=> {
//     dispatch(pengame_request(2))
// }
// }
></Box>
<Box ></Box>
<Box ></Box>
</BoxWrap>

<UserInfo><></></UserInfo>
</>
    )
}

export default PlayPenGame;