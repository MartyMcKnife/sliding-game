import React from "react";

type Props = {
  username: string;
  score: number;
  levelID: string;
};

export default function LeaderItem({ username, score, levelID }: Props) {
  return (
    <div className="flex justify-between items-center w-full text-sm">
      <p>{username}</p>
      <p>{score.toLocaleString()}</p>
      <a
        href={`/id//${levelID}`}
        target="_blank"
        rel="noreferrer"
        className="italic underline"
      >
        View Level
      </a>
    </div>
  );
}
