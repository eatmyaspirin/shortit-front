<template>
  <div class="home">
    <TextArea v-model="editorValue" spellcheck="false" autocomplete="off" placeholder="> Paste text or a url to shorten"></TextArea>
  </div>
</template>

<script setup>
//import { useUserStore } from '@/stores/user';
import axios from '@/axios.config';
import { ref } from 'vue'

const editorValue = ref('')
document.addEventListener("keydown", function(e) {
  if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    debounce(()=> onHitSave());
  }
}, false);

const onHitSave = () => {
  axios.post('/create', {
      'isUrl': false,
      'pasteData': editorValue.value,
    }).then((res)=>{
      console.log(res.data);
      navigator.clipboard.writeText(axios.defaults.baseURL + '/' +res.data.shortUri);
    })
}
const debounce = (func, timeout = 5000) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
</script>

<style>
.home {
  height: 100%;
}
.p-inputtextarea {
  height: 95vh;
  width: 100%;
  border-radius: 0px;
  border: none;
  font-family: monospace;
  background-color: #04261c;
  color: white;
  resize: none;
  margin-top: 48px;
  padding: 32px 16px;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
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
