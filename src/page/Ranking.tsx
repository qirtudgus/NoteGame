import React, { useEffect, useState } from "react"
import BtnMenu from "../components/BtnMenu"
import customAxios from "../util/axios"
import styled from "styled-components"

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
    userList?:any
}

const RankingTab = styled.div<a>`
width:50%;
height:50px;
background:#555;
display:flex;
justify-content:center;
align-items:center;
`

const RankingMenuWrap = styled.div`
width:100%;
display:flex;
`

const RankingMenu = styled.div`
width:25%;
font-size:30px;
height:20px;
`

const UserList = styled.li`
width:100px;
`

const RangkingPage = styled.div`
width:100%;
height:100%;
`

const RankingTable = styled.table`
width:100%;
height:100%;
`
const RankingList  = styled.tr`
width:100%;
height:50px;
`

const Ranking = () => {
    const [list,setList] = useState<[]>([]);

    const call = async ():Promise<void> => {
      let a =   await customAxios('post','/ranking/allranking',{}).then(res => {
            console.log(res.data)
            return res.data
        })
        setList(() => a)
    }
    useEffect(()=>{
        call()
        console.log(list)

    },[])

    return(<>
    <BtnMenu BackHistory></BtnMenu>
    <button onClick={()=>{

       call()
       console.log(list)

    }}>랭킹확인</button>
    <RankingWrap>
    <RankingTabWrap>
    <RankingTab>전체 순위
    </RankingTab>
    <RankingTab>나의 순위</RankingTab>
    </RankingTabWrap>
    <RangkingPage>
    <RankingTable>
    <>
    <RankingList >
            <th>순위</th>
            <th>닉네임</th>
            <th>레벨</th>
            <th>최고층</th>
</RankingList>
        {list!.map((i :any,index:any) => (
<RankingList key={i.ID}>
            <th>{index + 1}</th>
            <th>{i.ID}</th>
            <th>{i.DungeonFloor}</th>
            <th>{i.Level}</th>
</RankingList>

        ))}
        </>
    </RankingTable>

    </RangkingPage>
    </RankingWrap>
    </>)
}


export default React.memo (Ranking)