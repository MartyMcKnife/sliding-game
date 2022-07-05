import React from "react";
import Button from "../General/Button";
import { FaSync } from "react-icons/fa";
import Router from "next/router";

type Props = {};

export default function Restart({}: Props) {
  return (
    <Button
      text="Reshuffle"
      icon={<FaSync />}
      onClick={() => Router.reload()}
      className="bg-red-600 text-white shadow-lg"
    />
  );
}
