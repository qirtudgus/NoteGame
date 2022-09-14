import { put } from 'redux-saga/effects';
import { LOGIN_FAILURE } from '../modules/login';

export const error_saga = (errorCode: any) => {
  let code = errorCode.response.data.code;

  switch (code) {
    //토큰 만료시 400
    case 400:
      return put({ type: LOGIN_FAILURE });
  }
};
