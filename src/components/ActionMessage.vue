<template>
  <div class="action-message">
    <h2 class="am-header">Your Request is Being Processed</h2>

    <p>It might take a bit to see the changes reflected in the blockchain.</p>
    <button class="btn am-btn" @click="close">Close</button>
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
<style lang="scss" scoped>
.action-message {
  width: 320px;
  margin: 10px auto;
  text-align: center;
}

.am-header {
  margin-top: 40px;
}

.am-btn {
  margin-top: 20px;
}
</style>
