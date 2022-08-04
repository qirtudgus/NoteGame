import { fork, all } from 'redux-saga/effects';
import getConfirmIdApiSaga from './confirmId_saga';
import getLoginApiSage from './login_saga';
import getRegisterApiSaga from './regitster_saga';
import getPenGameTakeGoldSaga from './pengame_saga';
import getSkillUpRequestSaga from './skill_saga';
function* rootSaga() {
  yield all([
    fork(getRegisterApiSaga),
    fork(getConfirmIdApiSaga),
    fork(getLoginApiSage),
    fork(getPenGameTakeGoldSaga),
    fork(getSkillUpRequestSaga),
  ]);
}

export default rootSaga;
