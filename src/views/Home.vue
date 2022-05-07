<template>
  <div class="home">
    <div v-if="!showActionMessage">
      <div v-if="!GET_IS_USER_LOGGED_IN">
        <button @click="signInUsingStore()">Sign In with NEAR Wallet</button>
      </div>
      <div v-if="GET_IS_USER_LOGGED_IN">
        <button @click="signOutUsingStore()">Sign Out</button>
      </div>
      <div v-if="GET_IS_USER_LOGGED_IN">
        Welcome, {{ GET_USER_ACCOUNT_DETAILS?.accountId }}
      </div>
      <AddVehicleForm @openActionMssg="openActionMssg"></AddVehicleForm>
      <div v-for="(vehicle, index) in contractState.vehicles" :key="index">
        <Vehicle :vehicle="vehicle"></Vehicle>
        <button @click="callDeleteVehicle(vehicle)">Delete Vehicle</button>
        <AddServiceForm
          :vehicleId="vehicle.id"
          @openActionMssg="openActionMssg"
        ></AddServiceForm>
        <EditVehicleForm
          :vehicle="vehicle"
          @openActionMssg="openActionMssg"
        ></EditVehicleForm>
      </div>
      <div
        v-for="(vehicleService, index) in contractState.services"
        :key="index"
      >
        <VehicleService :vehicleService="vehicleService"></VehicleService>
        <button @click="callDeleteService(vehicleService.id)">
          Delete Service
        </button>
        <EditVehicleServiceForm
          @openActionMssg="openActionMssg"
          :vehicleService="vehicleService"
        ></EditVehicleServiceForm>
      </div>
    </div>

    <ActionMessage
      v-if="showActionMessage"
      @closeActionMssg="closeActionMssg"
    ></ActionMessage>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";
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
    Vehicle,
    ActionMessage,
    VehicleService,
    AddVehicleForm,
    AddServiceForm,
    EditVehicleForm,
    EditVehicleServiceForm,
  },
  data() {
    return {
      showActionMessage: false,
    };
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
    ...mapActions([
      "initStore",
      "signIn",
      "signOut",
      "deleteVehicle",
      "deleteService",
    ]),
    closeActionMssg() {
      this.showActionMessage = false;
    },
    openActionMssg() {
      this.showActionMessage = true;
    },
    signInUsingStore() {
      this.signIn();
    },
    signOutUsingStore() {
      this.signOut();
    },
    callDeleteVehicle(vehicle) {
      this.deleteVehicle(vehicle);
      this.showActionMessage = true;
    },
    callDeleteService(serviceId) {
      this.deleteService(serviceId);
      this.showActionMessage = true;
    },
  },
  mounted() {
    this.initStore();
  },
};
</script>
