import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { STAT_REQUEST, STAT_UP } from '../modules/login';
import customAxios from '../util/axios';

const statUpRequest = async (statName: string, statPoint: number) => {
  return await customAxios('post', '/stat/statup', {
    statName,
    statPoint,
  }).then((res) => {
    return res.data;
  });
};

function* statUpRequest$(action: any): Generator<any, any, any> {
  try {
    let result = yield call(statUpRequest, action.payload.statName, action.payload.statPoint);

    yield put({ type: STAT_UP, userInfo: result.userInfo });
  } catch (E) {
    console.log(E);
  }
}

function* getStatUpRequest() {
  yield takeLatest(STAT_REQUEST, statUpRequest$);
}

export default function* getStatUpRequestSaga() {
  yield all([fork(getStatUpRequest)]);
}
