<template>
  <dialog :id="`CatEditDialog${Cat._id}`" class="px-20 py-20 dialog">
    <form method="dialog" :id="`CatEditForm${Cat._id}`">
      <div>
        <div class="pb-20">
          <h3>Edit category</h3>
        </div>
        <input
          :value="Cat.name"
          type="text"
          placeholder="Name"
          name="name"
          required
        />
        <input
          :value="Cat.description"
          type="text"
          placeholder="Description"
          name="description"
        />
        <input
          :value="Cat.imageUrl"
          type="text"
          placeholder="Image URL"
          name="imageUrl"
        />
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
    Cat: {
      type: Object,
      default: {},
      required: true,
    },
  },
  emits: ["CatEdited"],
  mounted() {
    let form = document.getElementById(`CatEditForm${this.Cat._id}`);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("form submit");
      console.log(this.Cat);

      let data = {
        name: e.target.name.value,
        description: e.target.description.value,
        imageUrl: e.target.imageUrl.value,
      };

      try {
        const res = await this.$axios.post(
          `/category/update/${this.Cat._id}`,
          data
        );
        console.log("edit", res.data);
        form.reset();
        this.close();
        this.$emit("CatEdited");
      } catch (error) {
        console.log("error edit", error);
      }
    });
  },

  methods: {
    open() {
      document.getElementById(`CatEditDialog${this.Cat._id}`).showModal();
    },
    close() {
      document.getElementById(`CatEditDialog${this.Cat._id}`).close();
    },
  },
};
</script>

<style scoped></style>
