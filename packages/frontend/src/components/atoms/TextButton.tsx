interface TextButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const TextButton = ({ children, onClick }: TextButtonProps) => {
  return (
    <div>
      <button onClick={onClick} className="font-semibold text-xl">
        {children}
      </button>
    </div>
  );
};

export default TextButton;
