import type { NextPage, GetServerSideProps } from "next";
import { createLevel, getLeaderboard, getLevel } from "../utils/db-handlers";
import Header from "../components/Head/Header";
import LeaderboardButton from "../components/Leaderboard/LearboardButton";
import ScoreContainer from "../components/ScoreInfo/ScoreContainer";
import { ILeaderboard } from "models/leaderboard";
import { ILevel } from "models/level";
import { useState } from "react";
import Gameboard from "../components/Game/Gameboard";

interface Props {
  leaderboardU: string;
  settingsU: string;
}

const Home: NextPage<Props> = ({ leaderboardU, settingsU }) => {
  const leaderboard: ILeaderboard[] = JSON.parse(leaderboardU);
  const settings: ILevel = JSON.parse(settingsU);

  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [success, setSuccess] = useState(false);

  return (
    <div className="bg-blue-50 min-h-screen w-full font-site">
      <Header />
      <main className="max-w-xl mx-auto mt-4">
        <section id="info" className="flex justify-between items-end">
          <LeaderboardButton leaderboard={leaderboard} />
          <ScoreContainer moves={moves} time={time} setTime={setTime} />
        </section>
        <section id="board">
          <Gameboard
            level={settings}
            setMoves={setMoves}
            setSuccess={setSuccess}
          />
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const leaderboard = await getLeaderboard();
  // Check if we have been given a board id
  // Otherwise create a default board
  const settings = context.query.id
    ? //@ts-ignore
      await getLevel(context.query.id)
    : await createLevel(4, 4);

  return {
    props: {
      leaderboardU: JSON.stringify(leaderboard),
      settingsU: JSON.stringify(settings),
    },
  };
};

export default Home;
