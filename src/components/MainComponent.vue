<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12 my-3 input_box">
                <input type="text" v-model="text" placeholder="Search by name">
                <box-icon color="#2b3945" name='search-alt'></box-icon>
            </div>
        </div>
        <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="(country, index) in filteredCountry" :key="index">
            <MainCard :id="index"
                :name="country.name.common" 
                :population="country.population"
                :region="country.region"
                :capital="country.capital"
                :flag="country.flag"
            />

            </div>
        </div>
    </div>

</template>

<script>
import MainCard from './sections/MainCard.vue';
export default {
    components: {MainCard},
    data() {
        return {
            countries: null,
        }
    },
    created() {
        this.$store.dispatch('show')
    },
    computed: {
        text: {
        get() {
            return this.$store.state.search;
        },
        set(value) {
            return this.$store.dispatch('search', value)
        }
       },
        filteredCountry() {
            return this.$store.getters.filteredCountries;
        }
    },

}


</script>

<style lang="scss">


</style>