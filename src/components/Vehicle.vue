<template>
  <div class="vehicle">
    <h1>Vehicle</h1>
    <div>Make: {{ vehicle.make }}</div>
    <div>Model:{{ vehicle.model }}</div>
    <div>Year: {{ vehicle.year }}</div>
    <div>Owner:{{ vehicle.owner }}</div>
    <div>Acquired:{{ vehicle.vehicleNotes }}</div>
    <div>Notes: {{ vehicle.dateAcquired }}</div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "Vehicle",

  props: {
    vehicle: Object,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
