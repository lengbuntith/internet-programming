<template>
  <div>
    <div class="flex justify-between items-center py-20 px-20">
      <div>
        <h2>Item</h2>
      </div>

      <div>
        <ItemNew @item-created="getItem" />
      </div>
    </div>

    <div class="px-20">
      <table>
        <colgroup span="4"></colgroup>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
        <tr v-for="item in items" :key="item._id">
          <td>{{ item.name }}</td>
          <td>{{ item.category.name }}</td>
          <td :style="{ display: 'flex', padding: '10px' }">
            <ItemEdit @item-edited="getItem" :Sub="item" />
            <ItemDelete @item-deleted="getItem" :Sub="item" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import ItemNew from "./item/ItemNew.vue";
import ItemEdit from "./item/ItemEdit.vue";
import ItemDelete from "./item/ItemDelete.vue";
export default {
  data() {
    return {
      items: [],
    };
  },

  created() {
    this.getItem();
  },

  methods: {
    getItem() {
      this.$axios
        .get("/subcategory/all")
        .then((res) => (this.items = res.data.data));
    },
  },
  components: { ItemNew, ItemEdit, ItemDelete },
};
</script>
