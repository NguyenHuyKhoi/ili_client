
import HomePage from "./pages/home";
import { useContext } from "react";
import { BrowserRouter as Router,Routes, Route, Navigate} from "react-router-dom"
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
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Settings from "./pages/settings";
import GuestHome from "./pages/guest_home";
import Home from "./pages/home";
import ForgotPassword from "./pages/auth/forgot_password";
import ResetPassword from "./pages/auth/reset_password";
import { AuthContext } from "./contexts/auth/context";
import GameLibrary from "./pages/library/components/GameLibrary";
const App = () => {
  const {user} = useContext(AuthContext)
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home/> : <GuestHome/>}/>
          <Route exact path = '/auth/login' element = {!user ? <Login/> : <Navigate to = '/'/>}/>
          <Route exact path = '/auth/register' element = {!user ? <Register/> : <Navigate to = '/'/>}/>
          <Route exact path = '/auth/forgot-password' element = {!user ? <ForgotPassword/> : <Navigate to = '/'/>}/>
          <Route exact path = '/auth/reset-password' element = {!user ? <ResetPassword/> : <Navigate to = '/'/>}/>

          <Route exact path = '/creator' element = {user ? <GameCreator/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/my-library' element = {user ? <GameLibrary/> : <Navigate to = '/auth/login'/>}/>

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
