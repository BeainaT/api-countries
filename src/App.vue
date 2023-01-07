<script setup>
import {useStore} from 'vuex';
import HeaderComponent from './components/HeaderComponent.vue';
const store = useStore();
store.dispatch('apiCall');

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
