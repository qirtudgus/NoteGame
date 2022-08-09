import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { DUNGEON_REQUEST, DUNGEON_VICTORY } from '../modules/login';
import customAxios from '../util/axios';

const dungeonVictoryRequest = async (monsterGold: number, monsterExp: number, before?:boolean) => {
  console.log(before)
  return await customAxios('post', '/dungeon/victory', {
    monsterGold,
    monsterExp,
    before,
  }).then((res) => {
    return res.data;
  });
};

function* dungeonVictoryRequest$(action: any): Generator<any, any, any> {
  try {
    let result;
    console.log(action)
    result = yield call(
        dungeonVictoryRequest,
      action.payload.monsterGold,
      action.payload.monsterExp,
      action.payload.before
    );
    console.log(result)
    yield put({ type: DUNGEON_VICTORY, userInfo: result.userInfo });
  } catch (E) {
    console.log(E);
  }
}

function* getDungeonVictoryRequest() {
  yield takeLatest(DUNGEON_REQUEST, dungeonVictoryRequest$);
}

export default function* getDungeonVictorySaga() {
  yield all([fork(getDungeonVictoryRequest)]);
}
