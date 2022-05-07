<template>
  <div class="action-message">
    <h1>Action Message</h1>
    <h2>Your Request is Being Processed</h2>

    <p>It might take a bit to see the changes reflected in the blockchain.</p>
    <button @click="close">Close</button>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "ActionMessage",
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("closeActionMssg");
    },
  },
};
</script>
<style lang="scss" scoped></style>
