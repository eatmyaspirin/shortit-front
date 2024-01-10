<template>
    <div class="home">
      <TextArea
        v-model="editorValue"
        spellcheck="false"
        autocomplete="off"
        placeholder=""
        :readonly="true"
      ></TextArea>
    </div>
  </template>
  
  <script setup>
  //import { useUserStore } from '@/stores/user';
  import axios from '@/axios.config'
import router from '@/router';
  import { ref, onMounted } from 'vue'
  const editorValue = ref('');
  const apiResp = ref();
  onMounted(async ()=>{
    console.log(router.currentRoute.value.path);  
    apiResp.value = await axios.get(router.currentRoute.value.path);
    if(apiResp.value.data) {
        editorValue.value = apiResp.value.data.pasteData;
    }
})
  </script>
  <style>
  .home {
    height: 95vh;
  }
  .p-inputtextarea {
    height: 100%;
    width: 100%;
    border-radius: 0px;
    border: none;
    font-family: monospace;
    background-color: #04261c;
    color: white;
    resize: none;
    margin-top: 48px;
    padding: 40px 16px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .tool-box {
    position: absolute;
    bottom: 50px;
    right: 24px;
  }
  
  .tool-box > * {
    margin-left: 8px;
    outline: none;
    border: none;
  }
  
  .copied {
    background-color: #0e5e53;
    width: 78px;
    height: 44px;
    justify-content: center;
  }
  .save {
    background-color: #0e5e53;
  }
  
  .p-inputtextarea::-webkit-scrollbar {
    display: none;
  }
  
  .p-inputtextarea:focus {
    border: none;
  }
  .p-editor-container .p-editor-toolbar.ql-snow {
    border-radius: 0px;
    border: none;
  }
  
  .p-inputtext:enabled:focus {
    box-shadow: none;
  }
  </style>
  