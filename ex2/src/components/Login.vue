<template>
  <div class="login">
    <form id="adminForm">
      <label for="email">Email</label> <br />
      <input style="margin-bottom: 10px" type="text" name="email" /> <br />
      <label for="password">Password</label> <br />
      <input type="text" name="password" /> <br />
      <button style="margin-top: 20px" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    let form = document.getElementById("adminForm");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      axios({
        method: "post",
        url: "http://localhost:3001/auth/admin/login",
        data: {
          email: e.target.email.value,
          password: e.target.password.value,
        },
        withCredentials: true,
      }).then((res) => {
        console.log(res.data);
        if (res.data.success) {
          this.$emit("login", true);
        } else {
          this.$emit("login", false);
        }
      });
    });
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
}

#adminForm {
  border: 1px solid;
  padding: 10px;
}
</style>
