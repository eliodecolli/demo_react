import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';

import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

import { enableMapSet } from 'immer';

import store from './store/default'
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import { useAuthorization } from './core/Hooks';
import Login from './pages/Login';
import TodoGroup from './pages/TodoGroups';
import Worker from './components/Worker';

enableMapSet();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/groups' element={<TodoGroup />} />
        </Routes>
        </BrowserRouter>
        <Worker />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals