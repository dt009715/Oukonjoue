interface TextButtonProps {
  children: React.ReactNode;
  href: string;
}

const TextButton = ({ children, href }: TextButtonProps) => {
  return (
    <div>
      <a href={href} className="font-semibold text-xl">
        {children}
      </a>
    </div>
  );
};

export default TextButton;
