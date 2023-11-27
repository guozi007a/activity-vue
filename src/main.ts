import { createApp, version } from 'vue'
import './assets/common.css'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'

console.log(`当前使用的Vue版本号: ${version}`)

const pinia = createPinia()
const app = createApp(App)

app
    .use(router)
    .use(pinia)
    .mount('#app')
