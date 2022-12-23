import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      countries: [],
      search: '',
      selectRegion: '',
      isShown: true
    };
  },
  actions: {
    search({ commit }, payload) {
      commit("SEARCH_TEXT", payload);
    },
    select({commit}, value) {
      commit("SELECT_REGION", value)
    },
    show({commit}, payload) {
      commit("SHOW_FILTER", payload)
    },
    apiCall({ commit }) {
      axios
        .get(
          "https://restcountries.com/v3.1/all?fields=name,borders,tld,population,region,flags,subregion,currencies,languages,cca3"
        )
        .then((res) => {
          res.data.forEach((country) => {
            const countryData = {
              name: country.name,
              population: country.population,
              region: country.region,
              capital: country.capital,
              flag: country.flags.png,
              borders: country.borders,
              tld: country.tld,
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
        if (Array.isArray(payload[key]) && key !== "borders") {
          payload[key] = payload[key].toString();        
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
      if(payload !== 'countryDetails') {
        state.isShown = true
      } else {
        state.isShown = false
      }
      return state.isShown
    }
  },
  getters: {
    filteredCountries(state) {
      if(state.search == '' && ['all', ''].includes(state.selectRegion)) {
        return state.countries;
      } else if(!['all', ''].includes(state.selectRegion) && state.search !== '') {
        return state.countries.filter((country) => country.region == state.selectRegion && country.name.common.toLowerCase().includes(state.search.toLowerCase()));
      } else if(state.search !== ''){
        return state.countries.filter((country) => country.name.common.toLowerCase().includes(state.search.toLowerCase()))
      } else {
        return state.countries.filter((country) => country.region == state.selectRegion)
      }
    },
  },
});

export default store;
