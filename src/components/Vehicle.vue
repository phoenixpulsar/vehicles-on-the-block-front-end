<template>
  <div class="vehicle">
    <img class="mySVG" :src="mySVG" />
    <div class="left-column">
      <div class="makeNmodel">{{ vehicle.make }} {{ vehicle.model }}</div>
      <div class="year">{{ vehicle.year }}</div>
      <div class="divider"></div>
    </div>

    <div class="bottom-row">
      <div>
        <span class="left-label">Owner :</span>
        {{ vehicle.owner }}
      </div>
      <div>
        <span class="left-label">Acquired :</span> {{ vehicle.vehicleNotes }}
      </div>
      <div>
        <span class="left-label">Notes :</span> {{ vehicle.dateAcquired }}
      </div>
    </div>
  </div>
</template>
<script>
import mySVG from "@/assets/SVG_CARS/CAR-03.svg";
// @ is an alias to /src
export default {
  name: "Vehicle",

  props: {
    vehicle: Object,
  },
  data() {
    return {
      mySVG,
    };
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.vehicle {
  display: grid;
  max-height: 200px;
  overflow: hidden;
  overflow-y: scroll;
  padding-top: 5px;
  grid-template:
    "leftcolumn  "
    "bottomrow   ";
  background: #5e81ac;
  border-radius: 18px;
  padding: 15px;
  margin-top: 15px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;
}

.mySVG {
  position: absolute;
  left: 175px;
  top: 5px;
  width: 120px;
  height: 120px;
  overflow: visible;
}

.vehicle::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.bottom-row {
  grid-area: bottomrow;
}

.left-column {
  grid-area: leftcolumn;
}

.right-column {
  grid-area: rightcolumn;
}

.makeNmodel {
  color: black;
  font-size: 22px;
  font-weight: bold;
}

.year {
  color: black;
  font-size: 20px;
}

.divider {
  border-bottom: 1px solid white;
  margin-top: 10px;
  margin-bottom: 10px;
}

.left-label {
  color: #2e3440;
}
</style>
