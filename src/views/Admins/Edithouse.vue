<template>
  <div class="flex-container">
      <v-card class="editcard">
        <h2 class="text-center">Edit House Information</h2>
        <v-form @submit.prevent="updateHouse">
          <v-text-field
            v-model="house.name"
            label="House Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="house.buy_price"
            label="buy Price"
            required
          ></v-text-field>
          <v-text-field
            v-model="house.sale_price"
            label="Sale Price"
            required
          ></v-text-field>
          <v-text-field
            v-model="house.description"
            label="description"
            required
          ></v-text-field>
          <v-text-field
            v-model="house.width"
            label="width"
            required
          ></v-text-field>
          <v-text-field
            v-model="house.length"
            label="length"
            required
          ></v-text-field>
          <v-text-field
            v-model="house.bedroom"
            label="Bedroom"
            required
          ></v-text-field>
          <v-text-field
            v-model="house.reception_room"
            label="Reception Room"
            required
          ></v-text-field>
          <v-text-field
            v-model="house.toilet_room"
            label="Toilet Room"
            required
          ></v-text-field>
          <v-text-field
            v-model="house.kitchen_room"
            label="Kitchen Room"
            required
          ></v-text-field>
          <v-text-field
            v-model="house.parking_place"
            label="parkingPlace"
            required
          ></v-text-field>

          <v-row>
            <v-col>
              <v-btn @click="$router.back()" color="secondary">Cancel</v-btn>
            </v-col>
            <v-col>
              <v-btn type="submit" color="primary">Save</v-btn>
            </v-col>
          </v-row>
        </v-form>
    </v-card>
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
    };
  },
  methods: {
    async fetchHouseDetails() {
      const houseId = this.$route.params.id;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/house/id/${houseId}`
        );
        this.house = response.data.data;
      } catch (error) {
        console.error("Error fetching house details:", error.message);
      }
    },
    async updateHouse() {
      const houseId = this.$route.params.id;
      try {
        await axios.put(
          `http://localhost:3000/api/house/${houseId}`,
          this.house
        );
        this.$router.push("/admins");
      } catch (error) {
        console.error("Error updating house:", error.message);
      }
      alert("Data saved successfully!");
    },
  },
  created() {
    this.fetchHouseDetails();
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
}

.editcard {
  width: 900px;
  padding: 20px; 
}
</style>
