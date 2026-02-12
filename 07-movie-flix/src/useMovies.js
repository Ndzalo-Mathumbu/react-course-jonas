import { useState, useEffect } from "react";

const useMovies = function (query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const KEY = "dfc2a343";
  useEffect(() => {
    const controller = new AbortController();

    const getMovieData = async function () {
      try {
        setIsLoading((a) => (a = true));
        setError("");
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal },
        );

        if (!response.ok) throw new Error("Something went unexpected.😕");
        const data = await response.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovies(data.Search);
        /*  console.log(data.Search); */
        setIsLoading((a) => (a = false));
      } catch (err) {
        console.log(err.message);
        if (err.name !== "AbortError") setError((a) => (a = err.message));
      } finally {
        /*  setIsLoading((a) => (a = false)); */
      }
    };
    if (!query.length) {
      setMovies([]);
      setError("");
      return;
    }
    getMovieData();
    return () => {
      controller.abort();
    };
  }, [query]);
  return [movies, isLoading, error, KEY];
};
export default useMovies;
