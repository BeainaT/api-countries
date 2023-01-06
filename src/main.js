import { createApp } from 'vue'
import App from './App.vue'
import 'boxicons';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './routes/index'
import store from './store'
import paginate from 'vuejs-paginate-next';
import './assets/main.scss';

// export const getObjValue = (obj) => {
//     if(obj.length !== undefined) {
//         return obj
//     } else {
//         for (const key in obj) {
//             if(obj[key].common !== undefined) {
//                 return obj[key].common
//             } else if(obj[key].symbol !== undefined) {
//                 return `${obj[key].name} - ${obj[key].symbol}`
//             } else {
//                 const languages = Object.values(obj).toString().split(',').join(', ');
//                 return languages;
//             }
//         }
//     }
// }

createApp(App).use(router).use(store).use(paginate).mount('#app')
