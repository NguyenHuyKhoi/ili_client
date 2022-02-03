import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/auth/context';
import { CollectionContextProvider } from './context/collection/context';
import { GameCreatorContextProvider } from './context/game/creator/context';
import { GameContextProvider } from './context/game/other/context';
import { MatchContextProvider } from './context/match/other/context';
import { MatchPlayContextProvider } from './context/match/play/context';
import { PlatformContextProvider } from './context/platform/context';
import { QuestionCreatorContextProvider } from './context/question/creator/context';
import { QuestionBankContextProvider } from './context/question/other/context';
import { SocketContextProvider } from './context/socket/context';
import { UserContextProvider } from './context/user/context';

require('dotenv').config()
axios.defaults.baseURL = 'http://localhost:8800/api'
//http://localhost:8800/
//'http://localhost:8800/api/';
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
          <QuestionBankContextProvider>
            <QuestionCreatorContextProvider>
              <App/>         
            </QuestionCreatorContextProvider>
          </QuestionBankContextProvider>
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
