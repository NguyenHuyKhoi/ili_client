import { SampleContext } from "./contexts/sampleContext/sampleContext";
import HomePage from "./pages/home";
import { useContext } from "react";
import { BrowserRouter as Router,Routes, Route} from "react-router-dom"
import GameCreator from "./pages/game_creator";
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { theme } from "./theme";
import GameDetail from "./pages/game_detail";
import GameSearch from "./pages/game_search";
import GameCollector from "./pages/game_collector";
import Profile from "./pages/profile";
import UserLibrary from "./pages/user_library";
import PlayerEnterGame from "./pages/player/enter_game";
import PlayerInGame from "./pages/player/in_game";

const App = () => {
  const {sample} = useContext(SampleContext)
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<PlayerInGame/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
