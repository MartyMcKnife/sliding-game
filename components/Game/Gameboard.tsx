import React, { useState, useEffect } from "react";
import { ILevel } from "../../models/level";
import { genGame, moveDirection } from "../../utils/logic";
import GameItem from "./GameItem";
import useKeypress from "react-use-keypress";
import { parsedA, parsedB } from "../../utils/lookups";
import { Images } from "utils/image";

type Props = {
  level: ILevel;
  images?: Images[][];
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  success: boolean;
};

export default function Gameboard({
  level,
  setMoves,
  setSuccess,
  success,
  images,
}: Props) {
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
          .map((row, i) => {
            return row.map((col) => (
              <GameItem
                key={col + " Postion #" + i}
                num={col}
                gameBoard={gameBoard}
                reference={solved}
                setMoveItem={setMoveItem}
                {...(images && {
                  //Find element in images which has the same number
                  image: images
                    .map((imgR) => imgR.find((imgC) => imgC.num === col))
                    .filter((img) => img !== undefined)[0],
                })}
              />
            ));
          })
          .flat()
      );
    }
  }, [gameBoard]);

  useEffect(() => {
    if (gameBoard) {
      //We convert to string due to js wackiness
      if (JSON.stringify(gameBoard) === JSON.stringify(solved)) {
        setSuccess(true);
      }
      if (moveItem) {
        const oldBoard = gameBoard;
        const newBoard = moveDirection(gameBoard, moveItem);

        if (JSON.stringify(oldBoard) !== JSON.stringify(newBoard)) {
          setMoves((m) => (m += 1));
        }
        setGameBoard(newBoard);

        setMoveItem(undefined);
      }
    }
  }, [gameBoard, setSuccess, solved, moveItem]);

  useKeypress(
    ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "w", "a", "s", "d"],
    (e: KeyboardEvent) => {
      if (gameBoard && !success) {
        setMoves((m) => (m += 1));
        //We know that we can only have key on the object, so an undefined error can be ignored
        //@ts-ignore
        const direction = parsedA[e.key] || parsedB[e.key];

        const out = moveDirection(gameBoard, 0, direction);

        setGameBoard(out);
      }
    }
  );

  if (gameBoard && solved && els) {
    return (
      <div
        className={`p-4 rounded-lg shadow-md bg-white mt-6 grid gap-4 w-max mx-auto`}
        style={{
          //Define the amount of cols + rows

          gridTemplateColumns: `repeat(${level.columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${level.rows}, minmax(0, 1fr))`,
        }}
        onKeyDown={(e) => e.key}
      >
        {els}
      </div>
    );
  } else {
    return null;
  }
}
