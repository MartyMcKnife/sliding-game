import React, { useEffect } from "react";
import ScoreInfo from "./ScoreInfo";

type Props = {
  time: number;
  moves: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
};

export default function ScoreContainer({ time, moves, setTime }: Props) {
  useEffect(() => {
    //Increase our time every second
    const token = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    //Clean up our timer so we don't cause a memory leak
    return () => clearInterval(token);
  }, [time, setTime]);
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
