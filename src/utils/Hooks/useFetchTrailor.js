import { useEffect } from "react";
import { OPTIONS } from "../constants";
import { addTrailerVideos } from "../Slices/movieSlice";
import { useDispatch } from "react-redux";

export const useFetchTrailor = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMouted = true;

    async function fetchTrailor() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          OPTIONS
        );

        if (response.ok) {
          const data = await response.json();
          const trailer = data.results.find(
            (items) => items.type === "Trailer"
          );

          if (isMouted) dispatch(addTrailerVideos(trailer));
        } else {
          throw new Error("Cant fetch");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchTrailor();

    return () => (isMouted = false);
  }, [movieId]);
};
