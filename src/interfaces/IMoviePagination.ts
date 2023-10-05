import { Movie } from "./IMovie";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface MoviePagination {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
