import { useState } from "react";

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

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [query, setQuery] = useState("");
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery} />
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </Navbar>
      <main className="main">
        <ListOfMoviesLeftSide
          isOpen={isOpen1}
          onIsOpen={setIsOpen1}
          movie={movies}
        />
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

const Navbar = function ({ children }) {
  return (
    <>
      <nav className="nav-bar">
        {" "}
        <Logo />
        {children}
      </nav>
    </>
  );
};

const ListOfMoviesLeftSide = function ({ isOpen, onIsOpen, movie }) {
  return (
    <>
      <div className="box">
        <Button onClick={() => onIsOpen((open) => !open)}>
          {isOpen ? "–" : "++"}
        </Button>
        {isOpen && <DisplayListOfMovies movie={movie} />}
      </div>
    </>
  );
};

const MoviesWatchedRightSide = function ({
  avgImdbRating,
  avgUserRating,
  avgRuntime,
  isOpen2,
  setIsOpen2,
  watched,
}) {
  return (
    <>
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
    </>
  );
};

const Summary = function ({
  avgImdbRating,
  avgUserRating,
  avgRuntime,
  watched,
}) {
  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length}(movies)</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime}(min)</span>
          </p>
        </div>
      </div>
    </>
  );
};

const Button = function ({ children, onClick }) {
  return (
    <>
      {" "}
      <button className="btn-toggle" onClick={onClick}>
        {children}
      </button>
    </>
  );
};

const SearchBar = function ({ query, setQuery }) {
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
};

const Logo = function () {
  return (
    <div className="logo">
      <span role="img">🎥</span>
      <h1>MovieFlix</h1>
    </div>
  );
};

const DisplayListOfMovies = function ({ movie }) {
  return (
    <>
      <ul className="list">
        {movie?.map((movie) => (
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
    </>
  );
};

const DisplayListOfWatchedMovies = function ({ watched }) {
  return (
    <>
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
    </>
  );
};

const MovieListLeftSide = function ({ children }) {
  return <>{children}</>;
};

const WatchedMovieList = function ({ children }) {
  return <>{children}</>;
};
