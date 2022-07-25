import { userInfo } from "os";

//액션 타입 선언
export const LOGIN_REQUEST = 'login/LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'login/LOGIN_FAILURE' as const;
export const LOGIN_LOCALSTORAGE = 'login/LOGIN_LOCALSTORAGE' as const;
export const LOGIN_LOCALSTORAGE_SUCCESS = 'login/LOGIN_LOCALSTORAGE_SUCCESS' as const;
export const LOGIN_LOCALSTORAGE_FAILURE = 'login/LOGIN_LOCALSTORAGE_FAILURE' as const;
export const LOGOUT_REQUSET = 'login/LOGOUT_REQUEST' as const;

export const login_request = (id :string, password :string) => ({
    type: LOGIN_REQUEST,
    payload: {id,password}
})

export const login_succes = (token : string | undefined) => ({
    type: LOGIN_SUCCESS,
    token : {token},
    id : undefined,
    userInfo:{
        Level: 0,
        BasicDamage: 0,
        BasicHp: 0,
        WeaponDamage:0,
        WeaponHp: 0,
        Gold:0,
    }
})

export const login_failure = (token : string | undefined) => ({
    type: LOGIN_FAILURE,
    token : {token},
    id : undefined,
    
})

export const login_localstorage = (token : string | undefined) => ({
    type: LOGIN_LOCALSTORAGE,
    token : {token}
})

export const login_localstorage_success = (token : string | undefined) => ({
    type: LOGIN_LOCALSTORAGE_SUCCESS,
    token : {token},
    id : undefined,
    userInfo:{
        Level: 0,
        BasicDamage: 0,
        BasicHp: 0,
        WeaponDamage:0,
        WeaponHp: 0,
        Gold:0,
    }

})

export const login_localstorage_failure = () => ({
    type: LOGIN_LOCALSTORAGE_FAILURE,
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
  | ReturnType<typeof login_localstorage>
  | ReturnType<typeof login_localstorage_success>
  | ReturnType<typeof login_localstorage_failure>
  | ReturnType<typeof login_failure>
  | ReturnType<typeof logout>;

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
type IsLoginState = {
    isLogin : boolean;
    token : string | undefined | any;
    id? : string | number | undefined;
    tokenExpired? : boolean,
    userInfo?:{
        Level: number,
        BasicDamage: number,
        BasicHp: number,
        WeaponDamage:number,
        WeaponHp: number,
        Gold:number,
    }
}

// 초기상태를 선언합니다.
const LoginState: IsLoginState = {
    isLogin : false,
    token : undefined,
    id : undefined,
    tokenExpired: false,
    userInfo:{
        Level: 0,
        BasicDamage: 0,
        BasicHp: 0,
        WeaponDamage:0,
        WeaponHp: 0,
        Gold:0,
    }
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
        return { isLogin : true,  token : action.token, id : action.id, userInfo: action.userInfo, tokenExpired:false}
    }
    case LOGIN_FAILURE:{
        return { isLogin : false, token:undefined, id : undefined}
    }
    case LOGIN_LOCALSTORAGE_SUCCESS:{
        return { isLogin : true,  token : action.token, id : action.id, userInfo: action.userInfo}
    }
    case LOGIN_LOCALSTORAGE_FAILURE:{
        return { isLogin : false , token : undefined, id : undefined, tokenExpired:true}
    }
    case LOGOUT_REQUSET:{
        return { isLogin : false , token : undefined, id : undefined, tokenExpired:false}
    }
    default:
        return state;
 }

}

export default LoginRequest;