<script setup lang="ts">
import { MovieListProps } from "../../interfaces/IMovieListProps";
import MovieListItem from "./MovieListItem.vue";

const props = defineProps<MovieListProps>();

const { datas, title } = props;
</script>

<template>
  <div className="grid grid-cols-2 md:grid-cols-4  gap-8 items-start py-8">
    <h3 className="font-bold text-xl col-span-full">{{ title }}</h3>

    <MovieListItem v-for="data in datas" :key="data.id" :movie="data" />
  </div>
</template>
