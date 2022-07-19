import { UnsplashImage } from "./../interfaces/unsplash";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const usePhotos = (index: number, query: string) => {
  const { data, error } = useSWR<UnsplashImage>(
    `https://api.unsplash.com/search/photos?page=${index}&query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS}&per_page=15`,
    fetcher
  );
  return {
    images: data,
    isLoading: !error && !data,
    isError: error,
  };
};
