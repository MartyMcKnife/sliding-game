import Level from "../models/level";
import Leaderboard from "../models/leaderboard";

import { nanoid } from "nanoid";
import dbConnect from "./dbConnect";

export const getLevel = async (id: string) => {
  await dbConnect();
  return await Level.findOne({ levelID: id });
};

export const createLevel = async (
  rows: number,
  columns: number,
  image?: string
) => {
  await dbConnect();
  await Level.create({
    levelID: nanoid(6),
    rows,
    columns,
    image,
  });
};

export const getLeaderboard = async () => {
  await dbConnect();
  return await Leaderboard.find();
};

export const addToBoard = async (
  username: string,
  time: number,
  moves: number,
  levelID: number
) => {
  await dbConnect();
  await Leaderboard.create({
    username,
    time,
    moves,
    levelID,
  });
};
