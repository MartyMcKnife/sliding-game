import mongoose, { model, Schema } from "mongoose";

export interface ILeaderboard {
  username: string;
  score: number;
  levelID: string;
}

const SLeaderboard = new Schema<ILeaderboard>({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  levelID: { type: String, required: true },
});

//@ts-expect-error
mongoose.models = {};

const Leaderboard = model<ILeaderboard>("Leaderboard", SLeaderboard);

export default Leaderboard;
