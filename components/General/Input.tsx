import React, { InputHTMLAttributes } from "react";
import Button from "./Button";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  buttonText: string;
  buttonColor: string;
  disabled: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  loading?: boolean;
}

export default function Input({
  buttonText,
  buttonColor,
  onChange,
  onClick,
  placeholder,
  value,
  disabled,
  className,
  loading,
}: Props) {
  return (
    <div
      id="input"
      className={`flex justify-between items-center border rounded-lg border-gray-400 p-2 max-w-xl gap-x-2 bg-white ${className}`}
    >
      <input
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        className={`text-gray-500 bg-transparent w-full py-1 px-2 rounded-lg ${
          disabled ? "cursor-not-allowed bg-gray-200 opacity-60" : ""
        }`}
        value={value}
        disabled={disabled}
      />
      <Button
        text={buttonText}
        onClick={onClick}
        className={`py-1 text-lg ${buttonColor}`}
        loading={loading}
      />
    </div>
  );
}
