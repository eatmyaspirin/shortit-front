<template>
    <div class="wrapper">
        <AltButton @click="getMyUrls">Get My Urls</AltButton>
    </div>
</template>

<script setup>
import Axios from '@/axios.config';


const getMyUrls = async () => {
    const response = await Axios.get('/user/getMyUrls');
    console.log(response.data);
}
</script>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>