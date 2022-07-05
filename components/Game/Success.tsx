import React, { useState } from "react";
import Modal from "../General/Modal";
import { calcActual } from "../../utils/leaderboardCalcs";
import Input from "../General/Input";
import { ILevel } from "../../models/level";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";

type Props = {
  onClose: () => void;
  time: number;
  moves: number;
  level: ILevel;
};

export default function Success({ onClose, time, moves, level }: Props) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!username) {
        throw new Error("Please enter a username");
      }
      await axios.post("/api/leaderboard", {
        username,
        time,
        moves,
        id: level.levelID,
      });
      setLoading(false);
      toast.success("Successfully added to the leaderboard!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("Unexpect error occurred!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
    }
    // Router.reload();
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
      />
      <Modal title="🎉 Congratulations! 🎉" onClose={onClose}>
        <section id="info" className="py-4 gap-y-2">
          <p>You did it!</p>
          <p className="my-1">
            You beat a {level.rows}x{level.columns} puzzle in a time of {time}{" "}
            seconds, completing it in {moves} moves
          </p>
          <p>This is a score of {calcActual(time, moves)}</p>
        </section>
        <section id="leaderboard">
          <h2 className="font-bold text-2xl">
            Put your score on the leaderboard!
          </h2>
          <p className="mt-2">
            Type your username below, and get your score uploaded to the
            leaderboard!
          </p>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Gamer Man"
            disabled={false}
            buttonText="Submit"
            buttonColor="bg-green-500 text-white"
            className="my-4"
            onClick={handleSubmit}
            loading={loading}
          />
          <p>Want a harder challenge?</p>
          <p className="my-1">
            Try playing with the row and column count, or adding a picture
          </p>
        </section>
      </Modal>
    </>
  );
}
