<template>
  <div>
    <div class="flex justify-between items-center py-20 px-20">
      <div>
        <h2>Products</h2>
      </div>

      <div>
        <ProNew @pro-created="getProduct" />
      </div>
    </div>

    <div class="px-20">
      <table>
        <colgroup span="4"></colgroup>
        <tr>
          <th>Name</th>
          <th>Prices</th>
          <th>Category</th>
          <th>Subcategory</th>
          <th>Action</th>
        </tr>
        <tr v-for="pro in products" :key="pro._id">
          <td>{{ pro.name }}</td>
          <td>
            <div>10$ - Amazon</div>
            <div>20$ - Taobao</div>
            <div>20$ - Ebay</div>
          </td>
          <td>{{ pro.category.name }}</td>
          <td>{{ pro.subcategory.name }}</td>
          <td>
            <tr>
              <td :style="{borderRight: '0px'}"><ProEdit @pro-edited="getProduct" :Pro="pro" /></td>
              <td><ProDelete @pro-deleted="getProduct" :Pro="pro" /></td>
            </tr>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import ProNew from "./product/ProNew.vue";
import ProEdit from "./product/ProEdit.vue";
import ProDelete from "./product/ProDelete.vue";
export default {
  data() {
    return {
      products: [],
    };
  },

  created() {
    this.getProduct();
  },

  methods: {
    getProduct() {
      this.$axios.get("/product/all_populate").then((res) => {
        this.products = res.data.data;
        console.table(this.products);
      });
    },
  },
  components: { ProNew, ProEdit, ProDelete },
};
</script>
