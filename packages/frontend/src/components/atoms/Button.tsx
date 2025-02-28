interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-button rounded-3xl text-sm w-100% h-100% text-white justify-center px-5 "
    >
      {children}
    </button>
  );
};

export default Button;
