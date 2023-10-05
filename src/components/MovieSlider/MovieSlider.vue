<script setup lang="ts">
import MovieSliderItem from "./MovieSliderItem.vue";
import { MovieSliderProps } from "../../interfaces/IMovieSliderProps";
import { Ref, ref, computed } from "vue";
import { getDateYear, getImageUrl } from "../../utils/helper";

const props = defineProps<MovieSliderProps>();

const { datas, genres } = props;

const sliderRef: Ref<HTMLDivElement | null> = ref(null);
const isDragging = ref(false);
const startX = ref<number | null>(null);
const scrollLeft = ref(0);

const selectedMovieSliderId = ref(1);

const handleChildData = (data: number) => {
  console.log(selectedMovieSliderId.value);
  selectedMovieSliderId.value = data; // Update the ref with the received data
};

const handleMouseDown = (e: MouseEvent) => {
  e.preventDefault();
  isDragging.value = true;
  startX.value = e.clientX;
  scrollLeft.value = sliderRef?.value?.scrollLeft || 0;
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return; // Use isDragging.value

  const deltaX = e.clientX - (startX?.value || 0); // Use startX.value
  if (sliderRef.value) {
    sliderRef.value.scrollLeft = scrollLeft.value - deltaX; // Use scrollLeft.value
  }
};

const handleMouseUp = () => {
  isDragging.value = false;
};

const handleMouseLeave = () => {
  if (isDragging) {
    isDragging.value = false;
  }
};

const convertedDate = computed(() => {
  const selectedId = selectedMovieSliderId.value;
  if (datas[selectedId]) {
    return getDateYear(datas[selectedId].release_date);
  }
  return null;
});
</script>

<template>
  <div class="relative rounded-lg h-[400px]">
    <!-- Selected Slider Meta Data -->
    <div class="movie-metadata absolute z-50 top-0 left-0 p-12 select-none">
      <h1 class="font-sans font-bold text-5xl text-white mb-2">
        {{ datas[selectedMovieSliderId].original_title }}
      </h1>

      <div class="text-gray-400 flex mb-4 items-center">
        <span>
          {{ convertedDate }}
        </span>

        <div class="ms-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5 text-yellow-400 me-1"
          >
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clip-rule="evenodd"
            />
          </svg>

          <span>
            {{ datas[selectedMovieSliderId].vote_average }}
          </span>
        </div>
      </div>

      <!-- genres -->
      <ul class="list-none flex my-4 font-bold">
        <li
          v-for="genre_id in datas[selectedMovieSliderId].genre_ids"
          :key="genre_id"
          class="text-gray-300 me-2"
        >
          {{ genres.find(genre => genre.id === genre_id)?.name }}
        </li>
      </ul>

      <div class="movie-description w-3/5">
        <p class="text-gray-300 mb-4">
          {{
            datas[selectedMovieSliderId].overview.slice(0, 100).concat("...")
          }}
        </p>

        <div
          class="w-24 bg-teal-700 flex justify-center items-center px-4 py-2 rounded-md text-white hover:bg-teal-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            view-box="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 me-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>View</span>
        </div>
      </div>
    </div>

    <!-- Selected Slider Image -->
    <img
      class="w-full h-full object-cover rounded-lg select-none"
      :src="getImageUrl(datas[selectedMovieSliderId].backdrop_path)"
      alt=""
    />

    <div
      className="absolute bottom-4 w-64 hover:cursor-grab right-0 flex flex-nowrap overflow-hidden whitespace-nowrap gap-4 p-4 z-[99]"
      ref="sliderRef"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <MovieSliderItem
        v-for="(data, index) in datas.slice(0, 10)"
        :key="data.id"
        :movie="data"
        :selectedMovieSliderId="selectedMovieSliderId"
        :index="index"
        @selectedMovie="handleChildData"
      />
    </div>

    <div
      class="absolute inset-0 rounded-lg bg-gradient-to-r from-[rgba(0,0,0,0.9)]"
    ></div>
  </div>
</template>
