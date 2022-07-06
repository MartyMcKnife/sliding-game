import axios from "axios";
import Jimp from "jimp";

export type Images = { num: number; imgBuf: Buffer };

export const getImg = async (url: string) => {
  return Buffer.from(
    (await axios.get(url, { responseType: "arraybuffer" })).data
  );
};

export const getImgRowsCols = async (imgBuf: Buffer) => {
  const img = await Jimp.read(imgBuf);
  return {
    cols: Math.floor(img.getWidth() / 80),
    rows: Math.floor(img.getHeight() / 80),
  };
};

export const processImage = async (img: Buffer) => {
  //Read our image
  const procImg = await Jimp.read(img);

  //Get its width and height
  const width = procImg.getWidth();
  const height = procImg.getHeight();

  //Calculate the amount of rows and columns
  const rows = Math.floor(height / 80);
  const cols = Math.floor(width / 80);

  //Create a new image with the correct size
  //It should take that part of the image that we want to use
  let arr: Images[][] = [];
  let total = 0;
  for (let i = 0; i < rows; i++) {
    let tempArr: Images[] = [];
    for (let j = 0; j < cols; j++) {
      //Get the part of the image that we want to use
      //We also read it to a buffer so we can use it later
      const imgBuf = await procImg
        .clone()
        .crop(j * 80, i * 80, 80, 80)
        .getBufferAsync(Jimp.MIME_PNG);

      //We keep track of the number of images to make validating the gameboard easier
      //We will have two boards in use in this case - one which the player sees (and has the image),
      //and a logically array which will just have the numbers
      const num = total;
      tempArr.push({ num, imgBuf });
      total += 1;
    }
    arr.push(tempArr);
  }

  return arr;
};
