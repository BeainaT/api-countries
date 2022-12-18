<template>
    <div class="container">
        <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="(country, index) in countries" :key="index">
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
// import axios from 'axios';
import MainCard from './sections/MainCard.vue';
export default {
    components: {MainCard},
    data() {
        return {
            countries: null,
            
        }
    },
    created() {
        this.$store.dispatch('apiCall');
        this.countries = this.$store.state.countries;
    }
}


</script>

<style lang="scss">


</style>