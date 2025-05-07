<template>
    <button class="btn_cst" v-for="(button, index) in sortButtons" :key="index" @click="sortableFunctions(index, button.label)">
        <box-icon :color="this.$store.state.darkMode ? '#edf2fb' : '#001a2c'" :style="button.display" :name="button.name"></box-icon>
        {{ button.label }}
    </button>
</template>

<script>
export default {
    data() {
        return {
            sortButtons: [
                {sortData: false, label: 'name', display: 'display:inline-block', name: 'sort'},
                {sortData: false, label: 'population', display: 'display:inline-block', name: 'sort'}
            ],
            countries: this.$store.getters.filteredCountries,
        }
    },
    methods: {
        toggleSort(id, label) {
            //show icons and change style sort-related
            this.sortButtons[id].sortData = !this.sortButtons[id].sortData;
            this.sortButtons[id].display = 'display:inline-block';
            if(!this.sortButtons[id].sortData) {
                label === 'name' ? this.sortButtons[id].name = 'sort-z-a' : this.sortButtons[id].name = 'down-arrow-alt';
            } else {
                label === 'name' ? this.sortButtons[id].name = 'sort-a-z' : this.sortButtons[id].name = 'up-arrow-alt';
            }
        },
        sortCountries(id, label) {
            if(!this.sortButtons[id].sortData) {
                label === 'name' ? this.$store.dispatch("sortData", {key: 'name', value: "asc"}) : this.$store.dispatch("sortData", {key: 'population', value: "desc"});
                // this.countries.sort((a, b) => b.name.common.localeCompare(a.name.common)) :  
                // this.countries.sort((a, b) => a.population - b.population);
            } else {
                label === 'name' ? this.$store.dispatch("sortData", {key: 'name', value: "desc"}) : this.$store.dispatch("sortData", {key: 'population', value: "asc"});
                // this.countries.sort((a, b) => a.name.common.localeCompare(b.name.common)) : 
                // this.countries.sort((a, b) => b.population - a.population);
            }
            // this.countries = this.$store.getters.filteredCountries;        
        },
        sortableFunctions(id, label) {

            this.toggleSort(id, label);
            this.sortCountries(id, label)
        },
    }
}

</script>

<style lang="scss" scoped>

</style>