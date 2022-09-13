import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import {
  UPDATE_BALLPEN_REQUEST,
  UPDATE_BALLPEN_SUCCESS,
  REAL_BUY_BALLPEN_REQUEST,
  REAL_BUY_BALLPEN_SUCCESS,
} from '../modules/buyBallpenList';
import { DB_REFRESH_SUCCESS, LOGIN_FAILURE } from '../modules/login';
import { customAxios } from '../util/axios';

const updateBallPenListApi = async (): Promise<boolean> => {
  return await customAxios('post', '/shop/updateballpen').then((res) => {
    return res.data;
  });
};

const realBuyBallPenListApi = async (ballpenName: string, gold: number): Promise<boolean> => {
  return await customAxios('post', '/shop/realbuyballpen', {
    ballpenName,
    gold,
  }).then((res) => {
    return res.data;
  });
};

function* updateBallPenListApi$(): Generator<any, any, { updateBallpenList: string[]; buyBallpenList: string[] }> {
  try {
    const result = yield call(updateBallPenListApi);
    console.log(result);
    console.log(result.buyBallpenList);
    yield put({
      type: UPDATE_BALLPEN_SUCCESS,
      buyBallpenList: result.updateBallpenList,
    });
  } catch (E: any) {
    console.log(E);
    if (E.response.data.code === 405) yield put({ type: LOGIN_FAILURE });
  }
}

function* realBuyBallPenListApi$(action: {
  type: string;
  ballpenName: string;
  gold: number;
}): Generator<any, any, { buyBallpenList: string[]; userInfo: any }> {
  try {
    console.log(action);
    const result = yield call(realBuyBallPenListApi, action.ballpenName, action.gold);
    const resultList = yield call(updateBallPenListApi);
    console.log(result);
    console.log(resultList);

    yield put({
      type: REAL_BUY_BALLPEN_SUCCESS,
      buyBallpenList: result.buyBallpenList,
    });
    //차감된 골드정보를 업데이트하기 위함
    yield put({ type: DB_REFRESH_SUCCESS, userInfo: result.userInfo });
    // 구매 후 볼펜 업데이트 put
    yield put({
      type: UPDATE_BALLPEN_SUCCESS,
      buyBallpenList: resultList.buyBallpenList,
    });
  } catch (E: any) {
    console.log(E);
    if (E.response.data.code === 405) yield put({ type: LOGIN_FAILURE });
  }
}

function* getUpdateBallPenListApi() {
  yield takeLatest(UPDATE_BALLPEN_REQUEST, updateBallPenListApi$);
}

function* getRealBuyBallPenListApi() {
  yield takeLatest(REAL_BUY_BALLPEN_REQUEST, realBuyBallPenListApi$);
}

export default function* getBuyBallPenListSaga() {
  yield all([fork(getUpdateBallPenListApi), fork(getRealBuyBallPenListApi)]);
}
