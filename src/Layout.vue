<script setup lang="ts">
import { ref, onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import MovieSlider from "./components/MovieSlider/MovieSlider.vue";
import MovieList from "./components/MovieList/MovieList.vue";

import {
  getGenres,
  getNowPlayingMovies,
  getWeeklyTrendingMovies,
  getTopRatedMovies,
} from "./utils/api";
import { handleError } from "./utils/helper";
import { Genre } from "./interfaces/IGenre";
import { MoviePagination } from "./interfaces/IMoviePagination";
import { Movie } from "./interfaces/IMovie";

type MovieOrNull = Movie[] | [];
const genres = ref<Genre[]>([]);
const genresLoaded = ref(false);
const topRatedMovies = ref<MovieOrNull>([]);
const weeklyTrendingMovies = ref<MovieOrNull>([]);
const nowPlayingMovies = ref<MovieOrNull>([]);
const moviesLoaded = ref(false);

onMounted(async () => {
  try {
    const res = await getGenres();
    genres.value = res.genres;
    genresLoaded.value = true;

    console.log("Genres data fetched:", genres.value);

    const res2 = (await getNowPlayingMovies()) as MoviePagination;
    nowPlayingMovies.value = res2?.results;

    const res3 = (await getWeeklyTrendingMovies()) as MoviePagination;
    weeklyTrendingMovies.value = res3?.results;

    const res4 = (await getTopRatedMovies()) as MoviePagination;
    topRatedMovies.value = res4?.results;
    moviesLoaded.value = true;
  } catch (error) {
    genres.value = [];
    handleError(error);
  }
});
</script>

<template>
  <div class="min-h-screen scroll-smooth">
    <Navbar />

    <Sidebar v-if="genresLoaded" :genres="genres" />
    <div class="md:ml-48" v-if="moviesLoaded">
      <div v-if="nowPlayingMovies" class="p-4 px-8 relative rounded-tl-md">
        <div class="absolute inset-0 bg-gray-800"></div>

        <!-- Slider List  -->
        <MovieSlider :datas="nowPlayingMovies" :genres="genres" />

        <!-- Trending and Top Rated Movie -->
        <div class="relative text-white">
          <MovieList
            v-if="weeklyTrendingMovies"
            title="Weekly Trending Movies"
            :datas="weeklyTrendingMovies"
          />
          <MovieList
            v-if="topRatedMovies"
            title="Top Rated Movies"
            :datas="topRatedMovies"
          />
        </div>
      </div>
    </div>
  </div>
</template>
