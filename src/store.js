import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      countries: [],
    }
  },
  actions: {
    apiCall({commit}) {
        axios.get('https://restcountries.com/v3.1/all?fields=name,borders,tld,population,region,flags,subregion,currencies,languages')
            .then((res) => {              
              res.data.forEach(country => {
                const countryData =  {
                  name: country.name, 
                  population: country.population,
                  region: country.region,
                  capital: country.capital,
                  flag: country.flags.png,
                  borders: country.borders, 
                  tld: country.tld,
                  currencies: country.currencies,
                  lang: country.languages
                }
                // for (const key in countryData) {
                //     if(Array.isArray(countryData[key])) {
                //       countryData[key] = countryData[key].toString()
                //     } else {
                //       countryData[key]
                //     }
                // }

                // if(Array.isArray(countryData.capital)) {
                //   countryData.capital = countryData.capital.toString()
                // } else {
                //   return countryData.capital
                // }
                commit('SAVE_COUNTRIES', countryData)
                // state.countryDetails.push(countryDetail)
                // state.countries.push(countryGeneral)
            });
        }).catch((e) => console.log(e));
    },
  },
  mutations: {
    SAVE_COUNTRIES(state, payload) {
      for (const key in payload) {
        if(Array.isArray(payload[key]) && key !== 'borders') {
          payload[key] = payload[key].toString()
        } else if(!isNaN(payload[key])) {
          payload[key] = payload[key].toLocaleString()
        } else {
          payload[key]
        }
    }
        state.countries.push(payload);
    },
  }
})

export default store;