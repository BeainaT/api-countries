<template>
    <div>
        <router-link to="/">
            <button class="btn">BACK</button>
        </router-link>
        <img :src="countryDetails.flag" :alt="countryDetails.name.common + ' flag'">
        <strong>nome comune:</strong>{{countryDetails.name.common}}
        <div v-if="countryDetails.name.nativeName.lenght > 0">
            <strong>nome nativo:</strong>{{getObjValue(countryDetails.name.nativeName).common}}
            <strong>currencies:</strong>{{getObjValue(countryDetails.currencies).name}}
        </div>
        <strong>popolazione:</strong>{{countryDetails.population.toLocaleString()}}
        <strong>regione:</strong>{{countryDetails.region}}
        <strong>subregion:</strong>{{countryDetails.subregion}}
        <strong>tld:</strong>{{countryDetails.tld}}
        <div v-if="countryDetails.borders.length > 0">
        <strong>borders:</strong>
            <span v-for="border in countryDetails.borders" :key="border.index">
                <router-link @click.prevent="triggeredBorder()" :to="{name: 'details', params: {id: countryFromBorderId(border)}}">
                    <button class="btn">{{border}}</button>
                </router-link>
            </span>
        </div>
    </div>
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
            let indexCountry = store.state.countries.findIndex(x => x.cca3 == border)
            return indexCountry

        }
        const getObjValue = (obj) => {
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    const element = obj[key];
                    return element
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

<style lang="scss">


</style>