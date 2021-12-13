import { useContext } from "react";
import { BrowserRouter as Router,Routes, Route, Navigate} from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { theme } from "./theme";
import { AuthContext } from "./context/auth/context";


// Home
import HomeGuestPage from "./page/home/guest";
import HomePage from "./page/home/auth";

// Auth
import LoginPage from "./page/auth/login";
import RegisterPage from "./page/auth/register";
import ForgotPasswordPage from "./page/auth/forgot_password";
import ResetPasswordPage from "./page/auth/reset_password";

// Collection
import CollectionEditPage from "./page/collection/edit";
import CollectionLibraryPage from "./page/collection/library";
import CollectionDetailPage from "./page/collection/detail";

// Discover
import SearchPage from "./page/discover/search";
import DiscoverPage from "./page/discover/suggestion";

// Game
import GameCreatePage from "./page/game/create";
import GameDetailPage from "./page/game/detail";
import GameLibraryPage from "./page/game/library";
import GameReportPage from "./page/game/report";

import GameLobbyPage from "./page/game/play/lobby";
import GameHostSettingPage from "./page/game/play/host_setting";
import GameEntrancePage from "./page/game/play/entrance";
import GameStadiumPage from "./page/game/play/stadium";
import GameFinishPage from "./page/game/play/finish";

// Group
import GroupListPage from "./page/group/list";

// Report
import DashboardReportPage from "./page/report/dashboard";

// User
import ProfilePage from "./page/user/profile";
import SettingPage from "./page/user/setting";







const App = () => {
  const {user} = useContext(AuthContext)
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <HomePage/> : <HomeGuestPage/>}/>
          <Route exact path = '/auth/login' element = {!user ? <LoginPage/> : <Navigate to = '/'/>}/>
          <Route exact path = '/auth/register' element = {!user ? <RegisterPage/> : <Navigate to = '/'/>}/>
          <Route exact path = '/auth/forgot-password' element = {!user ? <ForgotPasswordPage/> : <Navigate to = '/'/>}/>
          <Route exact path = '/auth/reset-password' element = {!user ? <ResetPasswordPage/> : <Navigate to = '/'/>}/>

          <Route exact path = '/collection/library' element = {user ? <CollectionLibraryPage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/collection/edit' element = {user ? <CollectionEditPage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/collection/detail' element = {user ? <CollectionDetailPage/> : <Navigate to = '/auth/login'/>}/>
          
          <Route exact path = '/discover/suggestion' element = {user ? <DiscoverPage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/discover/search' element = {user ? <SearchPage/> : <Navigate to = '/auth/login'/>}/>
          
          <Route exact path = '/game/create' element = {user ? <GameCreatePage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/game/detail' element = {user ? <GameDetailPage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/game/library' element = {user ? <GameLibraryPage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/game/report' element = {user ? <GameReportPage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/game/entrance' element = {user ? <GameEntrancePage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/game/lobby' element = {user ? <GameLobbyPage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/game/stadium' element = {user ? <GameStadiumPage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/game/finish' element = {user ? <GameFinishPage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/game/host_setting' element = {user ? <GameHostSettingPage/> : <Navigate to = '/auth/login'/>}/>


          <Route exact path = '/group/list' element = {user ? <GroupListPage/> : <Navigate to = '/auth/login'/>}/>

          <Route exact path = '/report' element = {user ? <DashboardReportPage/> : <Navigate to = '/auth/login'/>}/>

          <Route exact path = '/user/profile' element = {user ? <ProfilePage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/user/setting' element = {user ? <SettingPage/> : <Navigate to = '/auth/login'/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
