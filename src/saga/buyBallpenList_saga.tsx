import { takeLatest, put, call, fork, all, take } from 'redux-saga/effects';
import {
  BUY_BALLPEN_REQUEST,
  BUY_BALLPEN_SUCCESS,
} from '../modules/buyBallpenList';
import { customAxios } from '../util/axios';

const buyBallPenListApi = async (ballPenName?: string): Promise<boolean> => {
  return customAxios('post', '/shop/buyballpen', { ballPenName }).then(
    (res) => {
      return res.data;
    },
  );
};

function* buyBallPenListApi$(action: any): Generator<any> {
  try {
    console.log(action);
    const result = yield call(buyBallPenListApi, action.ballpenName);
    console.log(result);
    yield put({ type: BUY_BALLPEN_SUCCESS, buyBallpenList: result });
  } catch (err) {
    console.log(err);
  }
}

function* getBuyBallPenListApi() {
  yield takeLatest(BUY_BALLPEN_REQUEST, buyBallPenListApi$);
}

export default function* getBuyBallPenListSaga() {
  yield all([fork(getBuyBallPenListApi)]);
}
