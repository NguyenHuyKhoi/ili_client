import { ThemeProvider } from '@mui/material/styles';
import { useContext } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/auth/context";
import ForgotPasswordPage from "./page/auth/forgot_password";
// Auth
import LoginPage from "./page/auth/login";
import ResetPasswordPage from "./page/auth/reset_password";
import SignupPage from "./page/auth/signup";
import CollectionDetailPage from "./page/collection/detail";
// Collection
import CollectionEditPage from "./page/collection/edit";
import CollectionLibraryPage from "./page/collection/library";
// Discover
import SearchPage from "./page/discover/search";
import DiscoverPage from "./page/discover/suggestion";
// Game
import GameCreatorPage from "./page/game/creator";
import GameDetailPage from "./page/game/detail";
import GameLibraryPage from "./page/game/library";
import GameEntrancePage from "./page/game/play/entrance";
import GameFinishPage from "./page/game/play/finish";
import GameHostSettingPage from "./page/game/play/host_setting";
import GameLobbyPage from "./page/game/play/lobby";
import GameStadiumPage from "./page/game/play/stadium";
import GameReportPage from "./page/game/report";
// Group
import GroupListPage from "./page/group/list";
import HomePage from "./page/home/auth";
// Home
import HomeGuestPage from "./page/home/guest";
// Report
import DashboardReportPage from "./page/report/dashboard";
// User
import ProfilePage from "./page/user/profile";
import SettingPage from "./page/user/setting";
import { theme } from "./theme";

const App = () => {
  const {user} = useContext(AuthContext)
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <HomePage/> : <HomeGuestPage/>}/>
          <Route exact path = '/auth/login' element = {!user ? <LoginPage/> : <Navigate to = '/'/>}/>
          <Route exact path = '/auth/signup' element = {!user ? <SignupPage/> : <Navigate to = '/'/>}/>
          <Route exact path = '/auth/forgot-password' element = {!user ? <ForgotPasswordPage/> : <Navigate to = '/'/>}/>
          <Route exact path = '/auth/reset-password' element = {!user ? <ResetPasswordPage/> : <Navigate to = '/'/>}/>

          <Route exact path = '/collection/library' element = {user ? <CollectionLibraryPage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/collection/edit' element = {user ? <CollectionEditPage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/collection/detail' element = {user ? <CollectionDetailPage/> : <Navigate to = '/auth/login'/>}/>
          
          <Route exact path = '/discover/suggestion' element = {user ? <DiscoverPage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/discover/search' element = {user ? <SearchPage/> : <Navigate to = '/auth/login'/>}/>
          
          <Route exact path = '/game/creator' element = {user ? <GameCreatorPage/> : <Navigate to = '/auth/login'/>}/>
          <Route exact path = '/game/detail/:id' element = {user ? <GameDetailPage/> : <Navigate to = '/auth/login'/>}/>
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
