import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/auth/context';
import { GameCreatorContextProvider } from './context/game/create/context';

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
