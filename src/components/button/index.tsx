import React from "react";
import type { ButtonProps } from "./type";

const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  className = "",
  onClick,
}) => (
  <button
    type={type}
    className={`bg-[#008378] text-white px-8 md:px-16 py-3 rounded text-base md:text-lg font-semibold hover:bg-[#00695c] transition ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
