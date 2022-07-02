import React, { useEffect, useState } from "react";
import { checkSolved } from "../../utils/logic";
import { motion } from "framer-motion";

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
    <motion.div
      className={`rounded-lg w-20 h-20 flex items-center justify-center cursor-pointer`}
      onClick={() => {
        setMoveItem(num);
      }}
      animate={num === 0 ? "empty" : isCorrect ? "correct" : "incorrect"}
      initial={{ scale: 0 }}
      variants={{
        correct: { backgroundColor: "#0f766e", scale: 1 },
        incorrect: { backgroundColor: "#1d4ed8", scale: 1 },
        empty: {
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#1d4ed8",
          cursor: "default",
          scale: 1,
        },
      }}
      transition={{ duration: 0.2 }}
    >
      {num > 0 && <h1 className="text-4xl text-white font-semibold">{num}</h1>}
    </motion.div>
  );
}
