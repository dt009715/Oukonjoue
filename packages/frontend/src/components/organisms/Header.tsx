import Button from "../atoms/Button";
import TextButton from "../atoms/TextButton";

const Header = () => {
  return (
    <div className="w-full flex pt-2 pl-4">
      <h1 className="text-2xl pr-3">LOGO</h1>
      <h1 className="w-1/3 text-2xl font-semibold">Oukonjoue?</h1>
      <div className=" flex w-1/3 gap-x-20">
        <TextButton href="">Institution</TextButton>
        <TextButton href="">Artistes</TextButton>
        <TextButton href="">Contact</TextButton>
      </div>
      <div className="flex justify-end pr-8 gap-8 w-1/3">
        <Button onClick={() => {}}> Se connecter</Button>
        <Button onClick={() => {}}> S'inscrire</Button>
      </div>
    </div>
  );
};

export default Header;
