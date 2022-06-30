import React, { useRef } from "react";
import { ILeaderboard } from "../../models/leaderboard";
import LeaderItem from "./LeaderItem";
import { motion } from "framer-motion";
import useOnClickOutside from "use-onclickoutside";

type Props = {
  leaderboard: ILeaderboard[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LeaderContainer({ leaderboard, setOpen }: Props) {
  //Ref to handle clicking outside the info box
  const wrapRef = useRef(null);
  useOnClickOutside(wrapRef, () => setOpen(false));

  //Gen our elements
  const els = leaderboard.map((item, i) => (
    <LeaderItem
      key={item.levelID + item.username + i}
      username={item.username}
      levelID={item.levelID}
      score={item.score}
    />
  ));
  return (
    <motion.section
      id="modal"
      className="fixed bg-black bg-opacity-60 flex items-center justify-center top-0 left-0 w-full h-full"
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100vh", opacity: 0 }}
        className="bg-white max-w-xl w-full h-auto rounded-lg py-4 px-4"
        ref={wrapRef}
      >
        <h1 className="font-bold text-4xl">Leaderboard</h1>
        <section id="info" className="px-4 py-4 space-y-2">
          <header className="flex justify-between items-center w-full font-bold text-gray-600">
            <h2>Name</h2> <h2 className="mr-4">Score</h2> <h2>Link</h2>
          </header>{" "}
          {els}
        </section>
        <button
          onClick={() => setOpen(false)}
          className="ml-auto block px-3 py-1 rounded-lg bg-red-600 text-white font-bold "
        >
          Close
        </button>
      </motion.div>
    </motion.section>
  );
}
