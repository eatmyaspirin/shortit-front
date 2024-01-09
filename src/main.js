/* eslint-disable vue/multi-word-component-names */
import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'primeicons/primeicons.css'
import Menubar from 'primevue/menubar'
import Inputtext from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import Button from 'primevue/button'
import Editor from 'primevue/editor'
import Textarea from 'primevue/textarea'

const app = createApp(App)
const pinia = createPinia()

// persist state to localstorage
if (localStorage.getItem('state')) {
  pinia.state.value = JSON.parse(localStorage.getItem('state'))
}
watch(
  pinia.state,
  (state) => {
    localStorage.setItem('state', JSON.stringify(state))
  },
  {
    deep: true
  }
)

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  pt: {
    global: {
      css: `
            .focussed {
                background-color: rgb(24, 170, 149, 0.1);

            }

        `
    }
  }
})

app.component('MenuBar', Menubar)
app.component('InputText', Inputtext)
app.component('InputGroup', InputGroup)
app.component('AltButton', Button)
app.component('Editor', Editor)
app.component('TextArea', Textarea)

app.mount('#app')
