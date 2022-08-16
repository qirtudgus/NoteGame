import React, { useEffect, useState } from "react"
import BtnMenu from "../components/BtnMenu"
import customAxios from "../util/axios"
import styled,{css} from "styled-components"

const RankingWrap = styled.div`
 width:800px;
 height:600px;
 display:flex;
 flex-direction: column;
`

const RankingTabWrap = styled.div`
display:flex;
width:100%;
height:auto;
justify-content:center;
`

interface a {
    userList?:any,
    bar?:any,
    active?:boolean,
}

const RankingTab = styled.div<a>`
width:50%;
height:70px;
background:#555;
display:flex;
justify-content:center;
align-items:center;
`

const RangkingPage = styled.div`
width:100%;
height:100%;
min-height:550px;
`

const RankingTable = styled.table`
width:100%;
height:100%;
margin-top:20px;
`
const RankingList  = styled.tr<a>`
width:100%;
height:50px;

${(props) => props.bar && css`
    font-weight:bold;
    font-size:1.3rem;
`}
`

const PageBtn = styled.button<a>`
width:30px;
height:30px;
border:1px solid#555;
${(props) => props.active && css`
border:5px solid#555;

`}

&.active {
    border:5px solid#555;

 }
`


const Ranking = () => {
    //
    const [isNow,setIsNow] = useState(true);
    //리스트에 따른 페이지 갯수
    const [pages,setPages] = useState<number[]>([]);
    //현재 보여줄 10개의 리스트
    const [list,setList] = useState<[]>([]);
    //현재 보여줄 페이지번호
    const [currentPageNum, setCurrentPageNum] = useState<number>(1);
    const call = async (currentPageNum:number):Promise<void> => {
      let payloadObj =   await customAxios('post','/ranking/allranking',{currentPageNum}).then(res => {
            // 10개의 게시글을 불러온다.
            return res.data.payload
        })
        setList(() => payloadObj.data)

        //페이지 정수를 받아와 배열 생성 후 setState해준다.
        //https://hjcode.tistory.com/73
        let pagesNum = Array.from({length: payloadObj.listNum}, (v,i) => i);
        setPages([...pagesNum])

    }
    useEffect(()=>{
        //데이터를 불러온다.
        call(currentPageNum)
    },[])

    //페이지 버튼 클릭 시 데이터 요청
    const requestCall = (e:any) => {
        let requestNumber = e.currentTarget.dataset.pagenum as number
        call(requestNumber)
    }


    return(<>
    <BtnMenu BackHistory></BtnMenu>
    <button onClick={()=>{
       call(currentPageNum)
       console.log(list)
        console.log(pages)
    }}>랭킹확인</button>
    <RankingWrap>
    <RankingTabWrap>
    <RankingTab>전체 순위
    </RankingTab>
    <RankingTab>나의 순위</RankingTab>
    </RankingTabWrap>
    <RangkingPage>
    <RankingTable>
    <RankingList bar >
            <th>순위</th>
            <th>닉네임</th>
            <th>레벨</th>
            <th>최고층</th>
</RankingList>
        {list!.map((i :any,index:any) => (
<RankingList key={i.ID}>
            <th>{index + 1}</th>
            <th>{i.ID}</th>
            <th>{i.Level}</th>
            <th>{i.DungeonFloor}</th>
</RankingList>
        ))}
       
    </RankingTable>
    {pages!.map((i:any, index:any) => (
            <PageBtn data-pagenum={i + 1}  active={currentPageNum === index+1} onClick={(e) =>{requestCall(e); setCurrentPageNum(index+1)}}>{i + 1}</PageBtn>
        ))}
    </RangkingPage>
    </RankingWrap>
    </>)
}


export default React.memo (Ranking)