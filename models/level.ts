import mongoose, { model, Schema } from "mongoose";

export interface ILevel {
  levelID: string;
  rows: number;
  columns: number;
  image?: string;
}

const SLevel = new Schema<ILevel>({
  levelID: { type: String, required: true },
  rows: { type: Number, required: true },
  columns: { type: Number, required: true },
  image: { type: String, required: false },
});

//@ts-expect-error
mongoose.models = {};

const Level = model<ILevel>("Level", SLevel);

export default Level;
