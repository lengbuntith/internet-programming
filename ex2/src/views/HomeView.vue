<template>
  <main>
    <div class="wrapper">
      <div class="side-bar">
        <ul>
          <li v-for="c in categories" :key="c._id">
            <h4
              class="pointer"
              @click="getProductsByFilter({ cat_id: c._id, sub_id: '' })"
            >
              {{ c.name }}
            </h4>
            <ul>
              <li v-for="s in c.subcategories" :key="s._id">
                <span
                  class="pointer"
                  @click="getProductsByFilter({ cat_id: c._id, sub_id: s._id })"
                  >{{ s.name }}</span
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="products">
        <ProductCard
          v-for="p in products"
          :key="p._id"
          :product="p"
        ></ProductCard>
      </div>
    </div>
  </main>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
export default {
  components: { ProductCard },

  data() {
    return {
      products: [],
      categories: [],
    };
  },

  created() {
    console.log(this.$axios);
    this.getCategories();
    this.getProducts();
  },

  methods: {
    async getProducts() {
      const res = await this.$axios.get("/product/all");
      console.log(res);
      if (res.data.success) {
        this.products = res.data.data;
      }
    },

    async getCategories() {
      const res = await this.$axios.get("/category/all");
      console.log(res);
      if (res.data.success) {
        this.categories = res.data.data;
      }
    },

    async getProductsByFilter({ cat_id, sub_id }) {
      let filter = ``;

      if (cat_id && sub_id) {
        filter = `?cat_id=${cat_id}&sub_id=${sub_id}`;
      } else if (cat_id && !sub_id) {
        filter = `?cat_id=${cat_id}`;
      }
      console.log(filter);
      const res = await this.$axios.get(
        `/product/filter${filter}`
      );
      console.log(res);
      if (res.data.success) {
        this.products = res.data.data;
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  position: relative;
}

.side-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  border: 1px solid;
  width: 200px;
}

.products {
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 220px;
  border: 1px solid;
  height: 100vh;
  display: grid;
  width: 100%;
  overflow-y: auto;
  justify-items: center;
}

.pointer {
  cursor: pointer;
}

@media (min-width: 768px) {
  .products {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
  }
}
</style>
