import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

type Props = {
  imageURL: string;
  imageName: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  curImage: string;
  author: string;
  authorLink: string;
};

export default function ImageItem({
  imageURL,
  imageName,
  setImage,
  author,
  authorLink,
  curImage,
}: Props) {
  return (
    <div className="gap-y-2 cursor-pointer mt-2">
      <img
        src={imageURL}
        alt={imageName}
        className={`object-cover rounded-xl ${
          curImage === imageURL ? "border-2 border-blue-600" : ""
        }`}
        //Hacky way to unset the image url
        //If it has been set, and we are clicking on the same image, we clear the selection
        onClick={() => setImage((i) => (i === imageURL ? "" : imageURL))}
      />
      <div className="flex justify-between items-center">
        <a href={authorLink} className="text-gray-400 text-sm">
          {author}
        </a>
        <a href={imageURL}>
          <FaExternalLinkAlt className="text-gray-400" size={12} />
        </a>
      </div>
    </div>
  );
}
