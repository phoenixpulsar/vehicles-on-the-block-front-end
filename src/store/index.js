import { createStore } from "vuex";
import getConfig from "../config";
import * as nearAPI from "near-api-js";

export default createStore({
  state: {
    nearConfig: null,
  },
  mutations: {
    SET_NEAR_CONFIG: (state, nearConfig) => {
      state.nearConfig = nearConfig;
    },
  },
  actions: {
    _setConfig: ({ commit }) => {
      try {
        let config = getConfig(process.env.NODE_ENV || "development");
        let nearConfig = {
          ...config,
          keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
        };
        commit("SET_NEAR_CONFIG", nearConfig);
      } catch (error) {
        console.error("Error setting NEAR Config", error);
      }
    },
    initStore: async ({ dispatch }) => {
      console.log("Init Store In progres...");
      dispatch("_setConfig");
    },
  },
  modules: {},
});
