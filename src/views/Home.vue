<template>
  <div class="history">
    <div class="welcome" v-if="!GET_IS_USER_LOGGED_IN">
      <Welcome></Welcome>
      <div class="user-actions">
        <button class="btn" @click="signInUsingStore()">
          Sign In with NEAR Wallet
        </button>
      </div>
    </div>
    <div class="user-logged-in" v-if="GET_IS_USER_LOGGED_IN">
      <h1 class="header">Vehicles on the Block</h1>
      <div class="welcomeNlogo user-actions">
        <div class="welcome-user">
          <span class="user-val">
            {{ GET_USER_ACCOUNT_DETAILS?.accountId }}</span
          >
        </div>

        <div class="sign-out-user" role="button" @click="signOutUsingStore()">
          <span>Sign Out</span>
        </div>
      </div>

      <ActionMessage
        v-if="showActionMessage"
        @closeActionMssg="closeActionMssg"
      ></ActionMessage>

      <div v-if="!showActionMessage">
        <div
          class="my-vehicles-header"
          v-if="vehicleBeingEditId === null && !displayVehicleForm"
        >
          <h2 class="vehicles-header">Vehicles</h2>

          <div class="refresh-data" role="button" @click="refreshData">
            Refresh Data
          </div>
        </div>

        <div v-if="GET_IS_USER_LOGGED_IN" class="user-actions">
          <button
            v-if="vehicleBeingEditId === null && !displayVehicleForm"
            class="btn"
            @click="showVehicleForm()"
          >
            Add Vehicle
          </button>
        </div>

        <div v-if="displayVehicleForm" class="vehicle-form">
          <AddVehicleForm
            @openActionMssg="openActionMssg"
            @closeAddVehicleForm="closeAddVehicleForm"
          />
        </div>

        <div class="vehicle-box-container" v-if="!displayVehicleForm">
          <div
            v-for="(vehicle, index) in contractState.vehicles"
            :key="index"
            class="vehicle-box"
          >
            <div
              class="vehicle-box__side"
              :class="[
                isFrontSideShowing(index)
                  ? 'vehicle-box__side--front-intial'
                  : 'vehicle-box__side--front-rotate',
              ]"
            >
              <Vehicle
                v-if="vehicleBeingEditId === null"
                :vehicle="vehicle"
              ></Vehicle>

              <EditVehicleForm
                :vehicle="vehicle"
                @openActionMssg="openActionMssg"
                @closeEditVehicle="closeEditVehicle"
                v-if="vehicle.id === vehicleBeingEditId"
              ></EditVehicleForm>

              <div
                class="vehicle-ctrls"
                v-if="
                  vehicleBeingEditId === null ||
                  vehicleBeingEditId === vehicle.id
                "
              >
                <div class="left-ctrl" role="button" @click="showBack(index)">
                  <span>Services</span>
                </div>
                <div
                  class="middle-ctrl"
                  role="button"
                  @click="openVehicleEditForm(vehicle)"
                >
                  <span>Edit</span>
                </div>
                <div
                  class="right-ctrl"
                  role="button"
                  @click="callDeleteVehicle(vehicle)"
                >
                  <span>Delete Vehicle</span>
                </div>
              </div>
            </div>
            <div
              class="vehicle-box__side"
              :class="[
                isFrontSideShowing(index)
                  ? 'vehicle-box__side--back-intial'
                  : 'vehicle-box__side--back-rotate',
              ]"
            >
              <div class="vehicle-service-container">
                <!-- could optimize here and just fetch service if user clicks see services -->
                <div class="vehicle-service-ctrls">
                  <div class="makeNmodel">
                    <div
                      v-if="!showAddServiceForm && !showEditServiceForm"
                      class="back-icon-service"
                    >
                      <span
                        class="back-btn"
                        role="button"
                        @click="showFront(index)"
                      >
                        <span>&#8592; Back</span>
                      </span>
                      <span class="services-header"> Services </span>
                      <span class="car-details-header">
                        {{ vehicle.make }} {{ vehicle.model }} -
                        {{ vehicle.year }}
                      </span>
                    </div>

                    <div v-if="showAddServiceForm" class="back-icon-service">
                      <span
                        class="back-btn"
                        role="button"
                        @click="showAddServiceForm = !showAddServiceForm"
                      >
                        <span>&#8592; Back</span>
                      </span>
                      <span class="services-header">Add Service </span>
                      <span class="car-details-header">
                        {{ vehicle.make }} {{ vehicle.model }} -
                        {{ vehicle.year }}
                      </span>
                    </div>

                    <div v-if="showEditServiceForm" class="back-icon-service">
                      <span
                        class="back-btn"
                        role="button"
                        @click="showEditServiceForm = !showEditServiceForm"
                      >
                        <span>&#8592; Back</span>
                      </span>
                      <span class="services-header">Edit Service </span>
                      <span class="car-details-header">
                        {{ vehicle.make }} {{ vehicle.model }} -
                        {{ vehicle.year }}
                      </span>
                    </div>
                  </div>

                  <div
                    v-if="!showAddServiceForm && !showEditServiceForm"
                    class="show-service-form"
                    role="button"
                    @click="showAddServiceForm = !showAddServiceForm"
                  >
                    <span> Add Service</span>
                  </div>

                  <div v-if="showAddServiceForm && GET_IS_USER_LOGGED_IN">
                    <AddServiceForm
                      @openActionMssg="openActionMssg"
                      :vehicleId="vehicle.id"
                    />
                  </div>
                </div>

                <div class="service" v-if="!showAddServiceForm">
                  <div
                    v-for="(vehicleService, index) in getServices(vehicle.id)"
                    :key="index"
                    class="vehicle-service-box"
                  >
                    <!-- service -->
                    <div v-if="!showEditServiceForm">
                      <VehicleService
                        :vehicleService="vehicleService"
                        @editThisService="editThisService"
                        @deleteThisService="deleteThisService"
                      ></VehicleService>
                    </div>

                    <!-- edit service -->
                    <div
                      v-if="
                        showEditServiceForm &&
                        vehicleService.id === serviceToEditId
                      "
                    >
                      <EditVehicleServiceForm
                        @openActionMssg="openActionMssg"
                        :vehicleService="vehicleService"
                      ></EditVehicleServiceForm>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import Welcome from "@/components/Welcome.vue";

