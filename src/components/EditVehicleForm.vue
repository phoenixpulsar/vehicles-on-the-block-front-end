<template>
  <div class="edit-vehicle-form">
    <h1>Edit Vehicle Form</h1>

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

  <button class="btn" @click="callUpdateVehicle()">Update Vehicle</button>
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
  },
};
</script>
<style lang="scss" scoped></style>
