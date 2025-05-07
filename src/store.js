import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      countries: [],
      search: "",
      selectRegion: "all",
      isShown: true,
      darkMode: true,
      pagination: {
        page: 1,
        perPage: 24,
      },
      sort: {
        name: false,
        population: false
      }
    };
  },
  actions: {
    switchMode({ commit }) {
      commit("SET_MODE");
    },
    setPage({ commit }, number) {
      commit("SET_PAGE", number);
    },
    search({ commit }, payload) {
      commit("SEARCH_TEXT", payload);
    },
    select({ commit }, value) {
      commit("SELECT_REGION", value);
    },
    show({ commit }, payload) {
      commit("SHOW_FILTER", payload);
    },
    apiCall({ commit }) {
      let countries = [];
      axios
        .get(
          "https://restcountries.com/v3.1/all?fields=name,borders,tld,population,region,flags,subregion,capital,currencies,languages,cca3"
        )
        .then((res) => {
          res.data.forEach((country) => {
            const {name, population, region, subregion, capital, flag, borders, tld, currencies, languages, cca3} = country;
            countries.push(country);
          });
          commit("SAVE_COUNTRIES", countries);
        })
        .catch((e) => console.log(e));
    },
    sortData({commit}, data) {
      commit('SORT_DATA', data);
    }
  },
  mutations: {
    SORT_DATA(state, payload) {
      state.sort[payload.key] = payload.value;

      if (payload.key == 'name') {
        return state.sort.name == 'asc' ? state.countries.sort((a, b) => b.name.common.localeCompare(a.name.common)) : state.countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
      }
      if (payload.key == 'population') {
        return state.sort.population == 'asc' ? state.countries.sort((a, b) => a.population - b.population) : state.countries.sort((a, b) => b.population - a.population);
      }
    },
    SAVE_COUNTRIES(state, payload) {
      state.countries = payload;      
    },
    SEARCH_TEXT(state, payload) {
      state.search = payload;
    },
    SELECT_REGION(state, value) {
      state.selectRegion = value;
      state.pagination.page = 1;
    },
    SHOW_FILTER(state, payload) {
      if (payload !== "countryDetails") {
        state.isShown = true;
      } else {
        state.isShown = false;
      }
    },
    SET_PAGE(state, number) {
      state.pagination.page = number;
    },
    SET_MODE(state) {
      state.darkMode = !state.darkMode;
    },
  },
  getters: {
    filteredCountries(state) {
      if (state.search == "" && ["all", ""].includes(state.selectRegion)) {
        return state.countries;
      } else if (
        !["all", ""].includes(state.selectRegion) &&
        state.search !== ""
      ) {
        return state.countries.filter(
          (country) =>
            country.region == state.selectRegion &&
            country.name.common
              .toLowerCase()
              .includes(state.search.toLowerCase())
        );
      } else if (state.search !== "") {
        return state.countries.filter((country) =>
          country.name.common.toLowerCase().includes(state.search.toLowerCase())
        );
      } else {
        return state.countries.filter(
          (country) => country.region == state.selectRegion
        );
      }
    },
  },
});

export default store;
