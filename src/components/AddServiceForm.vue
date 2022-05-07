<template>
  <div class="add-service-form">
    <h1>Add Service Form</h1>
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
<style lang="scss" scoped></style>
