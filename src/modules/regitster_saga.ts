import {takeLatest,put,call, fork,all, take} from 'redux-saga/effects'
import { REGISTER ,REGISTER_SUCCESS} from "../modules/register";
import axios from 'axios';


const registerApi = async (id:string, password :string):Promise<any> => {
    return await axios.post("http://localhost:1234/register",{id,password})
    .then(res => {
        //서버에서 받아온 number 값을 return
        console.log(res.data.num) // 200
        return res.data.num 
    })
} 

function* registerApi$(action:any):any {
    try {
      const memos = yield call(registerApi, action.id, action.password);
      console.log(memos)
      yield put({ type: REGISTER_SUCCESS, payload: memos })
    } catch (err) {
      // 실패 로직: 나중에 작성할 것임
    }
  }

function* getRegisterApi(){
    yield takeLatest(REGISTER,registerApi$)
}

export default function* getRegisterApiSaga(){
    yield all([fork(getRegisterApi)])
}
