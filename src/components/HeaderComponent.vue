<template>
    <div class="flex-between gap-2">
        <h1>Fun with flags</h1>
        <div class="toggles-container">
            <template v-if="store.state.isShown">
                <button class="btn_cst menu icon" @click="toggleMenu">
                    <box-icon name='filter' :color="store.state.darkMode ? '#edf2fb' : '#001a2c'"></box-icon>
                </button>
                <div class="sort_container">
                    <SortBtn/>
                    <div class="select-box" @click="toggleSelect">
                        <div class="select-box-selected">
                            <div>{{["all", ""].includes(store.state.selectRegion) ? "All contintents" : store.state.selectRegion}}</div>
                            <box-icon :color="store.state.darkMode ? '#edf2fb' : '#001a2c'" :name="showSelectOptions ? 'chevron-up' : 'chevron-down'"></box-icon>
                        </div>
                        <template v-if="showSelectOptions">
                            <div class="select-box-options">
                                <div v-for="(region, index) in filteredRegions" :key="index" @click="selectValue(region)">{{region === 'all' ? "All continents" : region}}</div>
                            </div>
                        </template>
                    </div>
                </div>            
            </template>
            <SwitchMode/>
        </div>
    </div>
</template>

<script setup>
import SwitchMode from './buttons/SwitchMode.vue';
import SortBtn from './buttons/SortBtn.vue';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

const store = useStore();

let showMenu = ref(true);
let showSelectOptions = ref(false);

const toggleMenu = () => {
    const showable = document.querySelector('.sort_container');
    const header = document.getElementsByTagName('header')[0];
    if(showMenu.value) {
        showable.classList.add('active');
        console.log(header, window.innerWidth);
        if (window?.innerWidth <= 300) header.style.height = "250px";
        else if (window?.innerWidth < 500 && innerWidth > 300) header.style.height = "200px";
        else header.style.height = "150px";
    } else {
        showable.classList.remove('active');
        header.style.height = "fit-content";
    }
    showMenu.value = !showMenu.value
}

const toggleSelect = () => {
    showSelectOptions.value = !showSelectOptions.value;
}

const selectValue = (e) => {
    store.dispatch('select', e);
}

const worldRegions = ["all", "Africa", "Americas", "Antarctic", "Asia", "Europe", "Oceania"];
const filteredRegions = computed(() => (worldRegions.filter((r) => r !== store.state.selectRegion)));

</script>

<style lang="scss" scoped>
@import '../assets/main';
.select-box {
    position: relative;
    width: 200px;
    cursor: pointer;
    background-color: $lightBoxes;
    border-radius: 8px;
    padding: 10px;
    padding-right: 6px;
    border: 1px solid;
    border-color: $darkBlue;
    // border: 0.125rem outset;
    // filter: drop-shadow($xxs $xxs $xxs $darkBlue);
    .select-box-options {
        position: absolute;
        left: -1px;
        right: -1px;
        background-color: inherit;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        border: 1px solid $darkBlue;
        border-top: none;
        // border: 0.125rem outset;
        padding: 10px 0;
        div {
            padding: 0 10px;
        }
        div:hover {
            background-color: #ccdbfd;
        }
    }
    .select-box-selected {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
h1 {
    text-transform: uppercase;
    text-shadow: $xs $xxs $xxs $grayInput;
    font-size: clamp(1.5rem, 1.0932rem + 2.0339vw, 3rem);
}
.sort_container {
    @include display-flex('end');
    gap: $s;
}
.btn_cst.menu {
    display: none;
}
@media screen and (width < 640px) {
    .btn_cst.menu {
        margin-right: 46px;
    }
}

@media screen and (max-width: 1200px) {
    .btn_cst.menu {
        display: flex;
    }
    .sort_container {
        display: none;
        &.active {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            position: absolute;
            left: 32px;
            top: 80px;
        }
    }
}
@media screen and (width < 640px) {
    .sort_container.active {
        left: 16px;
        right: 16px;
        top: 74px;
    }
}
@media screen and (width < 350px) {
    .sort_container.active {
        top: 100px;
    }
}
.toggles-container {
    display: flex;
    gap: 12px;
    @media screen and (width >= 640px) {
        gap: 24px;
    }
}
</style>