import { useEffect, useState } from "react";
import StarRating from "./StarRating.js";

const average = (arr) =>
  arr.length === 0 ? 0 : arr.reduce((acc, cur) => acc + cur / arr.length, 0);

const KEY = "dfc2a343";

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const [query, setQuery] = useState("Black Panther");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  const handleSelectMovies = function (id) {
    setSelectedID((a) => (id = a ? null : id));
  };

  const handlecloseMovie = function () {
    setSelectedID(null);
  };

  const handleAddWatched = function (movie) {
    setWatched((watch) => [...watch, movie]);
  };

  const handleDeleteWatched = function (id) {
    setWatched((watch) => watch.filter((movie) => movie.imdbID !== id));
  };

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

  // useEffect(() => {
  //   document.addEventListener("keydown", (e) => {
  //     if (e.code === "Escape") handlecloseMovie();
  //     /*  if (e.code === "Enter") handlecloseMovie(); */
  //     console.log("pushed", e.code);
  //   });
  // }, []);

  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery} />
        {
          <p className="num-results">
            Found <strong>{movies?.length}</strong> movies
          </p>
        }
      </Navbar>
      <main className="main">
        <ListOfMoviesLeftSide
          isOpen={isOpen1}
          onIsOpen={setIsOpen1}
          movies={movies}
          isLoading={isLoading}
          error={error}
          query={query}
          handleSelectMovies={handleSelectMovies}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            {error ? <p className="error">⛔️ {error} ⛔️</p> : <LoadingSymbol />}
          </div>
        </ListOfMoviesLeftSide>

        <MoviesWatchedRightSide
          avgImdbRating={avgImdbRating}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
          isOpen2={isOpen2}
          setIsOpen2={setIsOpen2}
          watched={watched}
          selectedID={selectedID}
          handleSelectMovies={handleSelectMovies}
          handlecloseMovie={handlecloseMovie}
          handleAddWatched={handleAddWatched}
          handleDeleteWatched={handleDeleteWatched}
        />
      </main>
    </>
  );
}

// Components

const Navbar = ({ children }) => (
  <nav className="nav-bar">
    <Logo />
    {children}
  </nav>
);

const ListOfMoviesLeftSide = ({
  isOpen,
  onIsOpen,
  movies,
  children,
  isLoading,
  query,
  handleSelectMovies,
}) => (
  <div className="box" style={{ backgroundColor: "#262627" }}>
    <Button onClick={() => onIsOpen((open) => !open)}>
      {isOpen ? "–" : "++"}
    </Button>

    {query !== "" && isOpen && (
      <DisplayListOfMovies
        movies={movies}
        handleSelectMovies={handleSelectMovies}
      />
    )}
    {isOpen && isLoading && children}
  </div>
);

const MoviesWatchedRightSide = ({
  avgImdbRating,
  avgUserRating,
  avgRuntime,
  isOpen2,
  setIsOpen2,
  watched,
  selectedID,
  handleSelectMovies,
  handlecloseMovie,
  handleAddWatched,
  handleDeleteWatched,
}) => (
  <div className="box" style={{ backgroundColor: "#262627" }}>
    <Button onClick={() => setIsOpen2((open) => !open)}>
      {isOpen2 ? "–" : "+"}
    </Button>
    {isOpen2 && selectedID ? (
      <MovieDetails
        selectedID={selectedID}
        onCloseMovie={handlecloseMovie}
        onAddWatchedMovie={handleAddWatched}
        watched={watched}
        handleDeleteWatched={handleDeleteWatched}
        handlecloseMovie={handlecloseMovie}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <LoadingSymbol />
        </div>
      </MovieDetails>
    ) : (
      <>
        <Summary
          avgImdbRating={avgImdbRating}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
          watched={watched}
        />
        <DisplayListOfWatchedMovies
          watched={watched}
          handleSelectMovies={handleSelectMovies}
          handleDeleteWatched={handleDeleteWatched}
        />
      </>
    )}
  </div>
);

const Summary = ({ avgImdbRating, avgUserRating, avgRuntime, watched }) => (
  <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} (movies)</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating.toFixed(1)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating.toFixed(1)}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime.toFixed(0)} min</span>
      </p>
    </div>
  </div>
);

const Button = ({ children, onClick }) => (
  <button className="btn-toggle" onClick={onClick}>
    {children}
  </button>
);

const SearchBar = ({ query, setQuery }) => (
  <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
);

const Logo = () => (
  <div className="logo">
    <span role="img">🎥</span>
    <h1>MovieFlix</h1>
  </div>
);

