<template>
  <dialog
    :id="`CatDeleteDialog${Cat._id}`"
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
        @click="deleteCat"
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
    Cat: {
      type: Object,
      default: {},
      required: true,
    },
  },

  emits: ["CatDeleted"],

  methods: {
    async deleteCat() {
      console.log(this.Cat);
      try {
        const res = await this.$axios.post(`/category/delete/${this.Cat._id}`);
        console.log("delete", res.data);
        this.close();
        this.$emit("CatDeleted");
      } catch (error) {
        console.log("error", error);
      }
    },
    open() {
      document.getElementById(`CatDeleteDialog${this.Cat._id}`).showModal();
    },
    close() {
      document.getElementById(`CatDeleteDialog${this.Cat._id}`).close();
    },
  },
};
</script>

<style scoped></style>
