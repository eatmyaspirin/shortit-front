/* eslint-disable vue/multi-word-component-names */
import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-dark-green/theme.css'
import 'primeicons/primeicons.css'
import Menubar from 'primevue/menubar'
import Inputtext from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import Button from 'primevue/button'
import Editor from 'primevue/editor'
import Textarea from 'primevue/textarea'
import ToggleButton from 'primevue/togglebutton'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Chart from 'primevue/chart';
import Listbox from 'primevue/listbox';



const app = createApp(App)
const pinia = createPinia()

if (localStorage.getItem('state')) {
  const savedState = JSON.parse(localStorage.getItem('state'));
  if (!(new Date().getTime() - savedState.userStore.user.loggedIn > import.meta.env.VITE_STATE_MAX_AGE*1000)) {
    pinia.state.value = savedState;
  }
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

// Components------------------------------------------
app.component('MenuBar', Menubar)
app.component('InputText', Inputtext)
app.component('InputGroup', InputGroup)
app.component('AltButton', Button)
app.component('Editor', Editor)
app.component('TextArea', Textarea)
app.component('PButton', Button)
app.component('ToggleButton', ToggleButton)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('Chart', Chart)
app.component('ListBox', Listbox)
//------------------------------------------------------
app.mount('#app')
