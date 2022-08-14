import { takeLatest, put, call, fork, all, take } from 'redux-saga/effects';
import { EQUIP_BALLPEN_REQUEST, EQUIP_BALLPEN_SUCCESS } from '../modules/login';
import { customAxios } from '../util/axios';

const equipBallpenApi = async (ballpenName: string, weaponDamage:number): Promise<boolean> => {
  return customAxios('post', '/shop/equip', { ballpenName,weaponDamage }).then((res) => {
    return res.data;
  });
};

function* equipBallpenApi$(action: any): Generator<any, any, any> {
  try {
    const result = yield call(equipBallpenApi, action.ballpenName, action.weaponDamage);
    yield put({ type: EQUIP_BALLPEN_SUCCESS, userInfo: result.userInfo });
  } catch (err) {
    console.log(err);
  }
}

function* getEquipBallpenApi() {
  yield takeLatest(EQUIP_BALLPEN_REQUEST, equipBallpenApi$);
}

export default function* getEquipBallpenSaga() {
  yield all([fork(getEquipBallpenApi)]);
}
