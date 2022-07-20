import React from "react";
import { ILeaderboard } from "../../models/leaderboard";
import LeaderItem from "./LeaderItem";

import Modal from "../General/Modal";

type Props = {
  leaderboard: ILeaderboard[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LeaderContainer({ leaderboard, setOpen }: Props) {
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
    <Modal title="Leaderboard" onClose={() => setOpen(false)}>
      <section id="info" className="px-4 py-4 space-y-2">
        <header className="flex justify-between items-center w-full font-bold text-gray-600">
          <h2>Name</h2> <h2 className="mr-4">Score</h2> <h2>Link</h2>
        </header>{" "}
        <div className="grid-cols-3 grid gap-2 place-items-center">{els}</div>
      </section>
    </Modal>
  );
}
