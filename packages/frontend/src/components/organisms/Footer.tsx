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
    <div className="w-full flex sm:pl-4 py-8">
      <div className="w-1/2 flex items-center justify-center">
        <TextButton
          children="Politique des cookies"
          onClick={handleCookiesClick}
        />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <TextButton
          children="Mentions légales"
          onClick={handleLegalMentionsClick}
        />
      </div>
    </div>
  );
};

export default Footer;
