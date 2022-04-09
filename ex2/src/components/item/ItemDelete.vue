<template>
  <dialog
    :id="`ItemDeleteDialog${Sub._id}`"
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
        @click="deleteSub"
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
    Sub: {
      type: Object,
      default: {},
      required: true,
    },
  },

  emits: ["ItemDeleted"],

  methods: {
    async deleteSub() {
      console.log(this.Sub);
      try {
        const res = await this.$axios.post(`/subcategory/delete/${this.Sub._id}`);
        console.log("delete", res.data);
        this.close();
        this.$emit("ItemDeleted");
      } catch (error) {
        console.log("error", error);
      }
    },
    open() {
      document.getElementById(`ItemDeleteDialog${this.Sub._id}`).showModal();
    },
    close() {
      document.getElementById(`ItemDeleteDialog${this.Sub._id}`).close();
    },
  },
};
</script>

<style scoped></style>
