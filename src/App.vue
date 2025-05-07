<script setup>
import { onMounted } from 'vue';
import {useStore} from 'vuex';
import HeaderComponent from './components/HeaderComponent.vue';
const store = useStore();
store.dispatch('apiCall');

onMounted(() => {
  const body = document.getElementsByTagName("body")[0];
  if (body) body.classList.add('dark_mode');
})

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
