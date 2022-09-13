import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { EQUIP_BALLPEN_REQUEST, EQUIP_BALLPEN_SUCCESS, LOGIN_FAILURE } from '../modules/login';
import { customAxios } from '../util/axios';

const equipBallpenApi = async (ballpenName: string, weaponDamage: number, PenSpeed: {}): Promise<boolean> => {
  return customAxios('post', '/shop/equip', { ballpenName, weaponDamage, PenSpeed }).then((res) => {
    return res.data;
  });
};

function* equipBallpenApi$(action: any): Generator<any, any, any> {
  try {
    console.log(action);
    const resultUserInfo = yield call(equipBallpenApi, action.ballpenName, action.weaponDamage, action.PenSpeed);
    yield put({ type: EQUIP_BALLPEN_SUCCESS, userInfo: resultUserInfo.userInfo });
  } catch (E: any) {
    console.log(E);
    if (E.response.data.code === 405) yield put({ type: LOGIN_FAILURE });
  }
}

function* getEquipBallpenApi() {
  yield takeLatest(EQUIP_BALLPEN_REQUEST, equipBallpenApi$);
}

export default function* getEquipBallpenSaga() {
  yield all([fork(getEquipBallpenApi)]);
}
