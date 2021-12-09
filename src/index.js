import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './contexts/auth/context';
import { GameCreatorContextProvider } from './contexts/game_creator/context';

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
