import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { DUNGEON_REQUEST, DUNGEON_VICTORY, LOGIN_FAILURE, REVIVAL_REQUSET, REVIVAL_SUCCESS } from '../modules/login';
import { MODAL_FAILURE } from '../modules/modalState';
import customAxios from '../util/axios';
import { error_saga } from '../util/error_saga';

const revivalRequest = async () => {
  return await customAxios('post', '/dungeon/revival').then((res) => {
    return res.data;
  });
};
function* revivalRequest$(): Generator<any, any, any> {
  try {
    let result = yield call(revivalRequest);
    yield put({ type: REVIVAL_SUCCESS, userInfo: result.userInfo });
    yield put({ type: MODAL_FAILURE });
  } catch (E: any) {
    console.log(E);
    yield error_saga(E);
  }
}

function* getRevivalRequest() {
  yield takeLatest(REVIVAL_REQUSET, revivalRequest$);
}

const dungeonVictoryRequest = async (
  monsterGold: number,
  monsterExp: number,
  UpGoldHunt: number,
  userExp: number,
  userLevel: number,
  floorInput?: number,
) => {
  return await customAxios('post', '/dungeon/victory', {
    monsterGold,
    monsterExp,
    UpGoldHunt,
    userExp,
    userLevel,
    floorInput,
  }).then((res) => {
    return res.data;
  });
};

function* dungeonVictoryRequest$(action: any): Generator<any, any, any> {
  try {
    let result;
    result = yield call(
      dungeonVictoryRequest,
      action.payload.monsterGold,
      action.payload.monsterExp,
      action.payload.UpGoldHunt,
      action.payload.userExp,
      action.payload.userLevel,
      action.payload.before,
    );
    yield put({ type: DUNGEON_VICTORY, userInfo: result.userInfo });
  } catch (E: any) {
    console.log(E);
    yield error_saga(E);
  }
}

function* getDungeonVictoryRequest() {
  yield takeLatest(DUNGEON_REQUEST, dungeonVictoryRequest$);
}

export default function* getDungeonVictorySaga() {
  yield all([fork(getDungeonVictoryRequest), fork(getRevivalRequest)]);
}
