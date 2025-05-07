<template>
  <div class="">
    <div class="text-center mb-2">
      <strong>Borders: </strong>
    </div>
    <div class="col flex-wrap flex-center gap-3 my-4" v-if="countryDetails && Object.keys(countryDetails).length > 0">
      <span v-for="border in countryDetails.borders" :key="border.index">
        <template v-if="border.length < 4">
          <router-link
            @click.prevent="triggeredBorder()"
            :to="{name: 'details', params: { id: countryFromBorderId(border) }}"
            class="btn_cst">
            {{ border }}
          </router-link>
        </template>
      </span>
      <template v-if="countryDetails.borders.length == 0">
        <button class="btn_cst" disabled>no borders</button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const route = useRoute();

const countryDetails = computed(() => {
  const id = route.params.id;
  return store.getters.filteredCountries[id];
});

const triggeredBorder = () => {
  store.dispatch("search", "");
  store.dispatch("select", "all");
};

//return country that matches its code (cca3) with selected border
const countryFromBorderId = (selectedBorder) => {
  const myCountry = store.getters.filteredCountries[route.params.id];
  let border = myCountry.borders.filter((border) => border == selectedBorder);
  let indexCountry = store.state.countries.findIndex((x) => x.cca3 == border);
  return indexCountry;
};
</script>

<style lang="scss">
</style>