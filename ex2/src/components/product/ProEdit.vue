<template>
  <dialog :id="`ProEditDialog${Pro._id}`" class="px-20 py-20 dialog">
    <form method="dialog" :id="`ProEditForm${Pro._id}`">
      <div>
        <div class="pb-20">
          <h3>Edit Product</h3>
        </div>
        <!-- name -->
        <input
          :value="Pro.name"
          type="text"
          placeholder="Name"
          name="name"
          required
        />
        <!-- category -->
        <select
          :style="{ width: '100%', height: '30px', marginBottom: '15px' }"
          name="category"
          required
          @input="getSubcategoryFromCategory"
        >
          <option v-for="c in categories" :key="c._id" :value="c._id">
            {{ c.name }}
          </option>
        </select>
        <!-- subcategory -->
        <select
          :style="{ width: '100%', height: '30px', marginBottom: '15px' }"
          name="subcategory"
        >
          <option v-for="s in subcategories" :key="s._id" :value="s._id">
            {{ s.name }}
          </option>
        </select>
      </div>
      <div>
        <button @click="close" type="reset">Cancel</button>
        <button type="submit">Confirm</button>
      </div>
    </form>
  </dialog>
  <p>
    <button :style="{ fontWeight: 'bold', marginRight: '10px' }" @click="open">
      Edit
    </button>
  </p>
</template>

<script>
export default {
  props: {
    Pro: {
      type: Object,
      default: {},
      required: true,
    },
  },
  data() {
    return {
      categories: [],
      subcategories: [],
    };
  },
  emits: ["ProEdited"],
  mounted() {
    let form = document.getElementById(`ProEditForm${this.Pro._id}`);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("form submit");

      let data = {
        name: e.target.name.value,
        cat_id: e.target.category.value,
        sub_id: e.target.subcategory.value,
      };

      console.log(data);

      //find category selected
      let index = this.categories.findIndex((c) => c._id == data.cat_id);
      if (index != -1) {
        console.table(this.categories[index]);
      }

      try {
        const res = await this.$axios.post(
          `/product/update/${this.Pro._id}`,
          data
        );
        console.log("edit", res.data);
        form.reset();
        this.close();
        this.$emit("ProEdited");
      } catch (error) {
        console.log("error edit", error);
      }
    });
  },

  methods: {
    open() {
      this.getCategory();
      this.getSubcategory();
      document.getElementById(`ProEditDialog${this.Pro._id}`).showModal();
    },
    close() {
      document.getElementById(`ProEditDialog${this.Pro._id}`).close();
    },
    getCategory() {
      this.$axios.get("/category/all").then((res) => {
        //clone data
        let old = JSON.parse(JSON.stringify(res.data.data));

        let all = res.data.data;
        console.log(all);
        //find index current category in array
        let index = all.findIndex((c) => c._id == this.Pro.category._id);
        console.log(index);
        //remove current category in array
        if (index != -1) {
          all.splice(index, 1);
        }
        console.log(all, old);
        //move current category to first
        all.unshift(old[index]);
        console.log(all);
        //assign
        this.categories = all;
      });
    },

    getSubcategory() {
      this.$axios.get("/subcategory/all").then((res) => {
        //clone data
        let old = JSON.parse(JSON.stringify(res.data.data));

        let all = res.data.data;
        console.log(all);
        //find index current subcategory in array
        let index = all.findIndex((c) => c._id == this.Pro.subcategory._id);
        console.log(index);
        //remove current subcategory in array
        if (index != -1) {
          all.splice(index, 1);
        }
        console.log(all, old);
        //move current subcategory to first
        all.unshift(old[index]);
        console.log(all);
        //assign
        this.subcategories = all;
      });
    },

    getSubcategoryFromCategory(e) {
      console.log("cat id", e.target.value);
      let cat_id = e.target.value;
      let index = this.categories.findIndex((c) => c._id == cat_id);

      if (index != -1) {
        this.subcategories = this.categories[index].subcategories;
      } else {
        this.subcategories = [];
      }
    },
  },
};
</script>

<style scoped></style>
