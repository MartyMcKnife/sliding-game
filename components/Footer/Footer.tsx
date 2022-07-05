import React from "react";
import Share from "./Share";
import Restart from "./Restart";
import { ILevel } from "../../models/level";

type Props = {
  level: ILevel;
};

export default function Footer({ level }: Props) {
  return (
    <footer className="flex justify-between items-center max-w-xl mx-auto mt-4">
      <section id="left-footer">
        <Share levelID={level.levelID} />
      </section>
      <section id="right-footer">
        <Restart />
      </section>
    </footer>
  );
}
