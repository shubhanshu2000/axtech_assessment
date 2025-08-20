import React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import type { InputFieldProps } from "./type";

const Input: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  showToggle,
  showValue,
  onToggle,
}) => (
  <div className={showToggle ? "relative" : ""}>
    <label className="block text-sm md:text-base text-gray-500 mb-2 font-semibold">
      {label}
    </label>
    <input
      type={showToggle ? (showValue ? "text" : "password") : type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border-b-2 border-gray-300 px-2 md:px-3 py-2 md:py-4 text-sm md:text-lg ${
        showToggle ? "pr-10" : ""
      } focus:bg-gray-100 focus:outline-none transition-colors ${
        error ? "border-red-500" : ""
      }`}
      placeholder={placeholder}
      required
    />
    {showToggle && (
      <span
        className="absolute right-3 top-10 md:top-12 cursor-pointer text-gray-600 text-xl"
        onClick={onToggle}
        title={showValue ? "Hide" : "Show"}
      >
        {showValue ? <LuEyeOff size={22} /> : <LuEye size={22} />}
      </span>
    )}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default Input;
