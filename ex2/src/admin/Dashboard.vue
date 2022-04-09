<template>
  <main>
    <div v-if="loggedIn" class="wrapper">
      <div class="side-bar">
        <ul style="padding: 0px; margin: 0px">
          <li
            style="list-style: none; padding: 10px; border-bottom: 1px solid"
            v-for="m in menu"
            :key="m"
            @click="currentComponent = m"
          >
            <div style="margin-left: 20px" class="pointer">
              {{ m }}
            </div>
          </li>
        </ul>
      </div>

      <div class="container">
        <component :is="currentComponent"></component>
      </div>
    </div>

    <Login @login="(e) => (loggedIn = e)" v-else />
  </main>
</template>

<script>
import axios from "axios";
import Category from "../components/Category.vue";
import Items from "../components/Items.vue";
import Products from "../components/Products.vue";
import Login from "../components/Login.vue";
export default {
  components: {
    Category,
    Items,
    Products,
    Login,
  },
  data() {
    return {
      currentComponent: "Products",
      menu: ["Category", "Items", "Products"],
      loggedIn: false,
    };
  },

  created() {
    this.getMe();
  },

  methods: {
    async getMe() {
      try {
        const res = await axios({
          method: "get",
          url: "http://localhost:3001/auth/me",
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      } catch (error) {
        console.log(error);
        this.loggedIn = false;
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  position: relative;
  margin-top: 20px;
}

.side-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  border: 1px solid;
  width: 200px;
}

.container {
  margin-left: 220px;
  border: 1px solid;
  height: 100vh;
  width: 100%;

}

.pointer {
  cursor: pointer;
}
</style>
