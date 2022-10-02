import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from './components/UI/index.js'
import store from './store/index.js'

import './assets/base.css'

const app = createApp(App)

app.use(router)
   .use(store);

app.mount('#app')
