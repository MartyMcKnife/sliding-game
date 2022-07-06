import { getImgRowsCols, getImg } from "./../../utils/image";
import { createLevel } from "./../../utils/db-handlers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { imageURL, rows, cols } = req.body as {
      [key: string]: string;
    };
    try {
      const dimensions = imageURL
        ? await getImgRowsCols(await getImg(imageURL))
        : { rows: parseInt(rows), cols: parseInt(cols) };
      const level = await createLevel(
        dimensions.rows,
        dimensions.cols,
        imageURL
      );

      res.status(200).json({ id: level.levelID });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
