import {fork,all} from 'redux-saga/effects'
import getConfirmIdApiSaga from './confirmId_saga';
import getRegisterApiSaga from './regitster_saga';
function* rootSaga() {
    yield all([fork(getRegisterApiSaga),fork(getConfirmIdApiSaga)])
  }
  
  export default rootSaga