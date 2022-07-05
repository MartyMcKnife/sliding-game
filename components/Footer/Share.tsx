import React, { useState, useEffect } from "react";
import Button from "../General/Button";
import Modal from "../General/Modal";
import Input from "../General/Input";
import { FaShareSquare } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";

type Props = {
  levelID: string;
};

export default function Share({ levelID }: Props) {
  const [share, setShare] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl("https://" + window.location.hostname + "?id=" + levelID);
    }
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <Button
        icon={<FaShareSquare />}
        onClick={() => setShare(!share)}
        className="bg-yellow-500 text-white shadow-lg"
      />
      <AnimatePresence>
        {share && (
          <Modal title="Share" onClose={() => setShare(!share)}>
            <p>Challenge your friends!</p>
            <p className="mt-1">Copy the link below and send it to them</p>
            <Input
              buttonText="Copy"
              buttonColor="bg-green-500 text-white"
              disabled={true}
              value={url}
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast.success("Copied to clipboard!", { theme: "colored" });
              }}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
