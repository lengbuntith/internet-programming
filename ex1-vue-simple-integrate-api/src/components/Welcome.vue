<template>
  <div class="box">
    <div class="logo">
      <img width="80" height="80" src="../assets/logo.svg" alt="logo" />
    </div>

    <div class="content">
      <h1>Welcome</h1>
      <span>Authentication App~</span>
      <div class="login-register">
        <router-link class="login" to="/login">Login</router-link>
        <router-link class="register" to="/register">Register</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  align-items: center;
}
.login {
  border-right: 1px solid #ddd;
  padding-right: 10px;
}

.register {
  padding-left: 10px;
}

.content {
  margin-left: 30px;
}
.content h1 {
  color: #41b883;
  margin: 0 0 10px 0;
}

.login-register {
  margin-top: 25px;
  display: flex;
}

a {
  color: black;
  opacity: 0.7;
  text-decoration: none;
}
.router-link-exact-active {
  color: #41b883 !important;
  opacity: 1;
  font-weight: bold;
}
</style>
