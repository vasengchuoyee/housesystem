<template>
  <v-container>
    <h3 class="text-center text-orange">ຈັດການລາຍການອໍເດີສິ້ນຄໍາ</h3>
    <v-table>
      <thead class="bg-orange">
        <tr>
          <th class="text-left">Order</th>
          <th class="text-left">Name</th>
          <th class="text-left">Calories</th>
          <th class="text-left">Price</th>
          <th class="text-left">Date</th>
          <th class="text-left">Status</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in desserts" :key="item.name">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.status }}</td>
          <td>
            <v-btn @click="toggleStatus(item)" color="orange">Comfirm</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          price: "$6",
          date: "2024-01-01",
          status: "Available",
        },
        {
          name: "Ice Cream Sandwich",
          calories: 237,
          price: "$8",
          date: "2024-02-14",
          status: "Available",
        },
        {
          name: "Eclair",
          calories: 262,
          price: "$7",
          date: "2024-03-12",
          status: "Unavailable",
        },
        {
          name: "Cupcake",
          calories: 305,
          price: "$5",
          date: "2024-04-10",
          status: "Available",
        },
        {
          name: "Gingerbread",
          calories: 356,
          price: "$4",
          date: "2024-05-05",
          status: "Unavailable",
        },
      ],
    };
  },
  methods: {
    toggleStatus(item) {
      item.status = item.status === "Available" ? "Unavailable" : "Available";
    },
  },
};
</script>
