import { useEffect, useState } from "react";

const average = (arr) =>
  arr.length === 0 ? 0 : arr.reduce((acc, cur) => acc + cur / arr.length, 0);

const KEY = "dfc2a343";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const [query, setQuery] = useState("Black panther");
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

  useEffect(() => {
    const getMovieData = async function () {
      try {
        setIsLoading((a) => (a = true));
        setError("");
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
        );

        if (!response.ok) throw new Error("Something went unexpected.😕");
        const data = await response.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovies(data.Search);
        console.log(data.Search);
        setIsLoading((a) => (a = false));
      } catch (err) {
        console.error(err.message);
        setError((a) => (a = err.message));
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
  }, [query]);

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
  <div className="box">
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
}) => (
  <div className="box">
    <Button onClick={() => setIsOpen2((open) => !open)}>
      {isOpen2 ? "–" : "+"}
    </Button>
    {isOpen2 && selectedID ? (
      <MovieDetails selectedID={selectedID} onCloseMovie={handlecloseMovie} />
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

const DisplayListOfWatchedMovies = ({ watched }) => (
  <ul className="list">
    {watched.map((movie) => (
      <WatchedMovieList key={movie.imdbID}>
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

const MovieDetails = function ({ selectedID, onCloseMovie }) {
  return (
    <>
      <div className="details">
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        {selectedID}
      </div>
    </>
  );
};

const MovieListLeftSide = ({ children }) => <>{children}</>;
const WatchedMovieList = ({ children }) => <>{children}</>;
