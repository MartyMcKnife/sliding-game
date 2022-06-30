import React from "react";

type Props = {
  value: number;
  label: string;
};

export default function ScoreInfo({ value, label }: Props) {
  return (
    <div className="flex flex-col items-end">
      <h1 className="font-bold text-xl">{value}</h1>
      <h2 className="font-bold text-xs text-gray-500">{label}</h2>
    </div>
  );
}
