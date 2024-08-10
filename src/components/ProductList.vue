<template>
    <div class="product-list">
      <h2>Products</h2>
      <ul>
        <li v-for="(product, index) in products" :key="index">
          {{ product.name }} - ${{ product.price }}
          <button @click="addToCart(product)">Add to Cart</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          { id: 1, name: 'Product 1', price: 100 },
          { id: 2, name: 'Product 2', price: 200 },
          { id: 3, name: 'Product 3', price: 300 }
        ]
      };
    },
    methods: {
      addToCart(product) {
        this.$emit('add-to-cart', product);
      }
    }
  }
  </script>
  
  <style scoped>
  .product-list {
    border: 1px solid #ddd;
    padding: 20px;
    margin: 20px;
  }
  </style>
  