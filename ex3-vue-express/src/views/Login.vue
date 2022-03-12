<template>
  <div class="box">
    <Welcome></Welcome>
    <div class="login">
      <form id="formLogin">
        <div class="imgcontainer">
          <img src="../assets/avatar.png" alt="Avatar" class="avatar" />
        </div>

        <div class="container">
          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required />

          <label for="password"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />
          <button type="submit">Login</button>
          <p style="color: red; margin-top: 20px">{{ error }}</p>
          <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember
            me
          </label>
        </div>

        <div class="container" style="background-color: #f1f1f1">
          <span class="psw">Forgot <a href="#">password?</a></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Welcome from "../components/Welcome.vue";
export default {
  components: { Welcome },

  data() {
    return {
      error: "",
    };
  },

  mounted() {
    let form = document.getElementById("formLogin");

    form.addEventListener("submit", async (event) => {
      //prevent page reload
      event.preventDefault();

      //get data
      let email = event.target.email.value;
      let password = event.target.password.value;
      console.log(email, password);

      try {
        const res = await axios.post("http://localhost:3001/login", {
          email: email,
          password: password,
        });

        console.log("login ", res);

        if (res.data.username) {
          this.$router.push("/");
        } else {
          this.error = res.data.error;
        }
      } catch (error) {
        console.log("error login", error);
      }
    });
  },
};
</script>

<style scoped>
.box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* Bordered form */
form {
  border: 3px solid #f1f1f1;
}

/* Full-width inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}

/* Add padding to containers */
.container {
  padding: 16px;
  max-width: 500px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>
