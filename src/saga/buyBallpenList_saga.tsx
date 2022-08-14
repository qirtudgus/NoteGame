import { takeLatest, put, call, fork, all, take } from 'redux-saga/effects';
import {
  UPDATE_BALLPEN_REQUEST,
  UPDATE_BALLPEN_SUCCESS,
  REAL_BUY_BALLPEN_REQUEST,
  REAL_BUY_BALLPEN_SUCCESS,
} from '../modules/buyBallpenList';
import { DB_REFRESH_SUCCESS } from '../modules/login';
import { customAxios } from '../util/axios';

const updateBallPenListApi = async (): Promise<boolean> => {
  return await customAxios('post', '/shop/updateballpen').then((res) => {
    return res.data;
  });
};

const realBuyBallPenListApi = async (
  ballpenName: string,
  gold: number,
): Promise<boolean> => {
  return await customAxios('post', '/shop/realbuyballpen', {
    ballpenName,
    gold,
  }).then((res) => {
    return res.data;
  });
};

function* updateBallPenListApi$(action: any): Generator<any, any, any> {
  try {
    console.log(action);
    const result = yield call(updateBallPenListApi);
    console.log(result);
    console.log(result.buyBallpenList);
    yield put({
      type: UPDATE_BALLPEN_SUCCESS,
      buyBallpenList: result.updateBallpenList,
    });
  } catch (err) {
    console.log(err);
  }
}

function* realBuyBallPenListApi$(action: any): Generator<any, any, any> {
  try {
    console.log(action);
    const result = yield call(
      realBuyBallPenListApi,
      action.ballpenName,
      action.gold,
    );
    const resultList = yield call(updateBallPenListApi);
    console.log(resultList)
    console.log(result);
    console.log(result.buyBallpenList);
    yield put({
      type: REAL_BUY_BALLPEN_SUCCESS,
      buyBallpenList: result.buyBallpenList,
    });
    //차감된 골드정보를 업데이트하기 위함
    yield put({ type: DB_REFRESH_SUCCESS, userInfo: result.userInfo });
    // 구매 후 볼펜 업데이트 put
    yield put({
      type: UPDATE_BALLPEN_SUCCESS,
      buyBallpenList: resultList,
    });
  } catch (err) {
    console.log(err);
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
