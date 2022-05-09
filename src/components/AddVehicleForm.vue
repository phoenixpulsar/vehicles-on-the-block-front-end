<template>
  <div class="vehicle">
    <h2 class="go-back-header" role="button" @click="goBack">&#8592; Back</h2>
    <div class="left-column">
      <div class="left-col-label">Make:</div>
      <div class="left-col-label">Year:</div>
      <div class="left-col-label">Model:</div>
      <div class="left-col-label">Owner:</div>
      <div class="left-col-label">DateAcquired:</div>
      <div class="left-col-label">VehicleNotes:</div>
    </div>
    <div class="right-column">
      <div>
        <input type="text" v-model="make" placeholder="Make" />
      </div>
      <div>
        <input type="text" v-model="year" placeholder="Year" />
      </div>
      <div>
        <input type="text" v-model="model" placeholder="Model" />
      </div>
      <div>
        <input type="text" v-model="owner" placeholder="Owner" />
      </div>
      <div>
        <input type="text" v-model="dateAcquired" placeholder="Date Acquired" />
      </div>
      <div>
        <textarea type="text" v-model="vehicleNotes" placeholder="Notes" />
      </div>
    </div>
    <div class="add-vehicle-btn">
      <button class="btn" @click="callAddVehicle()">Add Vehicle</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
// @ is an alias to /src
export default {
  name: "AddVehicleServiceForm",
  data() {
    return {
      year: "",
      make: "",
      model: "",
      owner: "",
      vehicleNotes: "",
      dateAcquired: "",
    };
  },
  methods: {
    ...mapActions(["addVehicle"]),
    callAddVehicle() {
      let vehicleToAdd = {
        year: this.year,
        make: this.make,
        model: this.model,
        owner: this.owner,
        dateAcquired: this.dateAcquired,
        vehicleNotes: this.vehicleNotes,
      };
      this.addVehicle(vehicleToAdd);
      this.resetForm();
      this.$emit("openActionMssg");
    },
    resetForm() {
      this.year = "";
      this.make = "";
      this.model = "";
      this.owner = "";
      this.vehicleNotes = "";
      this.dateAcquired = "";
    },
    goBack() {
      this.$emit("closeAddVehicleForm");
    },
  },
};
</script>
<style lang="scss" scoped>
.vehicle {
  display: grid;
  padding-top: 5px;
  grid-template:
    "goback      goback"
    "leftcolumn  rightcolumn"
    "addbtn      addbtn";
}

.left-column {
  grid-area: leftcolumn;
}

.right-column {
  grid-area: rightcolumn;
}

.add-vehicle-btn {
  grid-area: addbtn;
  margin: 20px;
}

input[type="text"] {
  width: 100%;
  background: #2e3440;
  color: white;
  padding: 6px 10px;
  margin: 2px;
  display: inline-block;
  border: 1px solid #88c0d0;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea[type="text"] {
  width: 100%;
  background: #2e3440;
  color: white;
  padding: 6px 10px;
  margin: 2px;
  display: inline-block;
  border: 1px solid #88c0d0;
  border-radius: 4px;
  box-sizing: border-box;
}

.left-col-label {
  padding: 6px 9px;
  color: white;
}

.go-back-header {
  color: white;
  grid-area: goback;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>
