import React, { ButtonHTMLAttributes, ReactElement } from "react";
import { MoonLoader } from "react-spinners";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  onClick: () => void;
  icon?: ReactElement;
  loading?: boolean;
}

export default function Button({
  text,
  onClick,
  icon,
  className,
  loading,
}: Props) {
  return (
    <button
      className={`${className} rounded-lg p-3 flex justify-between items-center gap-2 font-bold text-xl ${
        loading ? "opacity-60 cursor-not-allowed" : ""
      }`}
      {...(!loading && { onClick: onClick })}
    >
      {loading ? <MoonLoader size="24" color="white" /> : icon}
      {loading ? "Loading" : text}
    </button>
  );
}
