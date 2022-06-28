import type { NextPage } from "next";
import Header from "../components/Head/Header";

const Home: NextPage = () => {
  return (
    <div className="bg-blue-50 min-h-screen w-full">
      <Header />
    </div>
  );
};

export default Home;
