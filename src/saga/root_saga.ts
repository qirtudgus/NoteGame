import {fork,all} from 'redux-saga/effects'
import getConfirmIdApiSaga from './confirmId_saga';
import getLoginApiSage from './login_saga';
import getRegisterApiSaga from './regitster_saga';
import getPenGameTakeGoldSaga from './pengame_saga';
function* rootSaga() {
    yield all([fork(getRegisterApiSaga),fork(getConfirmIdApiSaga),fork(getLoginApiSage),fork(getPenGameTakeGoldSaga)])
  }
  
  export default rootSaga