import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Game } from "./pages/Game";
import { Simulation } from "./pages/Simulation";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/simulador" element={<Simulation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
