import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/UI/HomePage";
import Institutions from "./components/UI/Institutions";
function App() {
  return (
    <div className="w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/institutions" element={<Institutions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
