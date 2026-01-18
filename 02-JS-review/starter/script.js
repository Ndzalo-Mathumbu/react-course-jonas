const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

///// Destructuring /////

const book = getBook(2);
const { title, author, pages, genres } = book;
console.log(title, author, pages, genres);

const [one, two, ...rest] = genres;
console.log(one, two, ...rest);

const numbers = [1, 2, 3, 4, 5];
const number2 = [6, 7, 8, 9, 10];
const moreNumbers = [...numbers, ...number2];
const [num1, ...other] = moreNumbers;
console.log(num1, ...other);

const bookUpdate = {
  ...book,
  moviePublicationDate: "2002-4-5",
  pages: 5678,
};
bookUpdate;

const person = {
  firstname: "Ndzalo NK",
  lastname: "Mathumbu",
  age: 19,
  gender: "male",
};

const morePersonInfo = {
  ...person,
  race: "African",
  age: 20,
};

///// Tenary Operator /////

const personInfo = `${morePersonInfo.firstname} ${
  morePersonInfo.lastname
} is an ${morePersonInfo.race} ${morePersonInfo.gender} at the age of ${
  morePersonInfo.age - 1
}`;

const tenary = morePersonInfo.age > 10 ? "older than 10" : "younger than 10";
tenary;
personInfo;

///// Arrow Fuctions /////

const calculateAge = (birthYear) => new Date().getFullYear() - birthYear;

const personAge = calculateAge(2006);
// const makePositive = Math.abs(personAge);
// makePositive;
personAge;

///// Short-Circuiting and Logical Operators /////

//// AND (&&) Operator | Only takes a falsey values it avoids true values.

console.log(undefined && 10);
console.log(10 && undefined);
let boy = true;
let girl = false;
console.log(`the boy is ${boy} (TRUE)` && `the girl is ${girl} (FALSE)`);

//// OR (||) Operator | Only takes a truethy values it avoids false values. Opposite of AND (&&)

console.log(undefined || 10);
console.log(10 || undefined);
let man = true;
let woman = false;
console.log(`the boy is ${man} (TRUE)` || `the girl is ${woman} (FALSE)`);
