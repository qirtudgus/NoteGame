import { combineReducers } from 'redux';
import login from './login';
import register from './register';
import confirmId from './confirmId';
import boxCount from './pengameBoxCount';
import monsterInfo from './createMonster';
import buyBallpenList from './buyBallpenList';
import modalState from './modalState';
import visibleState from './visibleState';
import userInfo_visibleRequest from './userInfoVisible';

const rootReducer = combineReducers({
  login,
  register,
  confirmId,
  boxCount,
  monsterInfo,
  buyBallpenList,
  modalState,
  visibleState,
  userInfo_visibleRequest,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
