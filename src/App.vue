<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue';
import { RouterView } from 'vue-router'


</script>

<template>
  <AppNavbar/>
  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
</style>