export default {
  name: "Home",
  components: {
    Vehicle,
    Welcome,
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
      showEditServiceForm: false,
      serviceToEditId: null,
      vehicleBeingEditId: null,
      showServiceFor: [],
      displayVehicleForm: false,
      showAddServiceForm: false,
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
      "getContract",
    ]),
    refreshData() {
      this.$router.go();
    },
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
    // new
    isFrontSideShowing(index) {
      return !this.showServiceFor.includes(index);
    },
    showBack(index) {
      this.showServiceFor.push(index);
    },
    showFront(index) {
      this.showServiceFor = this.showServiceFor.filter((i) => i !== index);
    },
    openVehicleEditForm(vehicle) {
      this.vehicleBeingEditId = vehicle.id;
    },
    getServices(vehicleId) {
      return this.contractState.services.filter((s) => {
        if (s.vehicleId === vehicleId) {
          return s;
        }
      });
    },
    editThisService(serviceId) {
      console.log("service id", serviceId);
      this.serviceToEditId = serviceId;
      this.showEditServiceForm = true;
    },
    deleteThisService(serviceId) {
      this.callDeleteService(serviceId);
    },
    showVehicleForm() {
      this.displayVehicleForm = true;
      this.getContract();
    },
    closeAddVehicleForm() {
      this.displayVehicleForm = false;
    },
    closeEditVehicle() {
      this.vehicleBeingEditId = null;
    },
  },
  mounted() {
    this.initStore();
  },
};
</script>
<style lang="scss" scoped>
.history {
  color: #88c0d0;
}

.header {
  text-align: center;
}

.header-2 {
  text-align: center;
  font-size: 18px;
}

