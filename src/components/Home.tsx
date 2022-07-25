import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../modules/modules_index"
import BackGround from "./BackGround"
import { logout } from "../modules/login"
import BasicBoxs from "./userInfo"

const Home = () => {

    const userId = useSelector((state:RootState) => state.login.id)
    const userInfo= useSelector((state:RootState) => state.login.userInfo)
    const isTokenExPired = useSelector((state:RootState) => state.login.tokenExpired);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const logOutRequest = () => {
        dispatch(logout())
    
      }
    


    return(

        <BackGround>
            {isTokenExPired ? 
                    <div>
               <p>토큰이 만료되었습니다 재로그인해주세요.</p>
               <button onClick={()=>{navigate("/")}} >로그인</button>
               <button onClick={logOutRequest} >로그아웃</button>
                    </div>
            : 
            <>
            <ul>
            <li>볼펜 굴리기</li>
            <li>인벤토리</li>
            <li>던전</li>
            <li>상점</li>
            <li>스킬</li>
    
        </ul>
        <BasicBoxs>
        <p>
        <button onClick={logOutRequest} >로그아웃</button>

            {userId}
            {userInfo?.Level}
            {userInfo?.Gold}
            </p>
        </BasicBoxs>
        </>
    }
       
     </BackGround>

    )
}

export default Home