<template>
    <div class="container">
        <div class="row justify-content-md-between justify-content-sm-center align-items-center">
            <div class="col-md-10 col-sm-10 my-4">
                <router-link :to="{name: 'home'}" class="btn_cst col-2">
                    <box-icon :color="iColor" name='arrow-back'></box-icon>
                </router-link>
            </div>
            <div class="col-lg-4 col-md-5 col-sm-10">
                <img :src="countryDetails.flag" :alt="countryDetails.name.common + ' flag'">
            </div>
            <div class="col-lg-7 col-md-7 col-sm-10 mt-4">
                <h3>{{countryDetails.name.common}}</h3>
                <div class="row">
                    <div class="col-lg-6 col-md-10 col-sm-12">
                        <div><strong>population: </strong>{{countryDetails.population.toLocaleString()}}</div>
                        <div><strong>region: </strong>{{countryDetails.region}}</div>
                        <div><strong>sub region: </strong>{{countryDetails.subregion}}</div>
                        <div><strong>capital: </strong>{{countryDetails.capital }}</div>
                    </div>
                    <div class="col-lg-6 col-md-10 col-sm-12">
                        <div><strong>native name: </strong>{{getObjValue(countryDetails.name.nativeName)}}</div>
                        <div><strong>currencies: </strong>{{getObjValue(countryDetails.currencies)}}</div>
                        <div><strong>top level domain: </strong>{{countryDetails.tld}}</div>
                        <div><strong>languages: </strong>{{getObjValue(countryDetails.lang)}}</div>
                    </div>
                </div>
            </div>
        </div>
        <CountryBorders/>
    </div>
</template>

<script setup>
import { computed, onBeforeMount} from 'vue';
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
    return store.state.darkMode ? "#bfbdbd" : "#2b3945";
});
</script>

<style lang="scss" scoped>
@import '../../assets/main.scss';

.btn_cst {
   filter: drop-shadow($xs $xxs $xxs $grayInput);
}
img {
    width: 100%;
    max-height: 15.625rem;
    border-radius: $xs;
}
strong {
    text-transform: capitalize;
}
</style>