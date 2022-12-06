<script setup>
import MainHeader from './components/MainHeader.vue';
</script>

<template>
  <header>
    <MainHeader/>
  </header>

  <main>
    
  </main>
</template>

<style lang="scss" scoped>
$red: #ff0000;
header {
  color: $red;
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
