<template>
  <dialog id="ItemNewDialog" class="px-20 py-20 dialog">
    <form method="dialog" id="ItemNewForm">
      <div>
        <div class="pb-20">
          <h3>Add new subcategory</h3>
        </div>
        <input type="text" placeholder="Name" name="name" required />
        <select
          :style="{ width: '100%', height: '30px', marginBottom: '15px' }"
          name="category"
          required
        >
          <option value="">Select a category</option>
          <option v-for="c in categories" :key="c._id" :value="c._id">
            {{ c.name }}
          </option>
        </select>
      </div>
      <div>
        <button :style="{ marginRight: '10px' }" @click="close" type="reset">
          Cancel
        </button>
        <button type="submit">Confirm</button>
      </div>
    </form>
  </dialog>
  <p>
    <button
      :style="{ background: 'blue', color: 'white', fontWeight: 'bold' }"
      @click="open"
    >
      Add New
    </button>
  </p>
  <output></output>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
    };
  },
  emits: ["ItemCreated"],

  mounted() {
    let form = document.getElementById("ItemNewForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("form submit");

      let data = {
        name: e.target.name.value,
        cat_id: e.target.category.value,
      };

      try {
        const res = await this.$axios.post("/subcategory/create", data);
        console.log("create", res.data);
        form.reset();
        this.close();
        this.$emit("ItemCreated");
      } catch (error) {
        console.log("error create", error);
      }
    });
  },

  methods: {
    open() {
      this.getCategory();
      document.getElementById("ItemNewDialog").showModal();
    },
    close() {
      document.getElementById("ItemNewDialog").close();
    },
    getCategory() {
      this.$axios("/category/all").then(
        (res) => (this.categories = res.data.data)
      );
    },
  },
};
</script>

<style scoped></style>
