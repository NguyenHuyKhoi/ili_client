import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/auth/context';
import { UserContextProvider} from './context/user/context'
import { GameCreatorContextProvider } from './context/game/creator/context';
import axios from 'axios'
import { GameContextProvider } from './context/game/other/context';
import { CollectionContextProvider } from './context/collection/context';

axios.defaults.baseURL = 'http://localhost:8800/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <React.StrictMode>
    <GameCreatorContextProvider>
    <CollectionContextProvider>
    <GameContextProvider>
    <UserContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </UserContextProvider>
    </GameContextProvider>
    </CollectionContextProvider>
    </GameCreatorContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
