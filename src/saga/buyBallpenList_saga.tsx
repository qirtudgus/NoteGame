import { takeLatest, put, call, fork, all, take } from 'redux-saga/effects';
import {
  UPDATE_BALLPEN_REQUEST,
  UPDATE_BALLPEN_SUCCESS,
  REAL_BUY_BALLPEN_REQUEST,
  REAL_BUY_BALLPEN_SUCCESS,
} from '../modules/buyBallpenList';
import { customAxios } from '../util/axios';

const updateBallPenListApi = async (ballpenName?: string): Promise<boolean> => {
  return await customAxios('post', '/shop/updateballpen', { ballpenName }).then(
    (res) => {
      return res.data;
    },
  );
};

const realBuyBallPenListApi = async (
  ballpenName?: string,
): Promise<boolean> => {
  return await customAxios('post', '/shop/realbuyballpen', {
    ballpenName,
  }).then((res) => {
    return res.data;
  });
};

function* updateBallPenListApi$(action: any): Generator<any, any, any> {
  try {
    console.log(action);
    const result = yield call(updateBallPenListApi, action.ballpenName);
    console.log(result);
    console.log(result.buyBallpenList);
    yield put({
      type: UPDATE_BALLPEN_SUCCESS,
      buyBallpenList: result.buyBallpenList,
    });
  } catch (err) {
    console.log(err);
  }
}

function* realBuyBallPenListApi$(action: any): Generator<any, any, any> {
  try {
    console.log(action);
    const result = yield call(realBuyBallPenListApi, action.ballpenName);
    console.log(result);
    console.log(result.buyBallpenList);
    yield put({
      type: REAL_BUY_BALLPEN_SUCCESS,
      buyBallpenList: result,
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
