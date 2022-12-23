import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import './assets/main.scss'
import 'boxicons';
import router from './routes/index'
import store from './store'

createApp(App).use(router).use(store).mount('#app')
