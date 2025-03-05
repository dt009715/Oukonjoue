import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import TextButton from "../atoms/TextButton";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex pt-2 pl-4">
      <div className="w-1/3 flex">
        <h1 className="text-2xl pr-3">LOGO</h1>
        <button onClick={() => navigate("/")}>
          <h1 className="w-1/3 text-2xl font-semibold">Oukonjoue?</h1>
        </button>
      </div>
      <div className=" flex w-1/3 gap-x-20">
        <TextButton onClick={() => navigate("/institutions")}>
          Institutions
        </TextButton>
        <TextButton onClick={() => navigate("/artistes")}>Artistes</TextButton>
        <TextButton onClick={() => navigate("/contact")}>Contact</TextButton>
      </div>
      <div className="flex justify-end pr-8 gap-8 w-1/3">
        <Button onClick={() => {}}> Se connecter</Button>
        <Button onClick={() => navigate("/register")}> S'inscrire</Button>
      </div>
    </div>
  );
};

export default Header;
