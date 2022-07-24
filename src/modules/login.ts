//액션 타입 선언
export const LOGIN_REQUEST = 'login/LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'login/LOGIN_FAILURE' as const;

export const LOGOUT_REQUSET = 'login/LOGOUT_REQUEST' as const;

export const login_request = (id :string, password :string) => ({
    type: LOGIN_REQUEST,
    payload: {id,password}
})

export const login_succes = (token : string | undefined) => ({
    type: LOGIN_SUCCESS,
    token : {token},
    id : undefined,
})

export const login_failure = (token : string | undefined) => ({
    type: LOGIN_FAILURE,
    token : {token},
    id : undefined,
})

export const logout = () => ({
    type: LOGOUT_REQUSET
})

// 모든 액션 겍체들에 대한 타입을 준비해줍니다.
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
// 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
type LoginAction =
  | ReturnType<typeof login_request>
  | ReturnType<typeof login_succes>
  | ReturnType<typeof login_failure>
  | ReturnType<typeof logout>;

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
type IsLoginState = {
    isLogin : boolean;
    token : string | undefined | any;
    id? : string | number | undefined;
}

// 초기상태를 선언합니다.
const LoginState: IsLoginState = {
    isLogin : false,
    token : undefined,
    id : undefined,
}



const LoginRequest = (
    state : IsLoginState = LoginState,
    action : LoginAction
):IsLoginState => {
 switch (action.type){
    // case LOGIN_REQUEST:{
    //     return { isLogin : true, }
    // }
    case LOGIN_SUCCESS:{
        return { isLogin : true,  token : action.token, id : action.id}
    }
    case LOGIN_FAILURE:{
        return { isLogin : false, token:undefined, id : undefined}
    }
    case LOGOUT_REQUSET:{
        return { isLogin : false, token:undefined, id : undefined}
    }
    default:
        return state;
 }

}

export default LoginRequest;