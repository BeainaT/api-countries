<template>
    <button class="btn_cst" v-for="(button, index) in sortButtons" :key="index" @click="sortableFunctions(index, button.label)">
        <box-icon :color="this.$store.state.darkMode ? '#bfbdbd' : '#2b3945'" :style="button.display" :name="button.name"></box-icon>
        {{ button.label }}
    </button>
</template>

<script>
export default {
    data() {
        return {
            sortButtons: [
                {sortData: false, label: 'name', display: 'display:none;', name: null},
                {sortData: false, label: 'population', display: 'display:none;', name: null}
            ],
            countries: this.$store.getters.filteredCountries,
        }
    },
    methods: {
        toggleSort(id, label) {
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
                label === 'name' ? 
                this.countries.sort((a, b) => b.name.common.localeCompare(a.name.common)) :  
                this.countries.sort((a, b) => a.population - b.population);
            } else {
                label === 'name' ? 
                this.countries.sort((a, b) => a.name.common.localeCompare(b.name.common)) : 
                this.countries.sort((a, b) => b.population - a.population);
            }            
        },
        sortableFunctions(id, label) {
            this.toggleSort(id, label);
            this.sortCountries(id, label)
        },
    }
}

</script>