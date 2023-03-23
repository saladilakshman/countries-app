
import SingleCountry from "./components/singlecountry";
import AllCountries from "./components/fullcountries"; 
import {Routes,Route} from "react-router-dom";
import './App.css';
function App() {
  
  return (
   
    <Routes>
      <Route path="/"element={<AllCountries/>}/>
      <Route path="/:singlecountry"element={<SingleCountry/>}/>
    </Routes>
    
  );
}

export default App;
