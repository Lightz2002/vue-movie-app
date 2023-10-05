import { handleError } from "./helper";

// const baseUrl = "http://localhost:3030";
const baseUrl = "https://api.tmdb-proxy.com.ryankenidy.site";

async function fetchData(url: string, options?: FetchOptions) {
  return fetch(url, options).then(response => response.json());
}

export async function getGenres() {
  try {
    const url = `${baseUrl}/api/genre`;

    const response = await fetchData(url);

    return response;
  } catch (error: unknown) {
    handleError(error);
  }
}

export async function getNowPlayingMovies(options?: FetchParam) {
  try {
    const url = `${baseUrl}/api/movie/now_playing?language=${options?.language}&page=${options?.page}`;

    const response = await fetchData(url);

    return response;
  } catch (error: unknown) {
    handleError(error);
  }
}

export async function getWeeklyTrendingMovies() {
  try {
    const url = `${baseUrl}/api/movie/trending`;

    const response = await fetchData(url);

    return response;
  } catch (error: unknown) {
    handleError(error);
  }
}

export async function getTopRatedMovies(options?: FetchParam) {
  try {
    const url = `${baseUrl}/api/movie/top_rated?language=${options?.language}&page=${options?.page}`;

    const response = await fetchData(url);

    return response;
  } catch (error: unknown) {
    handleError(error);
  }
}
