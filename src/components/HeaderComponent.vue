<template>
    <div class="container flex-between py-2">
        <h1>Fun with flags</h1>
        <SwitchMode/>
        <template v-if="store.state.isShown">
            <button class="btn_cst menu" @click="toggleMenu">
                <box-icon name='filter' :color="store.state.darkMode ? '#bfbdbd' : '#2b3945'"></box-icon>
            </button>
            <div class="sort_container">
                <SortBtn/>
                <select v-model="store.state.selectRegion" @change="selectValue($event)">
                    <option value="" disabled>choose continent</option>
                    <option value="all">All continent</option>
                    <option v-for="(region, index) in worldRegion" :key="index" :value="region">{{ region }}</option>
                </select>                
            </div>            
        </template>
    </div>
</template>

<script setup>
import SwitchMode from './buttons/SwitchMode.vue';
import SortBtn from './buttons/SortBtn.vue';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

const store = useStore();

let showMenu = ref(true);

const toggleMenu = () => {
    const showable = document.querySelector('.sort_container');
    if(showMenu.value) {
       showable.classList.add('active')
    } else {
        showable.classList.remove('active')
    }
    showMenu.value = !showMenu.value
}


const selectValue = (e) => store.dispatch('select', e.target.value);

const worldRegion = computed(() => new Set(store.state.countries.map((country) => country.region)))
</script>

<style lang="scss" scoped>
@import '../assets/main';
h1 {
    text-transform: uppercase;
    text-shadow: $xs $xxs $xxs $grayInput;
    font-size: $lg;
}
.sort_container {
    @include display-flex('end');
    gap: $s;
}
.btn_cst.menu {
    display: none;
}
@media screen and (max-width: 1200px) {
    .btn_cst.menu {
        display: flex;
    }
    .sort_container {
        display: none;
        &.active {
            display: flex;
        }
    }
}
</style>