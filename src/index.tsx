import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules/modules_index';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './saga/root_saga';
import Notfound from './page/Notfound';
import Home from './page/Home';
import { login_localstorage } from './modules/login';
import Layout from './layout/layout';
import Dungeon from './page/Dungeon';
import LayoutNotInfo from './layout/layoutNotInfo';
import axios from 'axios';
import MyStatus from './page/MyStatus';
import Shop from './page/Shop';
import NewDungeonFight from './page/NewDungeonFight';
import NewPenGame from './page/NewPenGame';
import NewRegister from './page/NewRegister';
import NewRanking from './page/NewRanking';
import MonsterCollection from './page/MonsterCollection';
//사가미들웨어 생성
const sagaMiddleware = createSagaMiddleware();
//두번째인자에 사용할 미들웨어를 추가해주었다.
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

//사가미들웨어의 run함수로 rootSaga를 호출
sagaMiddleware.run(rootSaga);

//로그인 유지를 위한 함수, 토큰이 유효할 시 정보를 불러오는 디스패치, 토큰이 없을 시 return
function loadUser() {
  try {
    let user: string | null = localStorage.getItem('token');
    if (!user) return;
    axios.defaults.headers.common['Authorization'] = user;
    store.dispatch(login_localstorage(user));
  } catch (e) {
    console.log(e);
  }
}
loadUser();

// 10층 이상 도달했을 때 환생시스템을 안내해줄 모달창띄울지 여부값 로컬스토리지 선언 -> Dungeon에서 값 체크
const revivalModalLocalStorage = () => {
  if (localStorage.getItem('revivalModal') === null) {
    localStorage.setItem('revivalModal', '0');
  } else {
    return;
  }
};
revivalModalLocalStorage();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={<App />}
          ></Route>
          <Route
            path='/register'
            element={<NewRegister />}
          ></Route>
          <Route
            path='/home'
            element={<Home />}
          ></Route>
          <Route
            path='/status'
            element={<MyStatus />}
          ></Route>
          <Route
            path='*'
            element={<Notfound />}
          ></Route>
          <Route
            path='/playpengame'
            element={<NewPenGame />}
          ></Route>
          <Route
            path='/dungeon'
            element={<Dungeon />}
          ></Route>

          <Route
            path='/dungeonfight'
            element={<NewDungeonFight />}
          ></Route>
          <Route
            path='/dungeonfightbefore'
            element={<NewDungeonFight />}
          ></Route>
          <Route
            path='/ballpenshop'
            element={<Shop />}
          ></Route>
          <Route
            path='/monstercollection'
            element={<MonsterCollection />}
          ></Route>
        </Route>
        <Route element={<LayoutNotInfo />}>
          <Route
            path='/ranking'
            element={<NewRanking />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
