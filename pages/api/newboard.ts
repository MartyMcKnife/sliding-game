import { getImgRowsCols, getImg } from "./../../utils/image";
import { createLevel } from "./../../utils/db-handlers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { imageURL } = req.body as {
      [key: string]: string;
    };
    try {
      const dimensions = await getImgRowsCols(await getImg(imageURL));
      const level = await createLevel(
        dimensions.rows,
        dimensions.cols,
        imageURL
      );
      res.status(200).json({ val: level });
      // res.redirect(302, `/?id=${level}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error", error: err });
    }
  }
}
