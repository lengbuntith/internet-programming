<template>
  <div class="box">
    <Welcome></Welcome>
    <div class="register">
      <form id="formRegister" style="border: 1px solid #ccc">
        <div class="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <!-- email -->
          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required />

          <!-- username -->
          <label for="username"><b>Username</b></label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            required
          />

          <!-- first name -->
          <label for="firstName"><b>First Name</b></label>
          <input
            type="text"
            placeholder="Enter First Name"
            name="firstName"
            required
          />

          <!-- last name -->
          <label for="lastName"><b>Last Name</b></label>
          <input
            type="text"
            placeholder="Enter Last Name"
            name="lastName"
            required
          />

          <!-- password -->
          <label for="password"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />

          <label>
            <input
              type="checkbox"
              checked="checked"
              name="remember"
              style="margin-bottom: 15px"
            />
            Remember me
          </label>

          <p>
            By creating an account you agree to our
            <a href="#" style="color: dodgerblue">Terms & Privacy</a>.
          </p>

          <div class="clearfix" style="display: flex; justify-content: space-between">
            <button type="submit" class="signupbtn">Sign Up</button>
            <p style="color: red">{{ error }}</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Welcome from "../components/Welcome.vue";
export default {
  components: {
    Welcome,
  },

  data() {
    return {
      error: ""
    }
  },

  mounted() {
    let form = document.getElementById("formRegister");

    form.addEventListener("submit", async (event) => {
      // prevent reload page
      event.preventDefault();

      // get data
      let email = event.target.email.value;
      let username = event.target.username.value;
      let firstName = event.target.firstName.value;
      let lastName = event.target.lastName.value;
      let password = event.target.password.value;

      console.log(email, username, firstName, lastName, password);

      try {
        const res = await axios.post("http://localhost:3001/register", {
          email: email,
          username: username,
          firstName: firstName,
          lastName: lastName,
          password: password,
        });

        console.log("register", res);
        if (res.data.success) {
          this.$router.push("/");
        } else {
          this.error = res.data.error
        }

      } catch (error) {
        console.log("error register", error);
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

* {
  box-sizing: border-box;
}

/* Full-width input fields */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
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
  opacity: 0.9;
}

button:hover {
  opacity: 1;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn,
.signupbtn {
  float: left;
  width: 50%;
}

/* Add padding to container elements */
.container {
  padding: 16px;
  max-width: 500px;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn,
  .signupbtn {
    width: 100%;
  }
}
</style>
