<template>
  <NavBar v-if="!$route.meta.hideNavbar"/>
  <RouterView />
</template>
<script setup>
import NavBar from './components/NavBar.vue';


</script>

<style scoped>

</style>
