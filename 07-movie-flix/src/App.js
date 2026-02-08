import { useEffect, useState } from "react";

const tempMovieData = [
  {
    imdbID: crypto.randomUUID(),
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: crypto.randomUUID(),
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: crypto.randomUUID(),
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
  {
    imdbID: crypto.randomUUID(),
    Title: "Fast & Furious 9",
    Year: "2019",
    Poster:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/F9_film_poster.jpg/250px-F9_film_poster.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: crypto.randomUUID(),
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: crypto.randomUUID(),
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) => arr.reduce((acc, cur) => acc + cur / arr.length, 0);

const KEY = "dfc2a343";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  useEffect(() => {
    const getMovieData = async function () {
      try {
        setIsLoading((a) => (a = true));
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=cars`,
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
    getMovieData();
  }, []);

  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery} />
        {
          <p className="num-results">
            Found <strong>{movies?.length}</strong> results
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
        >
          <center>
            {error ? <p className="error">⛔️ {error} ⛔️</p> : <LoadingSymbol />}
          </center>
        </ListOfMoviesLeftSide>

        <MoviesWatchedRightSide
          avgImdbRating={avgImdbRating}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
          isOpen2={isOpen2}
          setIsOpen2={setIsOpen2}
          watched={watched}
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
  error,
}) => (
  <div className="box">
    <Button onClick={() => onIsOpen((open) => !open)}>
      {isOpen ? "–" : "++"}
    </Button>
    {isOpen && <DisplayListOfMovies movies={movies} />}
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
}) => (
  <div className="box">
    <Button onClick={() => setIsOpen2((open) => !open)}>
      {isOpen2 ? "–" : "+"}
    </Button>
    {isOpen2 && (
      <>
        <Summary
          avgImdbRating={avgImdbRating}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
          watched={watched}
        />
        <DisplayListOfWatchedMovies watched={watched} />
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

const DisplayListOfMovies = ({ movies }) => (
  <ul className="list">
    {movies?.map((movie) => (
      <MovieListLeftSide key={movie.imdbID}>
        <li>
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
      <div class="spinner">
        <div class="spinnerin"></div>
      </div>
    </>
  );
};

const MovieListLeftSide = ({ children }) => <>{children}</>;
const WatchedMovieList = ({ children }) => <>{children}</>;
