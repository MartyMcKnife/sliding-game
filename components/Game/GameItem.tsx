import React, { useEffect, useState } from "react";
import { checkSolved } from "../../utils/logic";

type Props = {
  num: number;
  gameBoard: Array<Array<number>>;
  reference: Array<Array<number>>;
};

export default function GameItem({ num, gameBoard, reference }: Props) {
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setIsCorrect(checkSolved(gameBoard, num, reference));
  }, [gameBoard, num, reference]);
  return (
    <div
      className={
        "rounded-lg w-64 h-64 flex item-center justify-center " + isCorrect
          ? "bg-teal-600"
          : "bg-blue-600"
      }
    >
      <h1 className="font-bold font-3xl text-white">{num}</h1>
    </div>
  );
}
