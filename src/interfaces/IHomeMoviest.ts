import { MoviePagination } from "./IMoviePagination";
import { NowPlayingMovies } from "./INowPlayingMovies";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface HomeMovies {
  weeklyTrendingMovies: MoviePagination;
  topRatedMovies: MoviePagination;
  nowPlayingMovies: NowPlayingMovies;
}
