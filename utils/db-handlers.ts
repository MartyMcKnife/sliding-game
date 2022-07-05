import { calcActual } from "./leaderboardCalcs";
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

  //Store our id in a variable so we can return it
  const levelID = nanoid(6);

  // Check to see if a level with the same settings has already been stored in the DB

  //We return the level object so we have a copy of the object

  const results = await Level.findOne({ rows, columns, image });

  if (results) {
    return results;
  } else {
    await Level.create({
      levelID,
      rows,
      columns,
      image,
    });

    return { levelID, rows, columns, image };
  }
};

export const getLeaderboard = async () => {
  await dbConnect();
  const leadboard = await Leaderboard.find();
  return leadboard.sort((a, b) => b.score - a.score);
};

export const addToBoard = async (
  username: string,
  time: number,
  moves: number,
  levelID: string
) => {
  await dbConnect();
  await Leaderboard.create({
    username,
    score: calcActual(time, moves),
    levelID,
  });
};
