<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { MovieSliderItemProps } from "../../interfaces/IMovieSliderItemProps";
import { getImageUrl } from "../../utils/helper";

const props = defineProps<MovieSliderItemProps>();
const emits = defineEmits();

const selectMovie = () => {
  emits("selectedMovie", props.index);
};
</script>

<template>
  <div
    className="select-none hover:cursor-pointer  transition-all"
    @click="selectMovie"
  >
    <div className="img-container relative z-[99] w-16">
      <img
        className="w-full rounded-md hover:cursor-pointer"
        :src="getImageUrl(props.movie.poster_path)"
        :alt="`${props.movie.original_title}`"
      />

      <div
        :className="`absolute inset-0 rounded-lg ${
          props.index === props.selectedMovieSliderId
            ? ''
            : 'bg-[rgba(0,0,0,0.5)]'
        } hover:bg-transparent transition-all`"
      ></div>
    </div>
  </div>
</template>
