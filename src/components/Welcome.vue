<template>
  <div class="welcome">
    <h1>Welcome</h1>
    <div class="svg">
      <img :src="mySVG" />
    </div>
  </div>
</template>
<script>
import mySVG from "@/assets/SVG_CARS/CAR-03.svg";
// @ is an alias to /src

export default {
  name: "Welcome",
  data() {
    return {
      mySVG,
    };
  },

  methods: {},
};
</script>
<style lang="scss" scoped>
.welcome {
  display: grid;
  place-items: center;
}
.svg {
  height: 300px;
  width: 300px;
}
</style>
