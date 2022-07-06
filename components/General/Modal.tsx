import React, { useRef, ReactElement } from "react";
import { motion } from "framer-motion";
import useOnClickOutside from "use-onclickoutside";
import Button from "./Button";

type Props = {
  children?: ReactElement | ReactElement[];
  title: string;
  onClose: () => void;
  confirmButton?: ReactElement;
};

export default function Modal({
  children,
  title,
  onClose,
  confirmButton,
}: Props) {
  //Ref to handle clicking outside the info box
  const wrapRef = useRef(null);
  useOnClickOutside(wrapRef, onClose);

  return (
    <motion.section
      id="modal"
      className="fixed bg-black bg-opacity-60 flex items-center justify-center top-0 left-0 w-full h-full z-10"
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100vh", opacity: 0 }}
        className="bg-white max-w-2xl w-full max-h-[95vh] rounded-lg p-4 overflow-y-auto "
        ref={wrapRef}
      >
        <h1 className="font-bold text-4xl">{title}</h1>
        {children}
        <div className="flex justify-end items-center mt-2">
          <Button
            onClick={onClose}
            className="ml-auto px-3 py-1 rounded-lg bg-red-600 text-white font-bold text-sm"
            text="Close"
          />

          {confirmButton}
        </div>
      </motion.div>
    </motion.section>
  );
}
