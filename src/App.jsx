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
import PlayerEnterGame from "./pages/player/enter_game";
import PlayerInGame from "./pages/player/in_game";
import GameLobby from "./pages/player/game_lobby";
import GameRank from "./pages/player/game_rank";
import GameHostSetting from "./pages/game_host_setting";
import DashboardReports from "./pages/reports/dashboard";
import GameReport from "./pages/reports/game_report";

const App = () => {
  const {sample} = useContext(SampleContext)
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<GameReport/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
