<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-4 col-md-6 col-sm-8 mt-5 input_box">
        <input
          type="text"
          v-model="text"
          placeholder="Search by name"
          @keydown="setPagination"
        />
        <box-icon
          :color="store.state.darkMode ? '#bfbdbd' : '#2b3945'"
          name="search-alt"
        ></box-icon>
      </div>
    </div>
    <MainPagination />
    <div class="row g-4 justify-content-md-evenly justify-content-sm-center">
      <template v-if="filteredCountry.length < 1">
        <div>
          no result found for "{{ text }}" in
          {{ notFound(store.state.selectRegion) }}
        </div>
      </template>
      <div
        class="col-lg-4 col-md-6 col-sm-12 main_card"
        v-for="(country, index) in filteredCountry"
        :key="index"
      >
        <MainCard
          :id="getIndex(index)"
          :name="country.name.common"
          :population="country.population"
          :region="country.region"
          :capital="country.capital"
          :flag="country.flag"
        />
      </div>
    </div>
    <MainPagination />
  </div>
</template>

<script setup>
import MainCard from "./sections/MainCard.vue";
import MainPagination from "./commons/MainPagination.vue";
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

const store = useStore();
onBeforeMount(() => store.dispatch("show"));

const text = computed({
  get() {
    return store.state.search;
  },
  set(value) {
    return store.dispatch("search", value);
  },
});

const filteredCountry = computed(() => {
  return store.getters.filteredCountries.slice(
    (store.state.pagination.page - 1) * store.state.pagination.perPage,
    store.state.pagination.page * store.state.pagination.perPage
  );
});

const getIndex = (id) =>
  store.state.pagination.page === 1
    ? id
    : id + store.state.pagination.perPage * (store.state.pagination.page - 1);

const setPagination = () => store.dispatch("setPage", 1);

const notFound = (value) => {
  let msg = `${value} contintent`;
  return ['all', ''].includes(value) ? msg += 's' : msg;
}
</script>

<style lang="scss" scoped>
@import "../assets/variables";

.main_card {
  background-color: $lightBoxes;
  border-radius: $xs;
  min-height: 28rem;
  max-width: 18.75rem;
  padding: 0;
  border-style: none outset outset none;
  overflow: hidden;
  filter: drop-shadow($xs $xs $xs $darkBlue);
  &:hover {
    animation: shake 0.5s;
    animation-iteration-count: infinite;
  }
}
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  50% {
    transform: translate(-3px, 0) rotate(-1deg);
  }
  100% {
    transform: translate(3px, 0) rotate(0deg);
  }
}
</style>