<template>
  <div class="home">
    <TextArea
      v-model="editorValue"
      spellcheck="false"
      autocomplete="off"
      placeholder="> Paste text or a url to shorten"
      :readonly="!showSaveButton"
    ></TextArea>
    <div class="tool-box">
      <PButton
        class="save"
        :disabled="editorValue.length == 0"
        @click="onHitSave"
        v-if="showSaveButton"
      >
        Save
      </PButton>
      <PButton
        label="Secondary"
        severity="secondary"
        class="copy"
        :class="{ copied: showCopyButton }"
        @click="onClickCopy"
        v-if="!showSaveButton"
        ><i v-if="showCopyButton" class="pi pi-check"></i
        ><span v-if="!showCopyButton">Copy</span></PButton
      >
    </div>
  </div>
</template>

<script setup>
//import { useUserStore } from '@/stores/user';
import axios from '@/axios.config'
import { ref } from 'vue'
const showSaveButton = ref(true)
const showCopyButton = ref(false)
const isUrl = ref(false);
const editorValue = ref('')
const apiResp = ref()
const onHitSave = async () => {
  if (editorValue.value.length != 0) {
    if (editorValue.value.split('\n').length == 1 && editorValue.value.length < 2000 && isValidUrl(editorValue.value)) {
      isUrl.value = true;
      apiResp.value = await axios.post('/create', {
        isUrl: isUrl.value,
        url: editorValue.value
      })
      showSaveButton.value = false
    } else {
      isUrl.value = false;
      apiResp.value = await axios.post('/create', {
        isUrl: isUrl.value,
        pasteData: editorValue.value
      })
      showSaveButton.value = false
    }
  }
}

const onClickCopy = () => {
  navigator.clipboard.writeText(isUrl.value ? axios.defaults.baseURL + '/' + apiResp.value.data.shortUri: 'http://localhost:5173/' + apiResp.value.data.shortUri)
  showCopyButton.value = true
}

//freecodecamp
const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // validate fragment locator
  return !!urlPattern.test(urlString)
}
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
  background-color: #021810;
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
