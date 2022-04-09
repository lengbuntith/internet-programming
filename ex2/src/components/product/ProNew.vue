<template>
  <dialog id="ProNewDialog" class="px-20 py-20 dialog">
    <form method="dialog" id="ProNewForm">
      <div>
        <div class="pb-20">
          <h3>Add new product</h3>
        </div>
        <!-- name -->
        <input type="text" placeholder="Name" name="name" required />

        <!-- category -->
        <select
          :style="{ width: '100%', height: '30px', marginBottom: '15px' }"
          name="category"
          required
          @input="getSubcategory"
        >
          <option value="">Select a category</option>
          <option v-for="c in categories" :key="c._id" :value="c._id">
            {{ c.name }}
          </option>
        </select>

        <!-- subcategory -->
        <select
          :style="{ width: '100%', height: '30px', marginBottom: '15px' }"
          name="subcategory"
        >
          <option value="">Select a subcategory</option>
          <option v-for="s in subcategories" :key="s._id" :value="s._id">
            {{ s.name }}
          </option>
        </select>
        <!-- description -->
        <textarea name="description" cols="30" rows="10"></textarea>
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
      subcategories: [],
    };
  },
  emits: ["ProCreated"],

  mounted() {
    let form = document.getElementById("ProNewForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("form submit");

      let data = {
        name: e.target.name.value,
        description: e.target.description.value,
        cat_id: e.target.category.value,
        sub_id: e.target.subcategory.value,
      };

      try {
        const res = await this.$axios.post("/product/create", data);
        console.log("create", res.data);
        form.reset();
        this.close();
        this.$emit("ProCreated");
      } catch (error) {
        console.log("error create", error);
      }
    });
  },

  methods: {
    open() {
      this.getCategory();
      document.getElementById("ProNewDialog").showModal();
    },
    close() {
      document.getElementById("ProNewDialog").close();
    },

    getCategory() {
      this.$axios("/category/all").then(
        (res) => (this.categories = res.data.data)
      );
    },

    getSubcategory(e) {
      console.log("cat id", e.target.value);
      let cat_id = e.target.value;
      let index = this.categories.findIndex((c) => c._id == cat_id);

      if (index != -1) {
        this.subcategories = this.categories[index].subcategories;
      } else {
        this.subcategories = []
      }
    },
  },
};
</script>

<style scoped></style>
