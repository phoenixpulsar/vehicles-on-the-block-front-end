<template>
  <div class="home">
    <Login></Login>
    <div v-if="!GET_IS_USER_LOGGED_IN">
      <button @click="signInUsingStore()">Sign In with NEAR Wallet</button>
    </div>
    <div v-if="GET_IS_USER_LOGGED_IN">
      <button @click="signOutUsingStore()">Sign Out</button>
    </div>
    <div v-if="GET_IS_USER_LOGGED_IN">
      Welcome, {{ GET_USER_ACCOUNT_DETAILS?.accountId }}
    </div>
    <AddVehicleForm></AddVehicleForm>
    <div v-for="(vehicle, index) in contractState.vehicles" :key="index">
      <Vehicle :vehicle="vehicle"></Vehicle>
      <AddServiceForm :vehicleId="vehicle.id"></AddServiceForm>
      <EditVehicleForm :vehicle="vehicle"></EditVehicleForm>
    </div>
    <div v-for="(vehicleService, index) in contractState.services" :key="index">
      <VehicleService :vehicleService="vehicleService"></VehicleService>
      <EditVehicleServiceForm
        :vehicleService="vehicleService"
      ></EditVehicleServiceForm>
    </div>
    <ActionMessage></ActionMessage>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";
import Login from "@/components/Login.vue";
import Vehicle from "@/components/Vehicle.vue";
import ActionMessage from "@/components/ActionMessage.vue";
import VehicleService from "@/components/VehicleService.vue";
import AddVehicleForm from "@/components/AddVehicleForm.vue";
import AddServiceForm from "@/components/AddServiceForm.vue";
import EditVehicleForm from "@/components/EditVehicleForm.vue";
import EditVehicleServiceForm from "@/components/EditVehicleServiceForm.vue";

export default {
  name: "Home",
  components: {
    Login,
    Vehicle,
    ActionMessage,
    VehicleService,
    AddVehicleForm,
    AddServiceForm,
    EditVehicleForm,
    EditVehicleServiceForm,
  },
  computed: {
    ...mapGetters([
      "GET_CONTRACT_STATE",
      "GET_IS_USER_LOGGED_IN",
      "GET_USER_ACCOUNT_DETAILS",
    ]),
    contractState() {
      return this.GET_CONTRACT_STATE;
    },
  },
  methods: {
    ...mapActions(["initStore", "signIn", "signOut"]),
    signInUsingStore() {
      this.signIn();
    },
    signOutUsingStore() {
      this.signOut();
    },
  },
  mounted() {
    this.initStore();
  },
};
</script>
