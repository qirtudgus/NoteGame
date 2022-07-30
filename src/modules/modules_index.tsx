import { combineReducers } from 'redux';
import login from './login';
import register from './register';
import confirmId from './confirmId';
import boxCount from './pengameBoxCount';

const rootReducer = combineReducers({
  login,
  register,
  confirmId,
  boxCount,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
