import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './page/Register';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules/modules_index';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './saga/root_saga';
import Notfound from './page/Notfound';
import Home from './page/Home';
import { login_localstorage } from './modules/login';
import ChoicePenCount from './page/ChoicePenCount';
import Layout from './layout/layout';
import PlayPenGame from './page/PlayPenGame';
import Skill from './page/Skill';
import Dungeon from './page/Dungeon';
import DungeonFight from './page/DungeonFight';
import BallpenShop from './page/BallpenShop';
import DungeonFightBefore from './page/DungeonFightBefore';
// import DungeonFightBefore from './page/DungeonFightBefore';
//사가미들웨어 생성
const sagaMiddleware = createSagaMiddleware();
//두번째인자에 사용할 미들웨어를 추가해주었다.
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

//사가미들웨어의 run함수로 rootSaga를 호출
sagaMiddleware.run(rootSaga);

//로그인 유지를 위한 함수, 토큰이 유효할 시 정보를 불러오는 디스패치, 토큰이 없을 시 return
function loadUser() {
  try {
    let user = localStorage.getItem('token');
    if (!user) return;
    console.log(user);
    store.dispatch(login_localstorage(user));
  } catch (e) {
    console.log(e);
  }
}
loadUser();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<App />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/choicepencount' element={<ChoicePenCount />}></Route>
          <Route path='*' element={<Notfound />}></Route>
          <Route path='/playpengame' element={<PlayPenGame />}></Route>
          <Route path='/skill' element={<Skill />}></Route>
          <Route path='/dungeon' element={<Dungeon />}></Route>
          <Route path='/dungeonfight' element={<DungeonFight />}></Route>
          <Route path='/dungeonfightbefore' element={<DungeonFightBefore />}></Route>
          <Route path='/ballpenshop' element={<BallpenShop />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
