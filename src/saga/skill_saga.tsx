import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { SKILL_REQUEST, SKILL_UP } from '../modules/login';
import customAxios from '../util/axios';
import { error_saga } from '../util/error_saga';

const skillUpRequest = async (skillName: string, skillPoint: number) => {
  return await customAxios('post', '/skill/skillup', {
    skillName,
    skillPoint,
  }).then((res) => {
    return res.data;
  });
};

function* skillUpRequest$(action: any): Generator<any, any, any> {
  try {
    let result = yield call(skillUpRequest, action.payload.skillName, action.payload.skillPoint);

    yield put({ type: SKILL_UP, userInfo: result.userInfo });
  } catch (E: any) {
    console.log(E);
    yield error_saga(E);
  }
}

function* getSkillUpRequest() {
  yield takeLatest(SKILL_REQUEST, skillUpRequest$);
}

export default function* getSkillUpRequestSaga() {
  yield all([fork(getSkillUpRequest)]);
}
