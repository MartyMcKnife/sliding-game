import type { NextPage, GetServerSideProps } from "next";
import { createLevel, getLeaderboard, getLevel } from "../utils/db-handlers";
import Header from "../components/Head/Header";
import LeaderboardButton from "../components/Leaderboard/LearboardButton";
import { ILeaderboard } from "models/leaderboard";
import { ILevel } from "models/level";

interface Props {
  leaderboardU: string;
  settingsU: string;
}

const Home: NextPage<Props> = ({ leaderboardU, settingsU }) => {
  const leaderboard: ILeaderboard[] = JSON.parse(leaderboardU);
  const settings: ILevel = JSON.parse(settingsU);
  return (
    <div className="bg-blue-50 min-h-screen w-full font-site">
      <Header />
      <section id="info">
        <LeaderboardButton leaderboard={leaderboard} />
      </section>
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
