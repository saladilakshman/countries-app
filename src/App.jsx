
import SingleCountry from "./components/singlecountry";
import AllCountries from "./components/fullcountries"; 
import {HashRouter,Routes,Route} from "react-router-dom";
import './App.css';
function App() {
  
  return (
    <HashRouter>
    <Routes>
      <Route path="/"element={<AllCountries/>}/>
      <Route path="/:singlecountry"element={<SingleCountry/>}/>
    </Routes>
    </HashRouter>
  );
}

export default App;
