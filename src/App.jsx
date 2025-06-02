import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import FoodResearch from "./views/FoodResearch";
import SparqlRequest from "./views/SparqlRequests";
function App() {

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FoodResearch />} />
        <Route path="/sparql" element={<SparqlRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
