<template>
  <dialog id="PriceNewDialog" class="px-20 py-20 dialog">
    <form method="dialog" id="PriceNewForm">
      <div>
        <div class="pb-20">
          <h3>Add new price</h3>
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

  emits: ["PriceCreated"],

  mounted() {
    let form = document.getElementById("PriceNewForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("form submit");

      const productId =
        document.getElementById("PriceNewDialog").dataset.productId;
      console.log(productId);

      let data = {
        product_id: productId,
        price: e.target.price.value,
        source: e.target.source.value,
      };

      console.log(data);

      try {
        const res = await this.$axios.post("/prices/create", data);
        console.log("create", res.data);
        form.reset();
        this.close();
        this.$emit("PriceCreated");
      } catch (error) {
        console.log("error create", error);
      }
    });
  },

  methods: {
    close() {
      const dialog = document.getElementById("PriceNewDialog");
      dialog.close();
      delete dialog.dataset.productId;
    },
  },
};
</script>

<style scoped></style>
