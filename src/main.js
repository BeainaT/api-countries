import { createApp } from 'vue'
import App from './App.vue'
import 'boxicons';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './routes/index'
import store from './store'
import paginate from 'vuejs-paginate-next';
import './assets/main.scss';

createApp(App).use(router).use(store).use(paginate).mount('#app')
