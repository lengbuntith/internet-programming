<template>
  <div>
    <div class="flex justify-between items-center py-20 px-20">
      <div>
        <h2>Category</h2>
      </div>

      <div>
        <CatNew @cat-created="getCategory" />
      </div>
    </div>

    <div class="px-20">
      <table>
        <colgroup span="4"></colgroup>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Image Url</th>
          <th>Action</th>
        </tr>
        <tr v-for="c in categories" :key="c._id">
          <td>{{ c.name }}</td>
          <td>{{ c.description }}</td>
          <td>{{ c.imageUrl }}</td>
          <td :style="{ display: 'flex', padding: '10px' }">
            <CatEdit @cat-edited="getCategory" :Cat="c" />
            <CatDelete @cat-deleted="getCategory" :Cat="c" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import CatNew from "./category/CatNew.vue";
import CatEdit from "./category/CatEdit.vue";
import CatDelete from "./category/CatDelete.vue";
export default {
  data() {
    return {
      categories: [],
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      this.$axios("/category/all").then(
        (res) => (this.categories = res.data.data)
      );
    },
  },
  components: { CatNew, CatEdit, CatDelete },
};
</script>
