import React, { useState } from "react";
import Button from "../General/Button";
import { FaCog } from "react-icons/fa";
import Modal from "../General/Modal";
import { ILevel } from "../../models/level";
import UpDown from "../General/UpDown";
import { AnimatePresence } from "framer-motion";
import UnsplashContainer from "../Unsplash/UnsplashContainer";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

type Props = {
  level: ILevel;
};

export default function GameOptions({ level }: Props) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(level.rows);
  const [cols, setCols] = useState(level.columns);
  const [img, setImg] = useState(level.image || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const id = (
        await axios.post("/api/newboard", {
          rows,
          cols,
          imageURL: img,
        })
      ).data.id;
      router.push(`/id/${id}`, undefined, { shallow: false });

      setLoading(false);
    } catch (err) {
      toast.error("Unexpected error occurred!", { theme: "colored" });
      console.error(err);
      setLoading(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <Modal
            title="Settings"
            onClose={() => setOpen(!open)}
            confirmButton={
              <Button
                onClick={handleSubmit}
                text="Submit"
                className="bg-green-500 text-white px-3 py-1 ml-4"
                loading={loading}
              />
            }
          >
            <h2 className="text-2xl italic underline mt-4">The Grid</h2>
            <h4 className="text-xs font-bold text-gray-400 mb-4">
              NOTE: This only works if no image is selected
            </h4>
            <section
              className="flex justify-left items-center gap-x-16
            "
            >
              <div className="flex justify-center items-center gap-2">
                <h3 className="text-xl">Rows:</h3>
                <UpDown num={rows} setNum={setRows} />
              </div>
              <div className="flex justify-center items-center gap-2">
                <h3 className="text-xl">Columns:</h3>
                <UpDown num={cols} setNum={setCols} />
              </div>
            </section>
            <h2 className="text-2xl italic underline my-4">Image</h2>
            <UnsplashContainer setImage={setImg} curImg={img} />
          </Modal>
        )}
      </AnimatePresence>

      <Button
        text="Settings"
        className="bg-green-500 text-white shadow-lg"
        icon={<FaCog />}
        onClick={() => setOpen(!open)}
      />
    </>
  );
}
