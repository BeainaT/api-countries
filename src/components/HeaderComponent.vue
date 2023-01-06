<template>
    <div class="container flex-between py-2">
        <h1>Fun with flags</h1>
        <SwitchMode/>
        <div v-if="store.state.isShown" class="sort_container" id="hidden">
            <SortBtn/>
            <select v-model="store.state.selectRegion" @change="selectValue($event)">
                <option value="" disabled>choose continent</option>
                <option value="all">All continent</option>
                <option v-for="(region, index) in worldRegion" :key="index" :value="region">{{ region }}</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import SwitchMode from './buttons/SwitchMode.vue';
import SortBtn from './buttons/SortBtn.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
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

</style>