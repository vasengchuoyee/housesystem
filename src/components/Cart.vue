<template>
    <div class="cart">
      <h2>Shopping Cart</h2>
      <ul>
        <li v-for="(item, index) in cart" :key="index">
          {{ item.name }} - {{ item.quantity }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cart: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .cart {
    border: 1px solid #ddd;
    padding: 20px;
    margin: 20px;
  }
  </style>
  