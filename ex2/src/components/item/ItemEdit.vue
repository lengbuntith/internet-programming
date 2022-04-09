<template>
  <dialog :id="`ItemEditDialog${Sub._id}`" class="px-20 py-20 dialog">
    <form method="dialog" :id="`ItemEditForm${Sub._id}`">
      <div>
        <div class="pb-20">
          <h3>Edit category</h3>
        </div>
        <input
          :value="Sub.name"
          type="text"
          placeholder="Name"
          name="name"
          required
        />
        <select
          :style="{ width: '100%', height: '30px', marginBottom: '15px' }"
          name="category"
          required
        >
          <option v-for="c in categories" :key="c._id" :value="c._id">
            {{ c.name }}
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
    Sub: {
      type: Object,
      default: {},
      required: true,
    },
  },
  data() {
    return {
      categories: [],
    };
  },
  emits: ["ItemEdited"],
  mounted() {
    let form = document.getElementById(`ItemEditForm${this.Sub._id}`);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("form submit");

      let data = {
        name: e.target.name.value,
        cat_id: e.target.category.value,
      };

      console.log(data);

      //find category selected
      let index = this.categories.findIndex((c) => c._id == data.cat_id);
      if (index != -1) {
        console.table(this.categories[index]);
      }

      try {
        const res = await this.$axios.post(
          `/subcategory/update/${this.Sub._id}`,
          data
        );
        console.log("edit", res.data);
        form.reset();
        this.close();
        this.$emit("ItemEdited");
      } catch (error) {
        console.log("error edit", error);
      }
    });
  },

  methods: {
    open() {
      this.getCategory();
      document.getElementById(`ItemEditDialog${this.Sub._id}`).showModal();
    },
    close() {
      document.getElementById(`ItemEditDialog${this.Sub._id}`).close();
    },
    getCategory() {
      this.$axios.get("/category/all").then((res) => {
        //clone data
        let old = JSON.parse(JSON.stringify(res.data.data));

        let all = res.data.data;
        console.log(all);
        //find index current category in array
        let index = all.findIndex((c) => c._id == this.Sub.category._id);
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
  },
};
</script>

<style scoped></style>