const DisplayListOfMovies = ({ movies, handleSelectMovies }) => (
  <ul className="list list-movies">
    {movies?.map((movie) => (
      <MovieListLeftSide key={movie.imdbID}>
        <li onClick={() => handleSelectMovies(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      </MovieListLeftSide>
    ))}
  </ul>
);

const DisplayListOfWatchedMovies = ({ watched, handleDeleteWatched }) => (
  <ul className="list">
    {watched.map((movie) => (
      <WatchedMovieList
        key={movie.imdbID}
        handleDeleteWatched={handleDeleteWatched}
      >
        <li>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => handleDeleteWatched(movie.imdbID)}
            >
              X
            </button>
          </div>
        </li>
      </WatchedMovieList>
    ))}
  </ul>
);

const LoadingSymbol = function () {
  return (
    <>
      <div className="spinner">
        <div className="spinnerin"></div>
      </div>
    </>
  );
};

const MovieDetails = function ({
  selectedID,
  onCloseMovie,
  children,
  onAddWatchedMovie,
  watched,
  handlecloseMovie,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
  const watchedUserrating = watched.find(
    (movie) => movie.imdbID === selectedID,
  )?.userRating;

  const handleAdd = function () {
    if (!movie) return;

    const newWatchedMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Poster: movie.Poster,
      runtime: Number(movie.Runtime.replace(" min", "")),
      imdbRating: +movie.imdbRating,
      userRating: userRating || 0,
    };

    onAddWatchedMovie(newWatchedMovie);
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") handlecloseMovie();
    });
    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.code === "Escape") handlecloseMovie();
      });
    };
  }, [handlecloseMovie]);

  useEffect(() => {
    const getMovieDetails = async function () {
      try {
        setIsLoading(true);

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`,
        );

        if (!response.ok) throw new Error("Failed to fetch movie");

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!selectedID) return;

    getMovieDetails();
  }, [selectedID]);

  useEffect(() => {
    document.title =
      movie.Title === undefined ? "Loading title..." : `Movie: ${movie.Title}`;
    return () => {
      document.title = "MovieFlix";
    };
  }, [movie.Title]);

  return (
    <div className="details">
      {isLoading ? (
        children
      ) : movie ? (
        <>
          <header>
            <img
              src={movie.Poster}
              alt={`Poster of the movie (${movie.Title})`}
            />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDB RATING
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    color="orange"
                    onSetRating={setUserRating}
                    size={25}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => {
                        handleAdd();
                        onCloseMovie();
                      }}
                    >
                      + add to list
                    </button>
                  )}
                </>
              ) : (
                <center>
                  <p>
                    You already rated this movie {watchedUserrating} stars ⭐️
                  </p>
                </center>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring: {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      ) : null}

      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
    </div>
  );
};

/* const MovieDetails = function ({
  selectedID,
  onCloseMovie,
  children,
  onAddWatchedMovie,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = function () {
    const newWatchedMovie = {
      imdbRating: selectedID,
    };
    onAddWatchedMovie(newWatchedMovie);
  };

  useEffect(() => {
    const getMovieDetails = async function () {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`,
        );
        const data = await response.json();
        setMovie((a) => (a = data));
        console.log(data, "hello data");
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getMovieDetails();
  }, [selectedID]);
  return (
    <>
      <div className="details">
        {isLoading ? (
          children
        ) : (
          <>
            <header>
              <img
                src={movie.Poster}
                alt={`Poster of the movie (${movie.Title})`}
              />
              <div className="details-overview">
                <h2>{movie.Title}</h2>
                <p>
                  {movie.Released} &bull; {movie.Runtime}
                </p>
                <p>{movie.Genre}</p>
                <p>
                  <span>⭐️</span>
                  {movie.imdbRating} IMDB RATING
                </p>
              </div>
            </header>

            <section>
              <div className="rating">
                <StarRating />
                <button className="btn-add" onClick={handleAdd}>
                  + add to list
                </button>
              </div>
              <p>
                <em>{movie.Plot}</em>
              </p>
              <p>Starring: {movie.Actors}</p>
              <p>Directed by {movie.Director}</p>
            </section>
          </>
        )}
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
      </div>
    </>
  );
};
 */

const MovieListLeftSide = ({ children }) => <>{children}</>;
const WatchedMovieList = ({ children }) => <>{children}</>;

export default App;

/// Challenge Currency converter 👇

/* export default function AppThree() {
  const [moneyInput, setMoneyInput] = useState(1);
  const [changeCurrencyFROM, setChangeCurrencyFROM] = useState("EUR");
  const [changeCurrencyTO, setChangeCurrencyTO] = useState("USD");
  const [convertedValue, setConvertedValue] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCurrencyConverter = async function () {
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${+moneyInput}&from=${changeCurrencyFROM}&to=${changeCurrencyTO}`,
        );

        const data = await response.json();
        if (data.message) throw new Error(data.message);

        const {
          rates: { [changeCurrencyTO]: convertRate },
        } = data;

        setConvertedValue(convertRate);
        console.log(data);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      }
    };

    getCurrencyConverter();
  }, [changeCurrencyFROM, changeCurrencyTO, moneyInput]);

  return (
    <div className="App">
      <input
        type="text"
        value={moneyInput}
        onChange={(e) => setMoneyInput(e.target.value)}
      />
      <h3>From</h3>{" "}
      <select
        value={changeCurrencyFROM}
        onChange={(e) => setChangeCurrencyFROM(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <h3>To</h3>{" "}
      <select
        value={changeCurrencyTO}
        onChange={(e) => setChangeCurrencyTO(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <h1>
        {String(moneyInput).length >= 1 && !String(moneyInput).includes("-")
          ? `${changeCurrencyTO}: ${Number(convertedValue).toFixed(2)}`
          : error}
      </h1>
    </div>
  );
}
 */
