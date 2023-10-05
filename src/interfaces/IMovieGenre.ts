import { Genre } from "./IGenre";
import { MoviePagination } from "./IMoviePagination";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface MovieGenres {
  movies: MoviePagination;
  genres: Genre;
}
