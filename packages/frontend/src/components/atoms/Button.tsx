import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  type = "button",
  children,
  onClick,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-button font-semibold rounded-3xl text-sm w-full h-full text-white justify-center px-5 py-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
