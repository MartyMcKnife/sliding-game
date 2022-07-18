import React, { useState, useEffect } from "react";
import { usePhotos } from "../../utils/hooks";
import { ToastContainer, toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import ImageItem from "./ImageItem";
import SearchBar from "./SearchBar";
import Masonry from "react-masonry-css";

type Props = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  curImg: string;
};

export default function UnsplashContainer({ setImage, curImg }: Props) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const { images, isLoading, isError } = usePhotos(index, query);

  useEffect(() => {
    if (isError) {
      toast.error("Unexpected error occurred!", { theme: "colored" });
    }
  }, [isError]);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <h4 className="text-xs font-bold text-gray-400 mb-4 text-center">
        Images sourced from Unsplash
      </h4>
      <SearchBar query={query} setQuery={setQuery} />
      {isLoading || isError ? (
        <MoonLoader size={32} color="blue" className="mx-auto mt-4" />
      ) : (
        <Masonry
          breakpointCols={3}
          className="flex w-auto gap-2 mt-4"
          columnClassName="bg-clip-padding"
        >
          {images?.results.map((image) => (
            <ImageItem
              key={image.id}
              imageURL={image.urls.small}
              imageName={image.description}
              author={image.user.name}
              authorLink={image.user.portfolio_url}
              setImage={setImage}
              curImage={curImg}
            />
          ))}
        </Masonry>
      )}
    </>
  );
}
