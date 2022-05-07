<template>
  <div class="edit-vehicle-service-form">
    <div>
      <input
        type="text"
        :value="vehicleService.serviceDate"
        @change="serviceDate = $event.target.value"
        placeholder="Service Date"
      />
    </div>
    <div>
      <textarea
        type="text"
        rows="3"
        :value="vehicleService.serviceNotes"
        @change="serviceNotes = $event.target.value"
        placeholder="Service Notes"
      />
    </div>
  </div>

  <button @click="callUpdateVehicleService()">Update Service</button>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "EditVehicleServiceForm",
  props: {
    vehicleService: Object,
  },
  data() {
    return {
      serviceDate: null,
      serviceNotes: null,
    };
  },
  methods: {
    ...mapActions(["updateVehicleService"]),
    callUpdateVehicleService() {
      let serviceToUpdate = {
        vehicleServiceId: this.vehicleService.id,
        vehicleId: this.vehicleService.vehicleId,
        serviceDate:
          this.serviceDate !== null
            ? this.serviceDate
            : this.vehicleService.serviceDate,
        serviceNotes:
          this.serviceNotes !== null
            ? this.serviceNotes
            : this.vehicleService.serviceNotes,
      };
      this.updateVehicleService(serviceToUpdate);
      this.$emit("openActionMssg");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
