<template>
  <dialog id="PriceEditDialog" class="px-20 py-20 dialog">
    <form method="dialog" id="PriceEditForm">
      <div>
        <div class="pb-20">
          <h3>Edit price</h3>
          <input type="number" name="price" required placeholder="price" />
          <input type="text" name="source" required placeholder="source" />
        </div>
      </div>
      <div>
        <button :style="{ marginRight: '10px' }" @click="close" type="reset">
          Cancel
        </button>
        <button type="submit">Confirm</button>
      </div>
    </form>
  </dialog>
</template>

<script>
export default {
  data() {
    return {};
  },

  emits: ["PriceEdited"],

  updated() {
    console.log("updated");
  },

  mounted() {
    let form = document.getElementById("PriceEditForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("form submit");

      const dialog = document.getElementById("PriceEditDialog");
      const id = dialog.dataset.id;
      console.log(id);

      let data = {
        price: e.target.price.value,
        source: e.target.source.value,
      };

      console.log(data);

      try {
        const res = await this.$axios.post(`/prices/update/${id}`, data);
        console.log("edit", res.data);
        form.reset();
        this.close();
        this.$emit("PriceEdited");
      } catch (error) {
        console.log("error edit", error);
      }
    });
  },

  methods: {
    close() {
      const dialog = document.getElementById("PriceEditDialog");
      dialog.close();
      delete dialog.dataset.id;
    },
  },
};
</script>

<style scoped></style>
