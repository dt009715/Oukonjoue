import TextButton from "../atoms/TextButton";

const Footer = () => {
  return (
    <div className="w-full flex sm:pl-4 py-8">
      <div className="w-1/2 flex items-center justify-center">
        <TextButton children="Politique des cookies" onClick={() => {}} />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <TextButton children="Mentions légales" onClick={() => {}} />
      </div>
    </div>
  );
};

export default Footer;
