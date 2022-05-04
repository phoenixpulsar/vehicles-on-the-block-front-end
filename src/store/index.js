import { createStore } from "vuex";
import getConfig from "../config";
import * as nearAPI from "near-api-js";

export default createStore({
  state: {
    nearConfig: null,
    nearConnection: null,
    accountState: {
      vehicles: [],
      services: [],
    },
    walletConnection: null,
    isUserLoggedIn: null,
    accountDetails: null,
  },
  mutations: {
    SET_NEAR_CONFIG: (state, nearConfig) => {
      state.nearConfig = nearConfig;
    },
    SET_NEAR_CONNECTION: (state, nearConnection) => {
      state.nearConnection = nearConnection;
    },
    SET_ACCOUNT_STATE: (state, accountState) => {
      state.accountState = accountState;
    },
    SET_WALLET_CONNECTION: (state, walletConnection) => {
      state.walletConnection = walletConnection;
    },
  },
  getters: {
    GET_CONTRACT_STATE: (state) => {
      return state.accountState;
    },
    GET_IS_USER_LOGGED_IN: (state) => {
      return state.isUserLoggedIn;
    },
    GET_USER_ACCOUNT_DETAILS: (state) => {
      return state.accountDetails;
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
    _connectToNear: async ({ commit, state }) => {
      try {
        let nearConnection = await nearAPI.connect(state.nearConfig);
        commit("SET_NEAR_CONNECTION", nearConnection);
      } catch (error) {
        console.error("Error connecting to NEAR", error);
      }
    },
    _fetchState: async ({ commit, state }) => {
      try {
        // Fetch State
        const response = await state.nearConnection.connection.provider.query({
          prefix_base64: "",
          finality: "final",
          account_id: state.nearConfig.contractName,
          request_type: "view_state",
        });

        // Decode
        let storage = {};
        response.values.forEach((v) => {
          let decodedKey = atob(v.key);
          let decodedVal = atob(v.value);
          storage[decodedKey] = JSON.parse(decodedVal);
        });

        // Data Structures
        let vehicles = [];
        let services = [];

        // Populate Data Structures
        for (const [key, value] of Object.entries(storage)) {
          if (key.startsWith("v:")) {
            let vehicleToAdd = {
              fullid: key,
              ...value,
            };
            vehicles.push(vehicleToAdd);
          }
          if (key.startsWith("vs:")) {
            let serviceToAdd = {
              fullid: key,
              ...value,
            };
            services.push(serviceToAdd);
          }
        }

        // Create object to store
        let accountState = {
          vehicles: vehicles,
          services: services,
        };

        // Update Vuex State
        commit("SET_ACCOUNT_STATE", accountState);
      } catch (error) {
        console.error("Error connecting to NEAR", error);
      }
    },
    _connectToWallet: ({ commit, state }) => {
      try {
        const wallet = new nearAPI.WalletConnection(state.nearConnection);
        commit("SET_WALLET_CONNECTION", wallet);
      } catch (error) {
        console.error("Error connecting to NEAR wallet");
      }
    },
    signIn: ({ state }) => {
      // redirects user to wallet to authorize your dApp
      // this creates an access key that will be stored in the browser's local storage
      // access key can then be used to connect to NEAR and sign transactions via keyStore
      let config = getConfig(process.env.NODE_ENV || "development");
      state.walletConnection.requestSignIn(
        config.contractName, // contract requesting access
        "Vehicles On The Block" // optional
        // "http://YOUR-URL.com/success", // optional
        // "http://YOUR-URL.com/failure" // optional
      );
    },
    signOut: ({ state }) => {
      state.walletConnection.signOut();
      state.isUserLoggedIn = false;
      state.accountDetails = null;
    },
    checkIfUserLoggedIn: ({ state, dispatch }) => {
      if (!state.walletConnection.getAccountId()) {
        state.isUserLoggedIn = false;
      } else {
        state.isUserLoggedIn = true;
        dispatch("getAccountDetails");
      }
    },
    getAccountDetails: async ({ state }) => {
      state.accountDetails = await state.walletConnection.account();
    },
    initStore: async ({ dispatch }) => {
      console.log("Init Store In progres...");
      dispatch("_setConfig");
      await dispatch("_connectToNear");
      await dispatch("_fetchState");
      dispatch("_connectToWallet");
      dispatch("checkIfUserLoggedIn");
    },
  },
  modules: {},
});
