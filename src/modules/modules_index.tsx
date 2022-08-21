import { combineReducers } from 'redux';
import login from './login';
import register from './register';
import confirmId from './confirmId';
import boxCount from './pengameBoxCount';
import monsterInfo from './createMonster';
import buyBallpenList from './buyBallpenList';
import modalState from './modalState';

const rootReducer = combineReducers({
  login,
  register,
  confirmId,
  boxCount,
  monsterInfo,
  buyBallpenList,
  modalState,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
