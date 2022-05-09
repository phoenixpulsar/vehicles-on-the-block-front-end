<template>
  <div class="vehicle-service">
    <div class="ctrls">
      <button class="edit-btn" @click="editService">Edit</button>
      <button class="delete-btn" @click="deleteService">Delete</button>
    </div>
    <div class="left-column">
      <div class="service-label">Service Id:</div>
      <div class="service-label">Service Date:</div>
    </div>
    <div class="right-column">
      <div class="id">{{ vehicleService.id }}</div>
      <div class="date">{{ vehicleService.serviceDate }}</div>
    </div>
    <div class="service-notes">
      <span class="service-label">Service Notes:</span>
      <br />
      <span class="service-notes-val"> {{ vehicleService.serviceNotes }}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "VehicleService",
  props: {
    vehicleService: Object,
  },
  data() {
    return {};
  },
  methods: {
    editService() {
      this.$emit("editThisService", this.vehicleService.id);
    },
    deleteService() {
      this.$emit("deleteThisService", this.vehicleService.id);
    },
  },
};
</script>
<style scoped lang="scss">
.vehicle-service {
  display: grid;
  grid-template:
    "ctrls      ctrls"
    "leftcolumn rightcolumn "
    "servicenotes servicenotes"
    / 1fr 1fr;
  padding-bottom: 10px;
  border-bottom: 2px solid #3b4252;
}

.ctrls {
  grid-area: ctrls;
  text-align: right;
  margin-bottom: 10px;
}

.service-notes {
  grid-area: servicenotes;
}

.left-column {
  grid-area: leftcolumn;
}

.right-column {
  grid-area: rightcolumn;
  text-align: right;
}

.edit-btn,
.delete-btn {
  margin: 5px;
  color: white;

  width: 30%;
  border: none;
  padding: 10px;
  cursor: pointer;

  font-weight: bold;
  text-align: center;
  background: #81a1c1;
  border-radius: 16px;
}

.service-label {
  color: white;
}
.service-notes-val {
  margin-left: 5px;
}
</style>
