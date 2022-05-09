<template>
  <div class="service">
    <div class="left-column">
      <div class="left-col-label">Date:</div>
      <div class="left-col-label">Notes:</div>
    </div>
    <div class="right-column">
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
    <div class="add-service-btn">
      <button class="btn" @click="callUpdateVehicleService()">
        Update Service
      </button>
    </div>
  </div>
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
<style scoped lang="scss">
.service {
  color: white;
  display: grid;
  padding-top: 5px;
  grid-template:
    "leftcolumn  rightcolumn"
    "addbtn      addbtn";
}

.left-col-label {
  padding: 6px 9px;
}

.left-column {
  grid-area: leftcolumn;
}

.right-column {
  grid-area: rightcolumn;
}

.add-service-btn {
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
</style>
