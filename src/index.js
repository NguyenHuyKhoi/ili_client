import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/auth/context';
import { UserContextProvider} from './context/user/context'
import { GameCreatorContextProvider } from './context/game/creator/context';
import axios from 'axios'
import { GameContextProvider } from './context/game/other/context';
import { CollectionContextProvider } from './context/collection/context';
import { MatchPlayContextProvider } from './context/match/play/context';
import { SocketContextProvider } from './context/socket/context';

axios.defaults.baseURL = 'http://localhost:8800/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <React.StrictMode>
    <MatchPlayContextProvider>
    <GameCreatorContextProvider>
    <CollectionContextProvider>
    <GameContextProvider>
    <UserContextProvider>
    <AuthContextProvider>
      <SocketContextProvider>
      <App />
      </SocketContextProvider>
    </AuthContextProvider>
    </UserContextProvider>
    </GameContextProvider>
    </CollectionContextProvider>
    </GameCreatorContextProvider>
    </MatchPlayContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
