import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import ArtistDetailsPage from "./components/UI/ArtistDetailsPage";
import ArtistsPage from "./components/UI/ArtistsPage";
import Contact from "./components/UI/Contact";
import CookiePage from "./components/UI/CookiePage";
import Home from "./components/UI/HomePage";
import InstitutionDetailsPage from "./components/UI/InstitutionDetailsPage";
import Institutions from "./components/UI/InstitutionsPage";
import LoginPage from "./components/UI/LoginPage";
import RegisterPage from "./components/UI/RegisterPage";

import LegalMentionsPage from "./components/UI/LegalMentionsPage";
function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/artistes" element={<ArtistsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/artistes/:id" element={<ArtistDetailsPage />} />
          <Route
            path="/institutions/:id"
            element={<InstitutionDetailsPage />}
          />
          <Route path="/cookie" element={<CookiePage />} />
          <Route path="/legal-mentions" element={<LegalMentionsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
