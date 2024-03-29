import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { STAT_REQUEST, STAT_UP } from '../modules/login';
import customAxios from '../util/axios';
import { error_saga } from '../util/error_saga';

const statUpRequest = async (statName: string, statPoint: number, takePoint: number) => {
  return await customAxios('post', '/stat/statup', {
    statName,
    statPoint,
    takePoint,
  }).then((res) => {
    return res.data;
  });
};

function* statUpRequest$(action: any): Generator<any, any, any> {
  try {
    let result = yield call(statUpRequest, action.payload.statName, action.payload.statPoint, action.payload.takePoint);

    yield put({ type: STAT_UP, userInfo: result.userInfo });
  } catch (E: any) {
    console.log(E);
    yield error_saga(E);
  }
}

function* getStatUpRequest() {
  yield takeLatest(STAT_REQUEST, statUpRequest$);
}

export default function* getStatUpRequestSaga() {
  yield all([fork(getStatUpRequest)]);
}
