import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { ILeaderboard } from "../../models/leaderboard";
import LeaderContainer from "./LeaderContainer";

type Props = {
  leaderboard: ILeaderboard[];
};

export default function LearboardButton({ leaderboard }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <LeaderContainer leaderboard={leaderboard} setOpen={setOpen} />
        )}
      </AnimatePresence>
      <button
        className="italic underline font-xl text-blue-700"
        onClick={() => setOpen(!open)}
      >
        Leaderboard
      </button>
    </>
  );
}
