//액션 타입 선언
const REGISTER = 'register/register' as const;
const LOGIN = 'register/login' as const;
const LOGOUT = 'register/logout' as const;

//액션 생성 함수
export const register = (id:string, password:string) => ({
    type: REGISTER,
    payload : {id,password}
})
export const login = () => ({
    type: LOGIN,

})
export const logout = () => ({
    type: LOGOUT
})

// 모든 액션 겍체들에 대한 타입을 준비해줍니다.
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
// 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
type RegisterAction =
  | ReturnType<typeof register>
  | ReturnType<typeof login>
  | ReturnType<typeof logout>;

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
type IsRegister = {
    id : string;
    password : string;
}
type IsLoginState = {
    isLogin : boolean;
}

// 초기상태를 선언합니다.
const ResgisterState: IsRegister = {
    id:'아이디',
    password:'비밀번호',
  };
const LoginState: IsLoginState = {
    isLogin : false
}



const LoginRequest = (
    state : IsLoginState = LoginState,
    action : RegisterAction
):IsLoginState => {
 switch (action.type){
    case LOGIN:{
        return { isLogin : true}
    }
    default:
        return state;
 }

}

export default LoginRequest;