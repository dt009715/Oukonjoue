import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArtistsPage from "./components/UI/ArtistsPage";
import Home from "./components/UI/HomePage";
import Institutions from "./components/UI/InstitutionsPage";
function App() {
  return (
    <div className="w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/Artistes" element={<ArtistsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
