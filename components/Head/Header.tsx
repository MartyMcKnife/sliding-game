import React from "react";
import Lines from "../../public/side-highlighting.svg";
import Logo from "../../public/logo.svg";

export default function Header() {
  return (
    <div className="flex justify-center items-center gap-4 pt-4 max-w-xl mx-auto">
      <Lines width="130px"></Lines>
      <Logo width="200px" />
      <Lines width="130px"></Lines>
    </div>
  );
}
