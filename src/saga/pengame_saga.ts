import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { PENGAME_MULTIPLE, PENGAME_REQUEST } from '../modules/login';
import customAxios from '../util/axios';

const penGameTakeGold = async (multiple: number) => {
  return await customAxios('post', '/pengame/multiple', { multiple }).then(
    (res) => {
      return res.data;
    },
  );
};

function* penGameTakeGold$(action: any): Generator<any, any, any> {
  try {
    console.log(action.multiple);
    const result = yield call(penGameTakeGold, action.multiple);
    console.log(result);
    //db값을 받아와 PENGAME_GOLDX2를 put으로 디스패치 userinfo를 업데이트 해주어 상태 업데이트
    if (result.code === 200) {
      yield put({ type: PENGAME_MULTIPLE, userInfo: result.userInfo });
    }
  } catch (E) {
    console.log(E);
  }
}

function* getPenGameTakeGold() {
  yield takeLatest(PENGAME_REQUEST, penGameTakeGold$);
}

export default function* getPenGameTakeGoldSaga() {
  yield all([fork(getPenGameTakeGold)]);
}
