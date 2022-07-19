import React, { useEffect, useState } from "react";
import { checkSolved } from "../../utils/logic";
import { motion } from "framer-motion";
import { Images } from "../../utils/image";

type Props = {
  num: number;
  gameBoard: Array<Array<number>>;
  reference: Array<Array<number>>;
  setMoveItem: React.Dispatch<React.SetStateAction<number | undefined>>;
  image?: Images;
};

export default function GameItem({
  num,
  gameBoard,
  reference,
  setMoveItem,
  image,
}: Props) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => {
    setIsCorrect(checkSolved(gameBoard, num, reference));
  }, [gameBoard, num, reference]);
  useEffect(() => {
    if (image) {
      //Parse our image buffer so we can put it in a url
      setUrl(
        "data:image/png;base64," +
          //@ts-ignore
          new Buffer.from(image.imgBuf).toString("base64")
      );
    }
  }, []);
  return (
    <motion.div
      className={`rounded-lg w-20 h-20 flex items-center justify-center cursor-pointer`}
      onClick={() => {
        setMoveItem(num);
      }}
      animate={num === 0 ? "empty" : isCorrect ? "correct" : "incorrect"}
      variants={{
        correct: {
          backgroundColor: "#0f766e",
          backgroundImage: `url(${url})`,
          scale: [0, 1],
        },
        incorrect: {
          backgroundColor: "#1d4ed8",
          backgroundImage: `url(${url})`,
          scale: [0, 1],
        },
        empty: {
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#1d4ed8",
          cursor: "default",
          scale: 1,
        },
      }}
      transition={{ duration: 0.2 }}
      style={{}}
    >
      {num > 0 && <h1 className="text-4xl text-white font-semibold">{num}</h1>}
    </motion.div>
  );
}
