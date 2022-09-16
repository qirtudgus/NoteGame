import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import {
  CONFIRM_NICKNAME_REQUEST,
  CONFIRM_NICKNAME_SUCCESS,
  CONFIRM_NICKNAME_FAILURE,
} from '../modules/confirmNickname';
import { customAxios } from '../util/axios';

const confirmNicknameApi = async (nickname: string): Promise<any> => {
  return customAxios('post', '/register/confirmnickname', { nickname }).then((res) => {
    return res.data;
  });
};

function* confirmNicknameApi$(action: any): Generator<any, any, any> {
  try {
    console.log(action);
    const resultBoolean = yield call(confirmNicknameApi, action.nickname);
    console.log(resultBoolean);
    if (resultBoolean.auth === true) {
      yield put({
        type: CONFIRM_NICKNAME_SUCCESS,
        result: resultBoolean.auth,
        text: resultBoolean.text,
      });
    } else {
      yield put({
        type: CONFIRM_NICKNAME_FAILURE,
        result: resultBoolean.auth,
        text: resultBoolean.text,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function* getConfirmNicknameApi() {
  yield takeLatest(CONFIRM_NICKNAME_REQUEST, confirmNicknameApi$);
}

export default function* getConfirmNicknameApiSaga() {
  yield all([fork(getConfirmNicknameApi)]);
}
