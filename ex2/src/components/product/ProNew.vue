<template>
  <div>
    <dialog id="ProNewDialog" class="px-20 py-20 dialog">
      <form method="dialog" id="ProNewForm">
        <div>
          <div class="pb-20">
            <h3>Add new product</h3>
          </div>
          <!-- image -->
          <div
            :style="{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px dashed',
              cursor: 'pointer',
              backgroundImage:
                'url(https://icons-for-free.com/download-icon-cloud+upload+file+storage+upload+icon-1320190558968694328_512.png)',
              backgroundPosition: 'center',
              backgroundSize: '60px',
              backgroundRepeat: 'no-repeat',
            }"
          >
            <input
              style="opacity: 0"
              width="100%"
              height="100%"
              type="file"
              accept="image/*"
              @input="handlerImage"
              name="image"
              id="ProNewFormImage"
            />
          </div>

          <!-- display image selected -->
          <div
            :style="{
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
            }"
            v-if="image"
          >
            <div
              :style="{
                marginRight: '10px',
              }"
            >
              {{ image.name }}
            </div>
            <button
              :style="{
                background: 'red',
                color: 'white',
                cursor: 'pointer',
              }"
              type="button"
              @click="clearImage"
            >
              X
            </button>
          </div>

          <!-- name -->
          <input type="text" placeholder="Name" name="name" required />

          <!-- category -->
          <select
            :style="{ width: '100%', height: '30px', marginBottom: '15px' }"
            name="category"
            required
            @input="getSubcategory"
          >
            <option value="">Select a category</option>
            <option v-for="c in categories" :key="c._id" :value="c._id">
              {{ c.name }}
            </option>
          </select>

          <!-- subcategory -->
          <select
            :style="{ width: '100%', height: '30px', marginBottom: '15px' }"
            name="subcategory"
            required
          >
            <option value="">Select a subcategory</option>
            <option v-for="s in subcategories" :key="s._id" :value="s._id">
              {{ s.name }}
            </option>
          </select>
          <!-- description -->
          <textarea
            name="description"
            rows="10"
            placeholder="description"
            style="padding: 10px; margin-bottom: 10px; width: 100%"
          ></textarea>
        </div>
        <div>
          <button :style="{ marginRight: '10px' }" @click="close" type="reset">
            Cancel
          </button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      subcategories: [],
      image: null,
    };
  },
  emits: ["ProCreated"],

  mounted() {
    let form = document.getElementById("ProNewForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("form submit");

      let data = {
        name: e.target.name.value,
        description: e.target.description.value,
        cat_id: e.target.category.value,
        sub_id: e.target.subcategory.value,
      };

      if (this.image) {
        const upload = await this.uploadImage(this.image);
        data.imageUrl = upload.data;
      }

      console.log("data", data);
      try {
        const res = await this.$axios.post("/product/create", data);
        console.log("create", res.data);
        form.reset();
        this.clearImage();
        this.close();
        this.$emit("ProCreated");
      } catch (error) {
        console.log("error create", error);
      }
    });
  },

  methods: {
    open() {
      this.getCategory();
      document.getElementById("ProNewDialog").showModal();
    },
    close() {
      document.getElementById("ProNewDialog").close();
    },

    getCategory() {
      this.$axios("/category/all").then(
        (res) => (this.categories = res.data.data)
      );
    },

    getSubcategory(e) {
      console.log("cat id", e.target.value);
      let cat_id = e.target.value;
      let index = this.categories.findIndex((c) => c._id == cat_id);

      if (index != -1) {
        this.subcategories = this.categories[index].subcategories;
      } else {
        this.subcategories = [];
      }
    },

    handlerImage(e) {
      console.log(e.target.files[0]);
      this.image = e.target.files[0];
    },

    clearImage() {
      document.getElementById("ProNewFormImage").value = "";
      this.image = "";
    },

    uploadImage(file) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        console.log("file: ", formData);
        this.$axios
          .post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("upload image");
            resolve(res);
          })
          .catch((err) => {
            reject(err.response.error);
          });
      });
    },
  },
};
</script>

<style scoped></style>
