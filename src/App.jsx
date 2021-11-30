import { SampleContext } from "./contexts/sampleContext/sampleContext";
import HomePage from "./pages/home/home";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"

const App = () => {
  const {sample} = useContext(SampleContext)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
           <HomePage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
