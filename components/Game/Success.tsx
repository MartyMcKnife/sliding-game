import React from "react";
import Modal from "../General/Modal";
import { calcActual } from "../../utils/leaderboardCalcs";

type Props = {
  onClose: () => void;
  time: number;
  moves: number;
  rows: number;
  columns: number;
};

export default function Success({
  onClose,
  time,
  moves,
  rows,
  columns,
}: Props) {
  return (
    <Modal title="🎉 Congratulations! 🎉" onClose={onClose}>
      <p>You did it!</p>
      <p>
        You beat a {rows}x{columns} puzzle in a time of {time}, completing it in{" "}
        {moves}
      </p>
      <p>This is a score of {calcActual(time, moves)}</p>
    </Modal>
  );
}
