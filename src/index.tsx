import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { ThemeProvider } from 'styled-components';
import Register from './components/Register';

import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './modules/modules_index';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './saga/root_saga';

//사가미들웨어 생성
const sagaMiddleware = createSagaMiddleware()
//두번째인자에 사용할 미들웨어를 추가해주었다.
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));

//사가미들웨어의 run함수로 rootSaga를 호출
sagaMiddleware.run(rootSaga)




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<App />}></Route>
  <Route path='/register' element={<Register />}></Route>
</Routes>
</BrowserRouter>
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
