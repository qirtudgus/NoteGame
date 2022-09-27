import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { EQUIP_BALLPEN_REQUEST, EQUIP_BALLPEN_SUCCESS } from '../modules/login';
import { customAxios } from '../util/axios';
import { error_saga } from '../util/error_saga';

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
    yield error_saga(E);
  }
}

function* getEquipBallpenApi() {
  yield takeLatest(EQUIP_BALLPEN_REQUEST, equipBallpenApi$);
}

export default function* getEquipBallpenSaga() {
  yield all([fork(getEquipBallpenApi)]);
}
