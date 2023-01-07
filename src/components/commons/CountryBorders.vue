<template>
  <div class="row flex-column my-3">
    <div class="col flex-center">
      <strong>Borders: </strong>
    </div>
    <div class="col flex-wrap flex-center gap-3 my-2">
      <span v-for="border in countryDetails.borders" :key="border.index">
        <template v-if="border.length < 4">
          <router-link
            @click.prevent="triggeredBorder()"
            :to="{name: 'details', params: { id: countryFromBorderId(border) }}"
            class="btn_cst">
            {{ border }}
          </router-link>
        </template>
        <template v-else>
          <button class="btn_cst" disabled>{{ border }}</button>
        </template>
      </span>
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