<template>
  <div class="home">
    <Login></Login>
    <Vehicle></Vehicle>
    <ActionMessage></ActionMessage>
    <VehicleService></VehicleService>
    <AddVehicleForm></AddVehicleForm>
    <AddServiceForm></AddServiceForm>
    <EditVehicleForm></EditVehicleForm>
    <EditVehicleServiceForm></EditVehicleServiceForm>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";
import Login from "@/components/Login.vue";
import Vehicle from "@/components/Vehicle.vue";
import ActionMessage from "@/components/ActionMessage.vue";
import VehicleService from "@/components/VehicleService.vue";
import AddVehicleForm from "@/components/AddVehicleForm.vue";
import AddServiceForm from "@/components/AddServiceForm.vue";
import EditVehicleForm from "@/components/EditVehicleForm.vue";
import EditVehicleServiceForm from "@/components/EditVehicleServiceForm.vue";

export default {
  name: "Home",
  components: {
    Login,
    Vehicle,
    ActionMessage,
    VehicleService,
    AddVehicleForm,
    AddServiceForm,
    EditVehicleForm,
    EditVehicleServiceForm,
  },
  methods: {
    ...mapActions(["initStore"]),
  },
  mounted() {
    this.initStore();
  },
};
</script>
