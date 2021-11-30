import { SampleContext } from "./contexts/sampleContext/sampleContext";
import HomePage from "./pages/home/home";
import { useContext } from "react";
import { BrowserRouter as Router,Routes, Route} from "react-router-dom"

const App = () => {
  const {sample} = useContext(SampleContext)
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>

      </Routes>
    </Router>
  );
}

export default App;
