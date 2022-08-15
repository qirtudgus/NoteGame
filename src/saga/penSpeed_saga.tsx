import { takeLatest, put, call, fork, all, take } from 'redux-saga/effects';
import { EQUIP_BALLPEN_REQUEST,  } from '../modules/login';
import { UPDATE_PENSPEED_SUCCESS } from '../modules/penSpeed';
import { customAxios } from '../util/axios';


function* penSpeedApi$(action: any): Generator<any, any, any> {
  try {
    console.log(action)
    const result = action.penSpeed
    yield put({ type: UPDATE_PENSPEED_SUCCESS, ballPenSpeed: result });
  } catch (err) {
    console.log(err);
  }
}

function* getPenSpeedApi() {
  yield takeLatest(EQUIP_BALLPEN_REQUEST, penSpeedApi$);
}

export default function* getPenSpeedSaga() {
  yield all([fork(getPenSpeedApi)]);
}
