import React, { useEffect } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

type Props = {
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
};

export default function UpDown({ num, setNum, className }: Props) {
  useEffect(() => {
    if (num < 1) {
      setNum(1);
    }
  }, [num]);

  return (
    <div
      className={`flex rounded-xl border border-gray-400 justify-between items-center ${className} w-max`}
    >
      <input
        type="text"
        className="w-6 h-6 text-center border-0 bg-transparent outline-none text-xl m-1"
        value={num}
        onChange={(e) => setNum(parseInt(e.target.value))}
      />
      <div className="flex flex-col justify-between items-center border-l border-gray-400">
        <button onClick={() => setNum((num += 1))}>
          <FaAngleUp size={20} />
        </button>
        <hr className="border-b w-full border-gray-400" />
        <button onClick={() => setNum((num -= 1))}>
          <FaAngleDown size={20} />
        </button>
      </div>
    </div>
  );
}
