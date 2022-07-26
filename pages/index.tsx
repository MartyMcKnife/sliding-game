import type { NextPage, GetServerSideProps } from "next";
import { createLevel, getLeaderboard } from "../utils/db-handlers";
import Header from "../components/Head/Header";
import LeaderboardButton from "../components/Leaderboard/LearboardButton";
import ScoreContainer from "../components/ScoreInfo/ScoreContainer";
import { ILeaderboard } from "models/leaderboard";
import { ILevel } from "models/level";
import { useState, useEffect } from "react";
import Gameboard from "../components/Game/Gameboard";
import Success from "../components/Game/Success";
import { AnimatePresence } from "framer-motion";
import Footer from "../components/Footer/Footer";
import { Images } from "../utils/image";

interface Props {
  leaderboardU: string;
  settingsU: string;
  imagesU?: string;
}

const Home: NextPage<Props> = ({ leaderboardU, settingsU, imagesU }) => {
  const leaderboard: ILeaderboard[] = JSON.parse(leaderboardU);
  const settings: ILevel = JSON.parse(settingsU);
  const images: Images[][] | undefined = imagesU && JSON.parse(imagesU);

  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (moves >= 0) {
      setStartTime(true);
    }
  }, [moves]);

  useEffect(() => {
    //Increase our time every second
    const token = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    if (success) {
      //Stop timing if we win
      clearInterval(token);
    }

    //Clean up our timer so we don't cause a memory leak
    return () => clearInterval(token);
  }, [time, setTime, success]);

  return (
    <div className="bg-blue-50 min-h-screen w-full font-site">
      <Header />
      <main className="max-w-xl mx-auto mt-4">
        <section id="info" className="flex justify-between items-end">
          <LeaderboardButton leaderboard={leaderboard} />
          <ScoreContainer moves={moves} time={time} />
        </section>
        <section id="board">
          <Gameboard
            level={settings}
            setMoves={setMoves}
            setSuccess={setSuccess}
            success={success}
            images={images}
          />
          <AnimatePresence>
            {success && (
              <Success
                onClose={() => {
                  setSuccess(!success);
                }}
                level={settings}
                time={time}
                moves={moves}
              />
            )}
          </AnimatePresence>
        </section>
      </main>
      <Footer level={settings} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const leaderboard = await getLeaderboard();
  // Check if we have been given a board id
  // Otherwise create a default board
  const settings = await createLevel(4, 4);

  return {
    props: {
      leaderboardU: JSON.stringify(leaderboard),
      settingsU: JSON.stringify(settings),
    },
  };
};

export default Home;
