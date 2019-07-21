import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    fetchData ({ commit }, url) {
      return new Promise((resolve, reject) => {
        axios.get(url).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
})
