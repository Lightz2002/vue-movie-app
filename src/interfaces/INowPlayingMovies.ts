import { MoviePagination } from "./IMoviePagination";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface NowPlayingMovies extends MoviePagination {
  dates: {
    maximum: string;
    minimum: string;
  };
}
