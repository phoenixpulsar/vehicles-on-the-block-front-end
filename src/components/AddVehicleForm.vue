<template>
  <div class="add-vehicle-service-form">
    <h1>Add Vehicle Form</h1>
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
    <button class="btn" @click="callAddVehicle()">Add Vehicle</button>
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
  },
};
</script>
<style lang="scss" scoped></style>
