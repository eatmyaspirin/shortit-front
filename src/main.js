/* eslint-disable vue/multi-word-component-names */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import "primeflex/primeflex.css";
import 'primevue/resources/themes/lara-dark-green/theme.css'
import 'primeicons/primeicons.css';
import Menubar from 'primevue/menubar';
import Inputtext from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import Button from 'primevue/button';




const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.component('MenuBar', Menubar)
app.component('InputText', Inputtext)
app.component('InputGroup', InputGroup)
app.component('AltButton', Button)



app.mount('#app')
