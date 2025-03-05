import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArtistDetailsPage from "./components/UI/ArtistDetailsPage";
import ArtistsPage from "./components/UI/ArtistsPage";
import Contact from "./components/UI/Contact";
import Home from "./components/UI/HomePage";
import InstitutionDetailsPage from "./components/UI/InstitutionDetailsPage";
import Institutions from "./components/UI/InstitutionsPage";
function App() {
  return (
    <div className="w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/artistes" element={<ArtistsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/artistes/:id" element={<ArtistDetailsPage />} />
          <Route
            path="/institutions/:id"
            element={<InstitutionDetailsPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
