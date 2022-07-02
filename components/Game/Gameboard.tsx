import React, { useState, useEffect } from "react";
import { ILevel } from "../../models/level";
import { genGame, moveDirection } from "../../utils/logic";
import GameItem from "./GameItem";

type Props = {
  level: ILevel;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Gameboard({ level, setMoves, setSuccess }: Props) {
  const [gameBoard, setGameBoard] = useState<Array<Array<number>>>();
  const [solved, setSolved] = useState<Array<Array<number>>>();
  const [els, setEls] = useState<JSX.Element[]>();

  const [moveItem, setMoveItem] = useState<number>();

  //Have to set this client side otherwise compiler and renderer gets grumpy
  useEffect(() => {
    const gameBoardInit = genGame(level.rows, level.columns, true);
    const gameBoardSolved = genGame(level.rows, level.columns, false);
    setGameBoard(gameBoardInit);
    setSolved(gameBoardSolved);
  }, []);

  //Updated our elements everytime the board changes
  useEffect(() => {
    if (gameBoard && solved) {
      setEls(
        gameBoard
          .map((row) => {
            return row.map((col, i) => (
              <GameItem
                key={col + " Postion #" + i}
                num={col}
                gameBoard={gameBoard}
                reference={solved}
                setMoveItem={setMoveItem}
              />
            ));
          })
          .flat()
      );
    }
  }, [gameBoard]);

  useEffect(() => {
    if (gameBoard) {
      if (gameBoard === solved) {
        setSuccess(true);
      }
      if (moveItem) {
        setMoves((m) => (m += 1));
        setGameBoard(moveDirection(gameBoard, moveItem));
        setMoveItem(undefined);
      }
    }
  }, [gameBoard, setSuccess, solved, moveItem]);

  if (gameBoard && solved && els) {
    return (
      <div
        className={`p-4 rounded-lg shadow-md bg-white mt-6 grid gap-4 w-max mx-auto`}
        style={{
          //Define the amount of cols + rows

          gridTemplateColumns: `repeat(${level.columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${level.rows}, minmax(0, 1fr))`,
        }}
      >
        {els}
      </div>
    );
  } else {
    return null;
  }
}
