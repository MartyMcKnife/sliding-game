import React, { useEffect, useState } from "react";
import { checkSolved } from "../../utils/logic";

type Props = {
  num: number;
  gameBoard: Array<Array<number>>;
  reference: Array<Array<number>>;
  setMoveItem: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function GameItem({
  num,
  gameBoard,
  reference,
  setMoveItem,
}: Props) {
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setIsCorrect(checkSolved(gameBoard, num, reference));
  }, [gameBoard, num, reference]);
  return (
    <div
      className={`rounded-lg w-20 h-20 flex items-center justify-center cursor-pointer ${
        num === 0
          ? "border-2 border-blue-600 cursor-default"
          : isCorrect
          ? "bg-teal-700"
          : "bg-blue-700"
      }`}
      onClick={() => {
        setMoveItem(num);
      }}
    >
      {num > 0 && <h1 className="text-4xl text-white font-semibold">{num}</h1>}
    </div>
  );
}
