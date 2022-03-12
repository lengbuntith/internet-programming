<template>
  <div class="box">
    <p>You're in Home Page</p>
    <p>Well done</p>
    <button @click="goToLogin">Back to login</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.box {
  text-align: center;
}
</style>
