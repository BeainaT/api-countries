<template>
    <div class="main-details-wrapper">
        <div class="mb-4">
            <div class="mt-0 mt-sm-3 mb-4">
                <router-link :to="{name: 'home'}" class="btn_cst col-sm-1 col-2">
                    <box-icon :color="iColor" name='arrow-back'></box-icon>
                </router-link>
            </div>
            <div class="text-sm-center" v-if="countryDetails && Object.values(countryDetails).length > 0">
                <img class="main_card" :src="countryDetails?.flags?.png" :alt="countryDetails?.flags?.alt ? countryDetails.flags.alt : countryDetails.name.common + ' flag'">
                <h3 class="mt-5 mb-4">{{countryDetails?.name.common}}</h3>
                <div class="d-flex flex-column gap-1">
                    <div><strong>population: </strong>{{countryDetails.population.toLocaleString()}}</div>
                    <div><strong>region: </strong>{{countryDetails.region}}</div>
                    <div><strong>sub region: </strong>{{countryDetails.subregion}}</div>
                    <div><strong>capital: </strong>{{countryDetails.capital ? countryDetails.capital.toString() : '-' }}</div>
                    <div><strong>native name: </strong>{{getObjValue(countryDetails.name.nativeName)}}</div>
                    <div><strong>currencies: </strong>{{getObjValue(countryDetails.currencies)}}</div>
                    <div><strong>languages: </strong>{{getObjValue(countryDetails.languages)}}</div>

                </div>
            </div>
        </div>
        <CountryBorders/>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted} from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import CountryBorders from '../commons/CountryBorders.vue';

const store = useStore();
const route = useRoute();
onBeforeMount(() => store.dispatch("show", "countryDetails"));
const countryDetails = computed(() => {
    const id = route.params.id;
    return store.getters.filteredCountries[id];
});

onMounted(() => {
    const header = document.getElementsByTagName('header')[0];
    const showable = document.querySelector('.sort_container');
    if (header) header.style.height = 'fit-content';
    if (showable) showable.classList.remove('active');
})

//function for manipulate obj with different key and value setted in api
const getObjValue = (obj) => {
    if(obj.length !== undefined) {
        return obj
    } else {
        for (const key in obj) {
            if(obj[key].common !== undefined) {
                return obj[key].common
            } else if(obj[key].symbol !== undefined) {
                return `${obj[key].name} - ${obj[key].symbol}`
            } else {
                const languages = Object.values(obj).toString().split(',').join(', ');
                return languages;
            }
        }
    }
}
const iColor = computed(() => {
    return store.state.darkMode ? "#edf2fb" : "#001a2c";
});
</script>

<style lang="scss" scoped>
@import '../../assets/main.scss';

img {
    width: 100%;
    max-width: 25rem;
    height: 14rem;
    max-height: 15.625rem;
    border-radius: $xs;
}
h3 {
    font-weight: bold;
}
strong {
    text-transform: capitalize;
}
.main-details-wrapper {
    height: 100%;
    display: grid;
    @media screen and (width >= 640px) {
        padding: 0 16px;
    }
}
</style>