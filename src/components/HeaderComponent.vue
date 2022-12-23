<template>
    <div class="container flex-between py-2">
        <h1>Fun with flags</h1>
        <div v-if="this.$store.state.isShown" class="flex-center">
            <button class="btn" v-for="(button, index) in sortButtons" :key="index" @click="sortableFunctions(index, button.label)">
                <box-icon color="#2b3945" :style="button.display" :name="button.name"></box-icon>
                {{ button.label }}
            </button>
            <select v-model="this.$store.state.selectRegion" @change="selectValue($event)">
                <option value="" disabled>choose continent</option>
                <option value="all">All continent</option>
                <option v-for="(region, index) in worldRegion" :key="index" :value="region">{{ region }}</option>
            </select>
        </div>
    </div>
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
            select: '',
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
        selectValue(e) {
          this.select = e.target.value
          console.log(this.select)
          return this.$store.dispatch('select', this.select)
        }
    
    },
    computed: {
        worldRegion() {
            return new Set(this.$store.state.countries.map((country) => country.region))
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/main';
h1 {
    text-transform: capitalize;
    // color: $darkBlue;
    text-shadow: $xs $xxs $xxs $grayInput;
    font-size: $lg;
}


</style>