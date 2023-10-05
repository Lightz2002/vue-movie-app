<script setup lang="ts">
import SidebarListItem from "./SidebarListItem.vue";
import { Genre } from "../interfaces/IGenre";

const props = defineProps<{ genres?: Genre[] }>();
const { genres } = props; // Extract the 'genres' prop
</script>

<template>
  <div
    class="overflow-y-scroll font-sans bottom-0 bg-gray-900 hidden md:block md:fixed md:top-[72px] w-48 md:left-0 z-50 p-4"
  >
    <h5 class="font-bold text-slate-200">Genre</h5>

    <ul>
      <SidebarListItem v-for="genre in genres" :key="genre.id" :genre="genre" />
      <!-- <SidebarListItem v-for="genre in genres" :key="genre.id" :genre="genre" /> -->
    </ul>
  </div>
</template>
