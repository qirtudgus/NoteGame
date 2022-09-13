import { put } from 'redux-saga/effects';
import { LOGIN_FAILURE } from '../modules/login';

type errorCode = 400;

export const error_saga = (errorCode: errorCode) => {
  switch (errorCode) {
    //토큰 만료시 400
    case 400:
      return put({ type: LOGIN_FAILURE });
  }
};
