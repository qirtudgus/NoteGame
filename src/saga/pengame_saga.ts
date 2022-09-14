import { AxiosError } from 'axios';
import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { LOGIN_FAILURE, PENGAME_MULTIPLE, PENGAME_REQUEST } from '../modules/login';
import customAxios from '../util/axios';
import { error_saga } from '../util/error_saga';

const penGameTakeGoldAdd = async (reward: number, speed: number) => {
  return await customAxios('post', '/pengame/add', { reward, speed }).then((res) => {
    return res.data;
  });
};

const penGameTakeGoldDeduct = async (reward: number, speed: number) => {
  return await customAxios('post', '/pengame/deduct', { reward, speed }).then((res) => {
    return res.data;
  });
};

const penGameTakeGoldMultiple = async (reward: number, speed: number) => {
  return await customAxios('post', '/pengame/multiple', { reward, speed }).then((res) => {
    return res.data;
  });
};

function* penGameTakeGold$(action: any): Generator<any, any, any> {
  try {
    console.log(action.reward);
    console.log(action.act);
    let result;
    if (action.act === 'add') {
      result = yield call(penGameTakeGoldAdd, action.reward, action.speed);
    }
    if (action.act === 'deduct') {
      result = yield call(penGameTakeGoldDeduct, action.reward, action.speed);
    }
    if (action.act === 'multiple') {
      result = yield call(penGameTakeGoldMultiple, action.reward, action.speed);
    }
    // const result = yield call(penGameTakeGoldMultiple, action.multiple);
    console.log(result);
    //db값을 받아와 PENGAME_GOLDX2를 put으로 디스패치 userinfo를 업데이트 해주어 상태 업데이트
    if (result.code === 200) {
      yield put({ type: PENGAME_MULTIPLE, userInfo: result.userInfo });
    }
  } catch (E: any) {
    console.log(E);
    yield error_saga(E);
  }
}

function* getPenGameTakeGold() {
  yield takeLatest(PENGAME_REQUEST, penGameTakeGold$);
}

export default function* getPenGameTakeGoldSaga() {
  yield all([fork(getPenGameTakeGold)]);
}