.vehicle-form {
  width: 320px;
  padding: 2px;
  overflow: hidden;
  margin: 10px auto;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.vehicle-form::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.service-form {
  width: 250px;
  padding: 2px;
  height: 180px;
  overflow: hidden;
  /* margin: 0 auto; */
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  outline: 2px solid lightsalmon;
}

.service-form::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.vehicle-box-container {
  width: 320px;
  padding: 2px;
  height: 60vh;
  overflow: hidden;
  margin: 10px auto;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.vehicle-box-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.vehicle-service-container {
  width: 280px;
  height: 260px;
  overflow: hidden;
  background: #88c0d0;
  border-radius: 16px;
  margin: 0px auto;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  backface-visibility: hidden;
}

.vehicle-service-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.vehicle-box {
  width: 300px;
  height: 260px;
  /* height: 500px; */
  margin: 10px auto;
  position: relative;
  perspective: 150rem;
}

.vehicle-service-box {
  width: 250px;
  /* height: 260px; */
  overflow: hidden;
  margin: 15px auto;
  background: #88c0d0;
  backface-visibility: hidden;
  color: #3b4252;
}

.vehicle-box__side {
  top: 0;
  left: 0;
  width: 100%;
  padding: 8px;
  /* height: 500px; */
  overflow: hidden;
  position: absolute;
  transition: all 0.8s;
  backface-visibility: hidden;
}

.vehicle-box__side--front-intial {
  /* background: #4c566a; */
}

.vehicle-box__side--back-intial {
  background: #5e81ac;
  transform: rotateX(180deg);
}

.vehicle-box__side--front-rotate {
  transform: rotateX(180deg);
}
.vehicle-box__side--back-rotate {
  transform: rotateX(0);
}

.vehicle-service-ctrls {
  padding: 14px 14px 2px 14px;
}

.user-actions {
  width: 250px;
  padding: 5px;
  margin: 5px auto;
}

.my-vehicles-header {
  display: grid;
  grid-template:
    "vheading    refreshdata"
    "srchiconcontainer   srchinput";
  width: 300px;
  margin: 0 auto;
}

.vehicles-header {
  grid-template: vheading;
  text-align: left;
  color: white;
  font-weight: bold;
}

.search-icon-container {
  grid-area: srchiconcontainer;
  display: grid;
  place-items: center;
}

.search-icon {
  margin-right: 10px;
}

.search-input {
  grid-area: srchinput;
}

input[type="text"] {
  width: 100%;
  background: #2e3440;
  color: white;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #88c0d0;
  border-radius: 4px;
  box-sizing: border-box;
}

.vehicle-ctrls {
  display: grid;
  place-items: center;
  grid-template: "leftctrl middlectrl rightctrl";
  margin-top: 15px;
}

.service-ctrls {
  display: grid;
  place-items: center;
  grid-template: "leftctrl middlectrl rightctrl";
}

.left-ctrl {
  grid-area: leftctrl;
  text-align: center;
  cursor: pointer;
}

.middle-ctrl {
  grid-area: middlectrl;
  text-align: center;
  cursor: pointer;
}

.right-ctrl {
  grid-area: rightctrl;
  text-align: center;
  cursor: pointer;
}

.welcomeNlogo {
  width: 300px;
  display: grid;
  grid-template: "welcomeuser signoutuser";
}

.welcome-user {
  grid-area: welcomeuser;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.sign-out-user {
  display: grid;
  place-items: center;
  grid-area: signoutuser;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}

.user-val {
  color: #ebcb8b;
  margin-left: 5px;
}

.makeNmodel {
  color: black;
  font-size: 22px;
  margin-bottom: 15px;
}

.back-icon-service {
  color: white;
  font-weight: 300;
  padding-bottom: 10px;
}

.services-header {
  float: right;
}

.car-details-header {
  float: right;
  font-size: 18px;
}

.back-btn {
  cursor: pointer;
}

.service-footer {
  height: 50px;
  background: red;
}

.show-service-form {
  margin-top: 30px;
  color: white;
  text-align: center;
  border: 1px solid white;
  border-radius: 18px;
  padding: 5px;
  cursor: pointer;
}

.refresh-data {
  grid-area: refreshdata;
  padding-top: 5px;
  text-align: right;
  cursor: pointer;
}

.hudini-mssg {
  width: 300px;

  margin: 80px auto;
}

.close-mssg {
  text-align: right;
  cursor: pointer;
  margin: 10px;
}

.mssg-body {
  font-size: 18px;
}
</style>
