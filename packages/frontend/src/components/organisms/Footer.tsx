import { useNavigate } from "react-router-dom";
import TextButton from "../atoms/TextButton";

const Footer = () => {
  const navigate = useNavigate();

  const handleCookiesClick = () => {
    navigate("/cookie");
  };

  const handleLegalMentionsClick = () => {
    navigate("/legal-mentions");
  };

  return (
    <footer className="w-full flex sm:pl-4 py-8" role="contentinfo">
      <nav className="w-full flex">
        <div className="w-1/2 flex items-center justify-center">
          <TextButton onClick={handleCookiesClick}>
            Politique des cookies
          </TextButton>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <TextButton onClick={handleLegalMentionsClick}>
            Mentions légales
          </TextButton>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
