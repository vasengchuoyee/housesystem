// Product Store (products.js)
import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/api/house", {
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        this.products = response.data.data.filter(
          (product) => product.category_tb?.cateName === "ເຮືອນ ທົ່ວໄປ"
        );
        console.log(this.products, "Fetched products");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
  getters: {
    getProductById: (state) => (id) =>
      state.products.find((product) => product.id === id),
  },
});
