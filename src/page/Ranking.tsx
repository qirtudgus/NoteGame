import React from "react"
import customAxios from "../util/axios"
const Ranking = () => {
    return(<>
    <button onClick={()=>{
        customAxios('post','/ranking/allranking',{}).then(res => {
            console.log(res.data)
        })
    }}>랭킹확인</button>
    </>)
}


export default React.memo (Ranking)