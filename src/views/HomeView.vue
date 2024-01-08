<template>
  <div class="home">
    <TextArea v-model="editorValue" ></TextArea>
  </div>
</template>

<script setup>
//import { useUserStore } from '@/stores/user';
import { ref } from 'vue'

const editorValue = ref('')
const onChange = (value) => {
  console.log(value)
}
</script>

<style>
.home {
  margin: 0 auto;
  text-align: center;
  height: 100vh;
}
.p-inputtextarea {
  height: 100%;
  width: 100%;
  border-radius: 0px;
  border: none;
  font-family: monospace;
}

.p-inputtextarea:focus {
  border: none;
}
.p-editor-container .p-editor-toolbar.ql-snow {
  border-radius: 0px;
  border: none;
}
</style>
