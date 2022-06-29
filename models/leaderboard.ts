import mongoose, { Document, model, Schema } from "mongoose";

export interface ILeaderboard extends Document {
  username: string;
  moves: number;
  times: number;
  levelID: string;
}

const SLeaderboard = new Schema<ILeaderboard>({
  username: { type: String, required: true },
  moves: { type: Number, required: true },
  times: { type: Number, required: true },
  levelID: { type: String, required: true },
});

//@ts-expect-error
mongoose.models = {};

const Leaderboard = model<ILeaderboard>("Leaderboard", SLeaderboard);

export default Leaderboard;
