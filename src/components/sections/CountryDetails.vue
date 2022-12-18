<template>
    <div>
        <router-link to="/">
            <button>BACK</button>
        </router-link>
        <img :src="countryDetails.flag" :alt="countryDetails.name.common + ' flag'">
        <strong>nome comune:</strong>{{countryDetails.name.common}}
        <strong>nome nativo:</strong>{{getObjValue(countryDetails.name.nativeName).common}}
        <strong>popolazione:</strong>{{countryDetails.population}}
        <strong>regione:</strong>{{countryDetails.region}}
        <strong>subregion:</strong>{{countryDetails.subregion}}
        <strong>tld:</strong>{{countryDetails.tld}}
        <strong>currencies:</strong>{{getObjValue(countryDetails.currencies).name}}
        <strong>borders:</strong>
        
        <span v-for="border in countryDetails.borders" :key="border.index">
            <router-link :to="{name: 'details', params: {id: countryFromBorder(border)}}">
                <button>{{border}}</button>
            </router-link>
        </span>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
    setup() {
        const store = useStore();
        const route = useRoute();

        const countryFromBorder = (myBorder) => {
            const myCountry = store.state.countries[route.params.id];
            let border = myCountry.borders.filter(border => border == myBorder);
            let indexCountry = store.state.countries.findIndex(x => x.cca3 == border)
            return indexCountry

        }
        const getObjValue = (obj) => {
            for (const key in obj) {
                    const element = obj[key];
                    return element
                }
            }      
        return {
            countryDetails: computed(() => {
                const id = route.params.id;
                return store.state.countries[id]}),

            getObjValue,
            countryFromBorder
            }
    }
    
}
</script>

<style lang="scss">


</style>