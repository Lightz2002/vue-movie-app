<script setup lang="ts">
import { SidebarListItemProps } from "../interfaces/ISidebarListItemProps";

const props = defineProps<SidebarListItemProps>();
const { genre } = props; // Extract the 'genres' prop
</script>

<template>
  <li class="text-gray-600 hover:text-gray-400 list-none">
    {{ genre?.name }}
  </li>
</template>
