import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { store } from './store'
import router from './router'
import './style.css'
import App from './App.vue'

console.log('Starting Vue app...')

const app = createApp(App)

// Pinia 등록
const pinia = createPinia()
app.use(pinia)

// Vuex 등록
app.use(store)

// Vue Router 등록
app.use(router)

app.mount('#app')

console.log('Vue app mounted')
