import { takeLatest, fork, put, call } from 'redux-saga/effects';
import {
  MODAL_REQUEST,
  MODAL_SUCCESS,
  MODAL_FAILURE,
} from '../modules/modalState';

function* modalApi(action: any): Generator<any, any, any> {
  yield put({ type: MODAL_SUCCESS });
}
