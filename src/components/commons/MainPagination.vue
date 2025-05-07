<template>
  <paginate class="my-5"
    v-model="page"
    :page-count="pageCount"
    :page-range="pageCount"
    :margin-pages="0"
    :prev-text="'<'"
    :next-text="'>'"
    :container-class="'pagination'"
    :page-class="'page-item'"
    :page-link-class="'page-link flex-center'"
    :hidePrevNext="!pageCount"
  >
  </paginate>
</template>

<script>
export default {
  name: "MainPagination",
};
</script>

<script setup>
import Paginate from "vuejs-paginate-next";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

//return triggered page value
const page = computed({
  get() {
    return store.state.pagination.page;
  },
  set(number) {
    return store.dispatch("setPage", number);
  },
});

const pageCount = computed(() =>
  Math.ceil(
    store.getters.filteredCountries.length / store.state.pagination.perPage
  )
);
</script>

<style lang="scss">
.pagination {
    flex-wrap: wrap;
    justify-content: center;
    gap: .3125rem;
    &:focus,
    &:active {
      box-shadow: none;
    }
    .active>.page-link, 
    .page-item>.page-link,
    .page-link.active {
      cursor: pointer;
      &:active,
      &:focus {
        box-shadow: none;
      }
      
    }
    .active>.page-link,
    .page-link.active {
      text-decoration: underline;
    }
    .page-item.disabled>.page-link {
      background-color: #e9e8ef;
      color: #a0a0a1;
      border-color: #a0a0a1;
    }
    .page-link {
      border-radius: .3125rem;
      width: 2.5rem;
      color: inherit;
      background-color: #e2eafc;
      // border: 0.125rem outset;
      border-color:inherit;
    }
}
</style>