<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 col-sm-8 my-3 input_box">
                <input type="text" v-model="text" placeholder="Search by name">
                <box-icon color="#2b3945" name='search-alt'></box-icon>
            </div>
        </div>
        <div class="row g-3 justify-content-md-evenly justify-content-sm-center">
        <div class="col-lg-4 col-md-6 col-sm-12 main_card" v-for="(country, index) in filteredCountry" :key="index">
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

<style lang="scss" scoped>
@import '../assets/variables';
.main_card {
    border: $xxs outset;
    background-color: $lightBoxes;
    border-radius: $xs;
    min-height: 25rem;
    max-width: 18.75rem;
    &:hover {
        animation: shake 0.5s;
        animation-iteration-count: infinite;
    }
}
@keyframes shake {
    0% {
        transform: translate(1px, 1px) rotate(0deg);
    }
    50% {
        transform: translate(-3px, 0) rotate(-1deg);
    }
    100% {
        transform: translate(3px, 0) rotate(0deg);
    }
}
</style>