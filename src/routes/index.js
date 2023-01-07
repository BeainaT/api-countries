import { createRouter, createWebHistory } from "vue-router";
import MainComponent from '../components/MainComponent.vue';
import CountryDetails from '../components/sections/CountryDetails.vue';
const routes = [
    {path: '/', name: 'home', component: MainComponent},
    {path: '/det/:id', name: 'details', component: CountryDetails},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;