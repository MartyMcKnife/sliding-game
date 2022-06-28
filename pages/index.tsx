import type { NextPage } from "next";
import Header from "../components/Head/Header";

const Home: NextPage = () => {
  return (
    <div className="bg-gradient-to-l from-blue-200 to-blue-100 min-h-screen w-full">
      <Header />
    </div>
  );
};

export default Home;
