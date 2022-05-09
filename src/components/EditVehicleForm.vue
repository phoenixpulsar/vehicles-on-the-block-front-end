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
        <input
          type="text"
          :value="vehicle?.make"
          @change="make = $event.target.value"
          placeholder="Make"
        />
      </div>
      <div>
        <input
          type="text"
          :value="vehicle?.year"
          @change="year = $event.target.value"
          placeholder="Year"
        />
      </div>
      <div>
        <input
          type="text"
          :value="vehicle?.model"
          @change="model = $event.target.value"
          placeholder="Model"
        />
      </div>
      <div>
        <input
          type="text"
          :value="vehicle?.owner"
          @change="owner = $event.target.value"
          placeholder="Owner"
        />
      </div>
      <div>
        <input
          type="text"
          :value="vehicle?.vehicleNotes"
          @change="vehicleNotes = $event.target.value"
          placeholder="Date Acquired"
        />
      </div>
      <div>
        <textarea
          type="text"
          :value="vehicle?.dateAcquired"
          @change="dateAcquired = $event.target.value"
          placeholder="Notes"
        />
      </div>
    </div>
    <div class="add-vehicle-btn">
      <button class="btn" @click="callUpdateVehicle()">Update Vehicle</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
// @ is an alias to /src
export default {
  name: "EditVehicleForm",
  props: {
    vehicle: Object,
  },
  data() {
    return {
      make: null,
      year: null,
      model: null,
      owner: null,
      vehicleNotes: null,
      dateAcquired: null,
    };
  },
  methods: {
    ...mapActions(["updateVehicle"]),
    callUpdateVehicle() {
      let vehicleToUpdate = {
        vehicleId: this.vehicle.id,
        make: this.make !== null ? this.make : this.vehicle.make,
        year: this.year !== null ? this.year : this.vehicle.year,
        model: this.model !== null ? this.model : this.vehicle.model,
        owner: this.owner !== null ? this.owner : this.vehicle.owner,
        vehicleNotes:
          this.vehicleNotes !== null
            ? this.vehicleNotes
            : this.vehicle.vehicleNotes,
        dateAcquired:
          this.dateAcquired !== null
            ? this.dateAcquired
            : this.vehicle.dateAcquired,
      };

      this.updateVehicle(vehicleToUpdate);
      this.$emit("openActionMssg");
    },
    goBack() {
      this.$emit("closeEditVehicle");
    },
  },
};
</script>
<style scoped lang="scss">
.vehicle {
  display: grid;

  padding-top: 5px;
  grid-template:
    "goback      goback"
    "leftcolumn  rightcolumn"
    "addbtn      addbtn";
}

.vehicle::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
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
}

.go-back-header {
  color: white;
  grid-area: goback;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>
