import { addToBoard } from "./../../utils/db-handlers";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, time, moves, id } = req.body as {
      [key: string]: string;
    };
    try {
      await addToBoard(username, parseInt(time), parseInt(moves), id);
      res.status(200).json({ message: "Success" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error", error: err });
    }
  }
}
