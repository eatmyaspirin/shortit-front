<template>
  <div class="home">
    <h1>Shortit</h1>
    {{ 'User ID: ' + userStore.getUserName }}
  </div>
</template>

<script setup>
  import { useUserStore } from '@/stores/user';
  const userStore = useUserStore();
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
</style>
