import type { NextPage, GetServerSideProps } from "next";
import {
  addToBoard,
  createLevel,
  getLeaderboard,
  getLevel,
} from "../utils/db-handlers";
import Header from "../components/Head/Header";
import { ILeaderboard } from "models/leaderboard";
import { ILevel } from "models/level";

interface Props {
  leaderboard: ILeaderboard;
  settings: ILevel;
}

const Home: NextPage = () => {
  return (
    <div className="bg-blue-50 min-h-screen w-full">
      <Header />
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
      leaderboard: JSON.stringify(leaderboard),
      settings: JSON.stringify(settings),
    },
  };
};

export default Home;
