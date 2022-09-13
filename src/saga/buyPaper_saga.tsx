import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import {
  BUY_PAPER_REQUEST,
  BUY_PAPER_SUCCESS,
  UPDATE_PAPER_REQUEST,
  UPDATE_PAPER_SUCCESS,
} from '../modules/buyPaperList';
import { DB_REFRESH_SUCCESS, LOGIN_FAILURE } from '../modules/login';
import customAxios from '../util/axios';

const buyPaperRequestApi = async (paperName: string, Gold: number) => {
  return await customAxios('post', '/shop/buypaper', { paperName, Gold }).then((res) => {
    return res.data;
  });
};

const updatePaperListApi = async (): Promise<boolean> => {
  return await customAxios('post', '/shop/updatepaper').then((res) => {
    return res.data;
  });
};

function* buyPaperRequestApi$(action: { type: string; paperName: string; Gold: number }): Generator<any, any, any> {
  try {
    const result = yield call(buyPaperRequestApi, action.paperName, action.Gold);
    const resultList = yield call(updatePaperListApi);

    yield put({ type: BUY_PAPER_SUCCESS, buyPaperList: result.buyPaperList });
    yield put({ type: UPDATE_PAPER_SUCCESS, buyPaperList: resultList.buyPaperList });
    yield put({ type: DB_REFRESH_SUCCESS, userInfo: result.userInfo });
  } catch (E: any) {
    console.log(E);
    if (E.response.data.code === 405) yield put({ type: LOGIN_FAILURE });
  }
}

function* updatePaperListApi$(): Generator<any, any, { updatePaperList: string[]; buyPaperList: string[] }> {
  try {
    const result = yield call(updatePaperListApi);

    yield put({
      type: UPDATE_PAPER_SUCCESS,
      buyPaperList: result.updatePaperList,
    });
  } catch (E: any) {
    console.log(E);
    if (E.response.data.code === 405) yield put({ type: LOGIN_FAILURE });
  }
}

function* getBuyPaperRequestApi() {
  yield takeLatest(BUY_PAPER_REQUEST, buyPaperRequestApi$);
}
function* getUpDatePaperRequestApi() {
  yield takeLatest(UPDATE_PAPER_REQUEST, updatePaperListApi$);
}

export default function* getBuyPaperRequestApiSaga() {
  yield all([fork(getBuyPaperRequestApi), fork(getUpDatePaperRequestApi)]);
}
