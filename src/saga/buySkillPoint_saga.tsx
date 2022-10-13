import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { BUY_SKILLPOINT_REQUEST, BUY_SKILLPOINT_SUCCESS } from '../modules/login';
import customAxios from '../util/axios';
import { error_saga } from '../util/error_saga';

const buySkillPointRequestApi = async (BuySkillPointCount: number) => {
  return await customAxios('post', '/shop/buyskillpoint', { BuySkillPointCount }).then((res) => {
    return res.data;
  });
};

function* buySkillPointRequestApi$(action: { type: string; BuySkillPointCount: number }): Generator<any, any, any> {
  console.log(action);

  try {
    const result = yield call(buySkillPointRequestApi, action.BuySkillPointCount);
    console.log(result);
    yield put({ type: BUY_SKILLPOINT_SUCCESS, userInfo: result.userInfo });
  } catch (E: any) {
    console.log(E);
    yield error_saga(E);
  }
}

function* getBuySkillPointRequestApi() {
  yield takeLatest(BUY_SKILLPOINT_REQUEST, buySkillPointRequestApi$);
}

export default function* getBuySkillPointRequestApiSaga() {
  yield all([fork(getBuySkillPointRequestApi)]);
}
