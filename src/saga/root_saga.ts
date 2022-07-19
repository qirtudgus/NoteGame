import {takeLatest,put,call, fork,all} from 'redux-saga/effects'
import getRegisterApiSaga from './regitster_saga';
function* rootSaga() {
    yield all([fork(getRegisterApiSaga)])
  }
  
  export default rootSaga