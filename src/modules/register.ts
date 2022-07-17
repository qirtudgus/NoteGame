import axios from "axios";

//액션 타입 선언
const REGISTER = 'register/register' as const;

//액션 생성 함수
export const register = (id:string, password:string) => ({
    type: REGISTER,
    payload : {id,password}
})

type RegisterAction =
  | ReturnType<typeof register>;

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
        return res.data.num
    })
} 

const regitserRequest = (
    state : IsRegisterState = ResgisterState,
    action : RegisterAction
):IsRegisterState => {
 switch (action.type){
    case REGISTER:{
        return { isRegister : registerApi(action.payload.id , action.payload.password)}
    }
    default:
        return state;
 }

}

export default regitserRequest;