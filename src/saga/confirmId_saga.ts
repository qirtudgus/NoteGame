import {takeLatest,put,call, fork,all, take} from 'redux-saga/effects'
import { CONFIRM_ID_REQUEST,CONFIRM_ID_SUCCESS,CONFIRM_ID_FAILURE } from '../modules/confirmId'
import axios from 'axios';

const confirmIdApi = async(id :string):Promise<boolean> => {
    return await axios.post("http://localhost:1234/register/confirmid",{id}).then(res => {
        return res.data
    })
}

function* confirmIdApi$(action:any):Generator<any> {
    try{
        console.log(action)
        const resultBoolean = yield call(confirmIdApi, action.id,);
        console.log(resultBoolean)
        if(resultBoolean === true) {
            yield put({type : CONFIRM_ID_SUCCESS, result:resultBoolean}) 
        }
        else {
            yield put({type : CONFIRM_ID_FAILURE, result:resultBoolean}) 
        }
    }catch(err){
        console.log(err)
    }
}

function* getConfirmIdApi(){
    yield takeLatest(CONFIRM_ID_REQUEST,confirmIdApi$)
}

export default function* getConfirmIdApiSaga(){
    yield all([fork(getConfirmIdApi)])
}