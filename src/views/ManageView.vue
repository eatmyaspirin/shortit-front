<template>
  <div class="manage">
    <h1>Your Pastes</h1>
    <div class="wrapper">
      <div class="left">
        <div>
          <AltButton @click="getMyUrls">Get My Urls</AltButton>
        </div>
        <DataTable
          class="grid"
          :value="products"
          tableStyle="min-width: 50rem"
          scrollable="true"
          scrollHeight="flex"
        >
          <Column field="isUrl" header="Is Url?"></Column>
          <Column field="url" header="Url"></Column>
          <Column field="shortUrl" header="Short URL"></Column>
          <Column field="urlId" header="UrlID"></Column>
        </DataTable>
      </div>
      <div class="right">
        <div class="stats">Stats</div>
        <div class="content">Content</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Axios from '@/axios.config'
const products = ref([])
const virtualScrollerOptions = {
  showSpacer: true
}
const getMyUrls = async () => {
  const response = await Axios.get('/user/getMyUrls')
  products.value = response.data.data
  console.log(response.data)
}
</script>

<style scoped>

.manage {
    height: 100%;
    padding-top: 4%;
}
.wrapper {
  display: flex;
  height: 100%;
  padding: 0 5px;
}
.left {
  display: flex;
  flex-direction: column;
  height: 94%;
  width: 100%;
  padding: 10px;
}
.right {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.stats {
  height: 400px;
}

.content {
  height: 400px;
}

.grid {
  height: 90%;
  width: 50%;
  max-width: 50%;
}
</style>
