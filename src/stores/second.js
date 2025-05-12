// Product Store (second.js)
import { defineStore } from "pinia";
import axios from "axios";

export const useSecondStore = defineStore("secondStore", {
  state: () => ({
    products1: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/api/house", {
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        this.second = response.data.data.filter(
          (product) => product.category_tb?.cateName === "ເຮືອນ ສອງຊັ້ນ"
        );
        console.log(this.second, "Fetched products");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
  getters: {
    getProductById: (state) => (id) =>
      state.second.find((product) => product.id === id),
  },
});
