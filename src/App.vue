<script setup>
// import { onBeforeMount } from 'vue';
import {useStore} from 'vuex';
import HeaderComponent from './components/HeaderComponent.vue';
const store = useStore();
store.dispatch('apiCall');

// call = store.getters.filteredCountries;
// call
</script>

<template>
  <header>
    <HeaderComponent/>
  </header>

  <main>
    <router-view>
    </router-view>

  </main>
</template>

<style lang="scss">

</style>
