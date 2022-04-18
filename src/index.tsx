import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Authorized';
import { Provider } from 'react-redux';

import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

import { enableMapSet } from 'immer';

import store from './store/default'
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import { useAuthorization } from './core/Hooks';
import Login from './pages/Login';
import TodoGroup from './pages/TodoGroups';
import LoadingScreen from './components/LoadingScreen';
import Authorized from './Authorized';
import Container from './Container';

enableMapSet();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <Container>
          <BrowserRouter>
            <Routes>
                <Route path='/' element={
                  <Authorized>
                    <HomePage />
                  </Authorized>
                } />
                <Route path='/groups' element={
                  <Authorized>
                    <TodoGroup />
                  </Authorized>
                } />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </Container>
        <LoadingScreen />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals