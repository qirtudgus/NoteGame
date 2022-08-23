import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { CREATE_MONSTER_REQUEST, CREATE_MONSTER_SUCCESS } from '../modules/createMonster';
import createRandomNum from '../util/createRandomNum';

const createMonsterRequest = async (dungeonFloor: number) => {
  let floor = dungeonFloor;
  let monsterInfo = {};
  //   //레벨과 경험치 난수 미리 생성
  let ran = createRandomNum(0, 2);

  //   //몬스터 레벨 생성 공식 OK
  const createLevel = (floor: number, randomNum: number) => {
    return Math.ceil(floor + (floor * randomNum) / 10);
  };
  let monsterLevel = createLevel(floor, ran);
  const createHp = (floor: number) => {
    return Math.ceil(floor * (520 + floor * createRandomNum(5, 8)));
  };
  let monsterFullHp = createHp(floor);

  const createExp = (floor: number, hp: number) => {
    return Math.ceil(floor + hp / 200);
  };
  let monsterExp = createExp(floor, monsterFullHp);
  const createDamage = (floor: number) => {
    return Math.ceil(floor + floor * createRandomNum(5, 9));
  };
  let monsterDamage = createDamage(floor);
  const createGold = (floor: number) => {
    return Math.ceil(floor + floor * createRandomNum(5, 9));
  };
  let monsterGold = createGold(floor);

  monsterInfo = {
    monsterLevel,
    monsterFullHp,
    monsterExp,
    monsterDamage,
    monsterGold,
  };
  return monsterInfo;
};

function* createMonsterRequest$(action: any): Generator<any, any, any> {
  try {
    let result = yield call(createMonsterRequest, action.dungeonFloor);
    yield put({ type: CREATE_MONSTER_SUCCESS, monsterInfo: result });
  } catch (E) {
    console.log(E);
  }
}

function* getMonsterCreateRequest() {
  yield takeLatest(CREATE_MONSTER_REQUEST, createMonsterRequest$);
}

export default function* getMonsterCreateSaga() {
  yield all([fork(getMonsterCreateRequest)]);
}
