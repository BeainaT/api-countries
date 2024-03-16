import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      countries: [],
      search: "",
      selectRegion: "",
      isShown: true,
      darkMode: false,
      pagination: {
        page: 1,
        perPage: 24,
      },
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
      axios
        .get(
          "https://restcountries.com/v3.1/all?fields=name,borders,tld,population,region,flags,subregion,capital,currencies,languages,cca3"
        )
        .then((res) => {
          res.data.forEach((country) => {
            const countryData = {
              name: country.name,
              population: country.population,
              region: country.region,
              subregion: country.subregion,
              capital: country.capital.toString(),
              flag: country.flags.png,
              borders: country.borders,
              tld: country.tld.toString(),
              currencies: country.currencies,
              lang: country.languages,
              cca3: country.cca3,
            };

            commit("SAVE_COUNTRIES", countryData);
          });
        })
        .catch((e) => console.log(e));
    },
  },
  mutations: {
    SAVE_COUNTRIES(state, payload) {

      for (const key in payload) {
        if (
          (isNaN(payload[key]) && Object.keys(payload[key]).length === 0) ||
          payload[key].length === 0
        ) {
          key === "borders"
            ? (payload[key] = ["no countries around"])
            : (payload[key] = `no ${key} found for ${payload.name.common}`);
        } else if (Object.keys(payload[key]).length > 0) {
          for (const nestedKey in payload[key]) {
            Object.keys(payload[key][nestedKey]).length === 0
              ? (payload[key][
                  nestedKey
                ] = `no ${nestedKey} found for ${payload.name.common}`)
              : payload[key][nestedKey];
          }
        } else {
          payload[key];
        }
      }
      if (!state.countries.includes(payload)) {
        state.countries.push(payload);
      }
    },
    SEARCH_TEXT(state, payload) {
      state.search = payload;
    },
    SELECT_REGION(state, value) {
      state.selectRegion = value;
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
      let filteredCountries;
      if (state.search == "" && ["all", ""].includes(state.selectRegion)) {
        filteredCountries = state.countries;
      } else if (
        !["all", ""].includes(state.selectRegion) &&
        state.search !== ""
      ) {
        filteredCountries = state.countries.filter(
          (country) =>
            country.region == state.selectRegion &&
            country.name.common
              .toLowerCase()
              .includes(state.search.toLowerCase())
        );
      } else if (state.search !== "") {
        filteredCountries = state.countries.filter((country) =>
          country.name.common.toLowerCase().includes(state.search.toLowerCase())
        );
      } else {
        filteredCountries = state.countries.filter(
          (country) => country.region == state.selectRegion
        );
      }
      return filteredCountries;
    },
  },
});

export default store;
