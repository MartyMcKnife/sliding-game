import React, { useState, useEffect } from "react";
import { ILevel } from "../../models/level";
import { genGame } from "../../utils/logic";
import GameItem from "./GameItem";

type Props = {
  level: ILevel;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Gameboard({ level, setMoves, setSuccess }: Props) {
  const [gameBoard, setGameBoard] = useState<Array<Array<number>>>();
  const [solved, setSolved] = useState<Array<Array<number>>>();

  //Have to set this client side otherwise compiler gets grumpy
  useEffect(() => {
    setGameBoard(genGame(level.rows, level.columns, true));
    setSolved(genGame(level.rows, level.columns, false));
  }, []);

  useEffect(() => {
    if (gameBoard === solved) {
      setSuccess(true);
    }
  }, [gameBoard, setSuccess, solved]);

  if (gameBoard && solved) {
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

    //Define our classes for the amount of cols + rows
    const cols = `grid-cols-${level.columns}`;
    const rows = `grid-rows-${level.rows}`;

    return (
      <div
        className={`p-4 rounded-lg shadow-md bg-white mt-4 grid ${cols} ${rows} gap-4 w-max mx-auto`}
      >
        {els.flat()}
      </div>
    );
  } else {
    return null;
  }
}
