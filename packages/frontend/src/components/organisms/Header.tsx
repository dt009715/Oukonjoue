import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import TextButton from "../atoms/TextButton";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full flex justify-between items-center px-4 py-2 bg-background">
      <div className="flex items-center">
        <h1 className="text-2xl pr-3">LOGO</h1>
        <button onClick={() => navigate("/")}>
          <h1 className="text-xl lg:text-2xl font-semibold">Oùkonjoue?</h1>
        </button>
      </div>

      <div className="hidden upLg:flex flex-1 justify-center gap-x-20 pl-10">
        <TextButton onClick={() => navigate("/institutions")}>
          Institutions
        </TextButton>
        <TextButton onClick={() => navigate("/artistes")}>Artistes</TextButton>
        <TextButton onClick={() => navigate("/contact")}>Contact</TextButton>
      </div>

      <div className="hidden upLg:flex justify-end gap-4 w-1/5 pr-4">
        <Button onClick={() => navigate("/login")}>Se connecter</Button>
        <Button onClick={() => navigate("/register")}>S'inscrire</Button>
      </div>

      <div className="flex upLg:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background shadow-lg flex flex-col items-center py-4 space-y-4 z-50 lg:hidden">
          <TextButton
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/institutions");
            }}
          >
            Institutions
          </TextButton>
          <TextButton
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/artistes");
            }}
          >
            Artistes
          </TextButton>
          <TextButton
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/contact");
            }}
          >
            Contact
          </TextButton>
          <Button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/login");
            }}
          >
            Se connecter
          </Button>
          <Button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/register");
            }}
          >
            S'inscrire
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
