import React from "react";

type Props = {
  username: string;
  score: number;
  levelID: string;
};

export default function LeaderItem({ username, score, levelID }: Props) {
  return (
    <>
      <p className="place-self-start">{username}</p>
      <p className="place-self-center">{score.toLocaleString()}</p>
      <a
        href={`/id//${levelID}`}
        target="_blank"
        rel="noreferrer"
        className="italic underline place-self-end"
      >
        View Level
      </a>
    </>
  );
}
