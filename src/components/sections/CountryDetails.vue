<template>
    <div class="container">
        <router-link to="/">
            <button class="btn">BACK</button>
        </router-link>
        <div class="row flex-between">
            <div class="col-lg-4 col-md-3 col-sm-12">
                <img :src="countryDetails.flag" :alt="countryDetails.name.common + ' flag'">
            </div>
            <div class="col-7 col-md-8 col-sm-12">
                <h3>{{countryDetails.name.common}}</h3>
                <div class="row">
                    <div class="col-6">
                        <div><strong>population: </strong>{{countryDetails.population.toLocaleString()}}</div>
                        <div><strong>region: </strong>{{countryDetails.region}}</div>
                        <div><strong>sub region: </strong>{{countryDetails.subregion}}</div>
                        <div><strong>capital: </strong>{{countryDetails.capital }}</div>
                    </div>
                    <div class="col-6">
                        <div><strong>native name: </strong>{{getObjValue(countryDetails.name.nativeName)}}</div>
                        <div><strong>currencies: </strong>{{getObjValue(countryDetails.currencies)}}</div>
                        <div><strong>top level domain: </strong>{{countryDetails.tld}}</div>
                        <div><strong>languages: </strong>{{getObjValue(countryDetails.lang)}}</div>
                    </div>
                </div>
            </div>
        </div>
        <strong>borders: </strong>
            <span v-for="border in countryDetails.borders" :key="border.index">
                <div v-if="border.length < 4">
                    <router-link @click.prevent="triggeredBorder()" :to="{name: 'details', params: {id: countryFromBorderId(border)}}">
                        <button class="btn">{{border}}</button>
                    </router-link>
                </div>
                <div v-else>
                    <button class="btn" disabled>{{ border }}</button>
                </div>
            </span>
        <span v-for="lang in countryDetails.languages" :key="lang.index">
            <strong>languages: </strong>{{ lang }}
        </span>
    </div>
    <!-- </div> -->
</template>

<script>
import { computed, onBeforeMount} from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        onBeforeMount(() => store.dispatch('show', 'countryDetails'))

        const triggeredBorder = () => {store.dispatch('search', ''); store.dispatch('select', 'all')};

        const countryFromBorderId = (selectedBorder) => {
            const myCountry = store.getters.filteredCountries[route.params.id];
            let border = myCountry.borders.filter(border => border == selectedBorder);
            let indexCountry = store.getters.filteredCountries.findIndex(x => x.cca3 == border)
            return indexCountry

        }
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
                        return Object.values(obj).toString()
                    }
                }
            }
        }
            return {
                countryDetails: computed(() => {
                const id = route.params.id;
                return store.getters.filteredCountries[id]}),
            getObjValue,
            countryFromBorderId,
            triggeredBorder,
            }
    }
    
}
</script>

<style lang="scss" scoped>
img {
    width: 100%;
}


</style>