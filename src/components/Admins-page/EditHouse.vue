<template>
  <div>
    <h4 class="text-gray">* Edit House Details</h4>
    <v-form ref="editForm" v-model="valid">
      <v-text-field
        v-model="house.name"
        label="House Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="house.sale_price"
        label="Sale Price"
        type="number"
        required
      ></v-text-field>
      <v-text-field
        v-model="house.bedroom"
        label="Number of Bedrooms"
        type="number"
        required
      ></v-text-field>
      <v-text-field
        v-model="house.reception_room"
        label="Number of Reception Rooms"
        type="number"
        required
      ></v-text-field>
      <v-text-field
        v-model="house.toilet_room"
        label="Number of Toilets"
        type="number"
        required
      ></v-text-field>
      <v-text-field
        v-model="house.kitchen_room"
        label="Number of Kitchens"
        type="number"
        required
      ></v-text-field>
      <v-btn color="primary" @click="updateHouse" :disabled="!valid">Save</v-btn>
      <v-btn @click="$router.push({ name: 'Allhouses' })">Cancel</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      house: {
        name: "",
        sale_price: "",
        bedroom: "",
        reception_room: "",
        toilet_room: "",
        kitchen_room: "",
      },
      valid: false,
    };
  },
  methods: {
    async fetchHouseDetails() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/house/${this.$route.params.id}`
        );
        this.house = response.data.data;
      } catch (error) {
        console.error("Error fetching house details:", error.message);
      }
    },
    async updateHouse() {
      try {
        await axios.put(
          `http://localhost:3000/api/house/${this.$route.params.id}`,
          this.house
        );
        alert("Edit success"); // Show success alert
        this.$router.push({ path: "/admins" }); // Navigate to /admins on success
      } catch (error) {
        console.error("Error updating house:", error.message);
      }
    },
  },
  created() {
    this.fetchHouseDetails();
  },
};
</script>
