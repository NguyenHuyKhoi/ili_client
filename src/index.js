import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/auth/context';
import { GameCreatorContextProvider } from './context/game/create/context';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8800/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <React.StrictMode>
    <GameCreatorContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </GameCreatorContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
