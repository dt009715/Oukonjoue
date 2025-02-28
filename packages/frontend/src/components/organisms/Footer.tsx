import TextButton from "../atoms/TextButton";

const Footer = () => {
  return (
    <div className="w-full flex py-8">
      <div className="w-1/2 flex items-center justify-center">
        <TextButton children="Politique des cookies" href="" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <TextButton children="Mentions légales" href="" />
      </div>
    </div>
  );
};

export default Footer;
