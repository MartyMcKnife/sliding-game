import React, { useState, useEffect } from "react";
import { useSSE } from "use-sse";
import { ILevel } from "../../models/level";
import { genGame } from "../../utils/logic";
import GameItem from "./GameItem";

type Props = {
  level: ILevel;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Gameboard({ level, setMoves, setSuccess }: Props) {
  const [gameBoard, setGameBoard] = useState(
    genGame(level.rows, level.columns, true)
  );
  const solved = genGame(level.rows, level.columns, false);
  console.log(gameBoard, solved);
  useEffect(() => {
    if (gameBoard === solved) {
      setSuccess(true);
    }
  }, [gameBoard, setSuccess]);

  let els = gameBoard.map((row) => {
    return row.map((col, i) => (
      <GameItem
        key={col + " Postion #" + i}
        num={col}
        gameBoard={gameBoard}
        reference={solved}
      />
    ));
  });

  return <div>{els.flat()}</div>;
}
