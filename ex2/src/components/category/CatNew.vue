<template>
  <dialog id="CatNewDialog" class="px-20 py-20 dialog">
    <form method="dialog" id="CatNewForm">
      <div>
        <div class="pb-20">
          <h3>Add new category</h3>
        </div>
        <input type="text" placeholder="Name" name="name" required />
        <input type="text" placeholder="Description" name="description" />
        <input type="text" placeholder="Image URL" name="imageUrl" />
      </div>
      <div>
        <button @click="close" type="reset">Cancel</button>
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
  emits: ["CatCreated"],
  mounted() {
    let form = document.getElementById("CatNewForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("form submit");

      let data = {
        name: e.target.name.value,
        description: e.target.description.value,
        imageUrl: e.target.imageUrl.value,
      };

      console.table(data);

      try {
        const res = await this.$axios.post("/category/create", data);
        console.log("create", res.data);
        form.reset();
        this.close();
        this.$emit("CatCreated");
      } catch (error) {
        console.log("error create", error);
      }
    });
  },

  methods: {
    open() {
      document.getElementById("CatNewDialog").showModal();
    },
    close() {
      document.getElementById("CatNewDialog").close();
    },
  },
};
</script>

<style scoped></style>
