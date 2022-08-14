import { takeLatest, put, call, fork, all, take } from 'redux-saga/effects';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../modules/register';
import { customAxios } from '../util/axios';
//리덕스 사가 참고 페이지
//https://kyounghwan01.github.io/blog/React/redux/redux-saga/#react%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A5-saga-%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5
//https://jeonghwan-kim.github.io/dev/2019/07/22/react-saga-ts-1.html

// id와 password를 인자로 받아 서버통신을 요청하는 함수
const registerApi = async (id: string, password: string): Promise<any> => {
  return customAxios('post', '/register/join', { id, password })
    .then((res) => {
      console.log(res.data);

      return res.data;
    })
    .catch((err) => console.log(err));

  // return await axios.post("http://localhost:1234/register/join",{id,password})
  // .then(res => {
  //     //서버에서 받아온 number 값을 return
  //     console.log(res.data) // 200
  //     return res.data
  // })
};

// 리덕스 사가를 통해 감지할 액션이 감지되었을 때 실행할 함수
// 인자값에 dispatch할 때 보낸 payload가 담겨있다.
// 이를 통해 registerApi함수와 뒤에 인자로 이어서 action.payload.id 를 담아서 실행할 수 있었다.
function* registerApi$(action: any): Generator<any, any, any> {
  try {
    console.log(action);
    //api통신의 결과값이 들어있는 변수다.
    const memos = yield call(
      registerApi,
      action.payload.id,
      action.payload.password,
    );
    console.log(memos); // api 결과값이 정상적으로 들어있음
    //put은 dispatch를 해주는 기능이다.
    //REGISTER액션을 감지하여 REGISTER_SUCCESS 액션까지 디스패치할 수 있는 것이다.
    if (memos.code === 404)
      yield put({ type: REGISTER_FAILURE, payload: memos });
    if (memos.code === 200)
      yield put({ type: REGISTER_SUCCESS, payload: memos });
  } catch (err) {
    console.log(err);
  }
}

function* getRegisterApi() {
  yield takeLatest(REGISTER, registerApi$);
}

export default function* getRegisterApiSaga() {
  yield all([fork(getRegisterApi)]);
}
