<template>
  <div class="vehicle-service">
    <h1>Vehicle Service</h1>
    <div>Service Id: {{ vehicleService.id }}</div>
    <div>Service Date:{{ vehicleService.serviceDate }}</div>
    <div>Service Notes: {{ vehicleService.serviceNotes }}</div>
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
  methods: {},
};
</script>
<style lang="scss" scoped></style>
