import axios from "axios";

//액션 타입 선언
export const REGISTER = 'register/register' as const;
export const REGISTER_SUCCESS = 'register/register_success' as const;

//액션 생성 함수
export const register = (id:string, password:string) => ({
    type: REGISTER,
    payload : {id,password}
})
export const register_success = (result:any) => ({
    type: REGISTER_SUCCESS,
    payload : result,
})


type RegisterAction =
  | ReturnType<typeof register>
  | ReturnType<typeof register_success>;

  type IsRegisterState = {
    isRegister : number | Promise<number>;
}

// 초기상태를 선언합니다.
const ResgisterState: IsRegisterState = {
    isRegister : 0
  };


//아이디와 패스워드를 서버에 전송해줄 API 함수 생성
//페이로드의 아이디와 비밀번호를 서버로 전송해준다.
const registerApi = async (id:string, password :string):Promise<number> => {
    return await axios.post("http://localhost:1234/register",{id,password})
    .then(res => {

        //서버에서 받아온 number 값을 return
        console.log(res.data.num) // 11111
        return res.data.num 
    })
} 

const regitserRequest = (
    state : IsRegisterState = ResgisterState,
    action : RegisterAction
):IsRegisterState => {
 switch (action.type){
    case REGISTER:{
        return { isRegister : 1}
    }
    case REGISTER_SUCCESS: {
        return {isRegister : action.payload}
    }
    default:
        return state;
 }

}

export default regitserRequest;