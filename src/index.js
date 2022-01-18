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
import { MatchContext, MatchContextProvider } from './context/match/other/context';
import { PlatformContextProvider } from './context/platform/context';

axios.defaults.baseURL = 'http://localhost:8800/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <React.StrictMode>
    <MatchContextProvider>
    <MatchPlayContextProvider>
    <GameCreatorContextProvider>
    <CollectionContextProvider>
    <GameContextProvider>
    <UserContextProvider>
    <AuthContextProvider>
      <SocketContextProvider>
        <PlatformContextProvider>
        <App />
        </PlatformContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
    </UserContextProvider>
    </GameContextProvider>
    </CollectionContextProvider>
    </GameCreatorContextProvider>
    </MatchPlayContextProvider>
    </MatchContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
