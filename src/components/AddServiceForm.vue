<template>
  <div class="service">
    <div class="left-column">
      <div class="left-col-label">Date:</div>
      <div class="left-col-label">Notes:</div>
    </div>
    <div class="right-column">
      <div>
        <input type="text" v-model="serviceDate" placeholder="Service Date" />
      </div>
      <div>
        <textarea
          type="text"
          rows="5"
          v-model="serviceNotes"
          placeholder="Service Notes"
        />
      </div>
    </div>
    <div class="add-service-btn">
      <button class="btn" @click="callAddService()">Add Service</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
// @ is an alias to /src
export default {
  name: "AddServiceForm",
  data() {
    return {
      serviceDate: "",
      serviceNotes: "",
    };
  },
  methods: {
    ...mapActions(["addService"]),
    callAddService() {
      let serviceToAdd = {
        vehicleId: this.vehicleId,
        serviceDate: this.serviceDate,
        serviceNotes: this.serviceNotes,
      };
      this.addService(serviceToAdd);
      this.$emit("openActionMssg");
      this.resetForm();
    },
    resetForm() {
      this.serviceDate = "";
      this.serviceNotes = "";
    },
  },
  props: {
    vehicleId: String,
  },
};
</script>
<style scoped lang="scss">
.service {
  color: white;
  display: grid;
  padding-top: 5px;
  grid-template:
    "leftcolumn  rightcolumn"
    "addbtn      addbtn";
}

.left-column {
  grid-area: leftcolumn;
}

.right-column {
  grid-area: rightcolumn;
}

.add-service-btn {
  grid-area: addbtn;
}

.left-col-label {
  padding: 6px 9px;
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
