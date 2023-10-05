<script setup lang="ts">
import AppLogo from "./AppLogo.vue";
import Searchbar from "./Searchbar.vue";
import Profile from "./Profile.vue";
</script>

<template>
  <nav
    class="p-4 col-span-2 flex items-center bg-gray-900 sticky top-0 left-0 right-0 z-[999]"
  >
    <AppLogo />
    <Searchbar />
    <Profile />
  </nav>
</template>
