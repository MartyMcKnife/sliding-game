import React from "react";
import ScoreInfo from "./ScoreInfo";

type Props = {
  time: number;
  moves: number;
};

export default function ScoreContainer({ time, moves }: Props) {
  return (
    <section
      id="moves-and-time"
      className="rounded-lg bg-white shadow-md max-w-fit py-1 px-4 pt-2"
    >
      <div className="flex justify-between items-center space-x-4">
        <ScoreInfo value={time} label="Time" />
        <div className="h-12 bg-gray-400 w-0.5 " />
        <ScoreInfo value={moves} label="Moves" />
      </div>
    </section>
  );
}
