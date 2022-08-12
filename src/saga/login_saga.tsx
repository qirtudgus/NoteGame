// //https://velog.io/@kler/TIL4-%EB%A1%9C%EC%BB%AC%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%84%B8%EC%85%98%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%BF%A0%ED%82%A4-%EC%A0%95%EB%A6%AC
// 0. 로그인 상태객체 생성 {loginSuccess:false, payload : {jwt:21332sdsa,userId:1234}}

// 1.클라이언트에서 id와 pw를 작성 후 로그인

// 1. id pw를 payload로 액션을 디스패치

// 1. 리덕스사가에서 서버에게 id와 pw를 보내는 api통신 함수 호출

// 2.서버에서는 id로 db를 조회해서 db에 들어있는 salt값과 hashPassword를 획득

// 3.서버에서 pw를 db의 salt값으로 다시 hash한 뒤 기존 hashPassword와 비교

// 3번 비교 후 동일 시 (로그인 성공 시 )

// 4.id값을 payload에 담은 jwt토큰 생성

// 5.생성한 토큰을 클라이언트에게 응답

// 6.리덕스사가에서 토큰을 payload로 상태값에 전송하고

// 7.클라이언트에서 상태값을 조회하여 토큰을 로컬스토리지에 저장

// 8.api통신 시 토큰을 담아보내어 해당 유저의 db 조회 및 데이터 획득

import {
  takeLatest,
  fork,
  all,
  put,
  call,
  take,
  delay,
} from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOCALSTORAGE,
  LOGIN_LOCALSTORAGE_SUCCESS,
  LOGIN_LOCALSTORAGE_FAILURE,
  LOGOUT_REQUSET,
} from '../modules/login';
import customAxios from '../util/axios';
import axios from 'axios';
import { BUY_BALLPEN_SUCCESS } from '../modules/buyBallpenList';

const buyBallPenListApi = async (ballPenName?: string): Promise<boolean> => {
  return customAxios('post', '/shop/buyballpen', { ballPenName }).then(
    (res) => {
      return res.data;
    },
  );
};

const loginApi = async (id: string, password: string): Promise<any> => {
  return await customAxios('post', '/login/', { id, password })
    .then((res) => {
      //로그인 코드가 성공일 시 스토리지에 저장하고 axios 헤더에 담는다
      if (res.data.code === 200) {
        localStorage.setItem('token', res.data.token);

        axios.defaults.headers.common['Authorization'] = res.data.token;
      }
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

function* loginApi$(action: any): Generator<any, any, any> {
  try {
    const result = yield call(
      loginApi,
      action.payload.id,
      action.payload.password,
    );
    if (result.code === 200)
      yield put({
        type: LOGIN_SUCCESS,
        token: result.token,
        id: result.id,
        userInfo: result.userInfo,
      });
    if (result.code === 201)
      yield put({ type: LOGIN_SUCCESS, token: result.token, id: result.id });
    if (result.code === 404) yield alert(result.message);
    if (result.code === 405) yield alert(result.message);
  } catch (err) {
    console.log(err);
  }
}

const loginLocalStorage = async (token: any): Promise<any> => {
  return await customAxios('post', '/login/localstorage', { token }).then(
    (res) => {
      axios.defaults.headers.common['Authorization'] = res.data.token;
      // if(res.data.code === 200){
      //     console.log("200이군")
      //     axios.defaults.headers.common[
      //         'Authorization'
      //       ] = `Bearer ${res.data.token}`; //앞으로 api통신에 토큰이 들어가있음
      // }
      return res.data;
    },
  );
};

function* loginLocalStorage$(action: any): Generator<any, any, any> {
  try {
    const result = yield call(loginLocalStorage, action.token);
    //DB의 볼펜리스트를 가져와 업데이트합니다.
    const penList = yield call(buyBallPenListApi, 'init');
    if (result.code === 200) {
      yield put({
        type: LOGIN_LOCALSTORAGE_SUCCESS,
        token: result.token,
        id: result.id.userId,
        userInfo: result.userInfo,
      });
      //토큰응답이 정상이면 볼펜리스트를 가져옵니다.
      yield put({ type: BUY_BALLPEN_SUCCESS, buyBallpenList: penList });
    }
    if (result.code === 201)
      yield put({
        type: LOGIN_LOCALSTORAGE_FAILURE,
        token: result.token,
        id: result.id.userId,
        userInfo: result.userInfo,
      });
  } catch (e) {
    yield put({ type: LOGIN_LOCALSTORAGE_FAILURE });
    console.log(e);
  }
}

function logout() {
  window.location.replace('/');
  localStorage.removeItem('token');
}

function* getLogout() {
  yield takeLatest(LOGOUT_REQUSET, logout);
}

function* getLoginLocalStorage() {
  yield takeLatest(LOGIN_LOCALSTORAGE, loginLocalStorage$);
}

function* getLoginApi() {
  yield takeLatest(LOGIN_REQUEST, loginApi$);
}

export default function* getLoginApiSage() {
  yield all([fork(getLoginApi), fork(getLoginLocalStorage), fork(getLogout)]);
}
