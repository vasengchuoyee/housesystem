import { defineStore } from 'pinia';
import axios from 'axios';

export const useHouseAllStore = defineStore('houseall', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      try {
        this.loading = true;
        const response = await axios.get('http://localhost:3000/api/house', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        this.products = response.data.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        this.error = 'Failed to load products';
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },
  },
});
