<template>
  <v-container>
    
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Order ID", value: "id" },
        { text: "Product", value: "product" },
        { text: "Quantity", value: "quantity" },
        { text: "Total Price", value: "totalPrice" },
        { text: "Status", value: "status" },
      ],
      orders: [
        { id: 1, product: "Product A", quantity: 2, totalPrice: 100, status: "Success" },
        { id: 2, product: "Product B", quantity: 1, totalPrice: 50, status: "Pending" },
        { id: 3, product: "Product C", quantity: 3, totalPrice: 150, status: "Failed" },
      ],
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
.v-data-table {
  margin-top: 20px;
}
</style>
