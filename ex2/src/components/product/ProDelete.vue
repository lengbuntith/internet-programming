<template>
  <dialog
    :id="`ProDeleteDialog${Pro._id}`"
    :style="{ minHeight: '100px' }"
    class="px-20 py-20 dialog"
  >
    <div>
      <div class="pb-20">
        <h3>Are you sure to delete ?</h3>
      </div>
    </div>
    <div>
      <button :style="{ marginRight: '10px' }" @click="close" type="reset">
        Cancel
      </button>
      <button
        @click="deletePro"
        :style="{ background: 'red', color: 'white', fontWeight: 'bold' }"
      >
        Confirm
      </button>
    </div>
  </dialog>
  <p>
    <button
      :style="{ fontWeight: 'bold', background: 'red', color: 'white' }"
      @click="open"
    >
      X
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

  emits: ["ProDeleted"],

  methods: {
    async deletePro() {
      console.log(this.Pro);
      try {
        const res = await this.$axios.post(`/product/delete/${this.Pro._id}`);
        console.log("delete", res.data);
        this.close();
        this.$emit("ProDeleted");
      } catch (error) {
        console.log("error", error);
      }
    },
    open() {
      document.getElementById(`ProDeleteDialog${this.Pro._id}`).showModal();
    },
    close() {
      document.getElementById(`ProDeleteDialog${this.Pro._id}`).close();
    },
  },
};
</script>

<style scoped></style>
