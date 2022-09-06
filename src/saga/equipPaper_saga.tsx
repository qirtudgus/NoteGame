import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { EQUIP_PAPER_REQUEST, EQUIP_PAPER_SUCCESS } from '../modules/login';
import { customAxios } from '../util/axios';

const equipPaperApi = async (paperName: string, Hp: number): Promise<boolean> => {
  return customAxios('post', '/shop/equippaper', { paperName, Hp }).then((res) => {
    return res.data;
  });
};

function* equipPaperApi$(action: any): Generator<any, any, any> {
  try {
    console.log(action);
    const resultUserInfo = yield call(equipPaperApi, action.paperName, action.WeaponHp);
    yield put({ type: EQUIP_PAPER_SUCCESS, userInfo: resultUserInfo.userInfo });
  } catch (err) {
    console.log(err);
  }
}

function* getEquipPaperApi() {
  yield takeLatest(EQUIP_PAPER_REQUEST, equipPaperApi$);
}

export default function* getEquipPaperSaga() {
  yield all([fork(getEquipPaperApi)]);
}
