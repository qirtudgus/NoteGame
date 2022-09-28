import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { ISHELPMODAL_CONFIRM, ISHELPMODAL_SUCCESS } from '../modules/login';
import { customAxios } from '../util/axios';

const isHelpModalApi = async (): Promise<any> => {
  return customAxios('post', '/login/ishelpmodal_confirm', {}).then((res) => {
    return res.data;
  });
};

function* isHelpModalApi$(): Generator<any, any, any> {
  try {
    const result = yield call(isHelpModalApi);
    yield put({
      type: ISHELPMODAL_SUCCESS,
      userInfo: result.userInfo,
    });
  } catch (err) {
    console.log(err);
  }
}

function* getIsHelpModalApi() {
  yield takeLatest(ISHELPMODAL_CONFIRM, isHelpModalApi$);
}

export default function* getIsHelpModalApiSaga() {
  yield all([fork(getIsHelpModalApi)]);
}
