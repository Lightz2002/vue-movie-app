import { Genre } from "./IGenre";
import { Movie } from "./IMovie";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface MovieSliderProps {
  // selectedMovieSliderId: number;
  datas: Movie[];
  genres: Genre[];
}
