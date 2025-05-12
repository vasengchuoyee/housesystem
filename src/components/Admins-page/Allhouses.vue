<template>
  <div>
    <h4 class="text-gray">* ຂໍ້ມູນແບບເຮືອນ > ຈັດການແບບເຮືອນທັງໝົດ</h4>

    <v-row>
      <v-col>
        <v-text-field
          v-model="searchQuery"
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="ຄົ້ນຫາຂໍ້ມູນແບບເຮືອນ"
          variant="solo"
          hide-details
          single-line
          class="search-field"
        ></v-text-field>
      </v-col>
    </v-row>
    <br />

    <v-table height="auto" v-if="!loading && houses.length">
      <thead class="bg-orange">
        <tr>
          <th class="text-left">No.</th>
          <th class="text-left">Name</th>
          <th class="text-left">Sale Price</th>
          <th class="text-left">Bedroom</th>
          <th class="text-left">Reception Room</th>
          <th class="text-left">Toilet Room</th>
          <th class="text-left">Kitchen Room</th>
          <th class="text-left">Date/Time</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody class="bg-body">
        <tr v-for="(item, index) in filteredHouses" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.sale_price }}</td>
          <td>{{ item.bedroom }}</td>
          <td>{{ item.reception_room }}</td>
          <td>{{ item.toilet_room }}</td>
          <td>{{ item.kitchen_room }}</td>
          <td>{{ formatDate(item.createdAt) }}</td>
          <td>
            <div class="text-center">
              <v-menu offset-y>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon small>
                    <v-icon color="red">mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="openEditDialog(item.id)">
                    <v-list-item-icon>
                      <v-icon class="color-hovers">mdi-pencil-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="openDeleteDialog(item.id)">
                    <v-list-item-icon>
                      <v-icon class="color-hovers">mdi-delete</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-alert v-else type="info">
      <v-progress-circular color="orange" indeterminate></v-progress-circular>
      No houses available to display...
    </v-alert>

    <v-container>
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="5"
        @input="handlePageChange"
      ></v-pagination>
    </v-container>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="dialogDelete" max-width="500" persistent>
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this house?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="closeDeleteDialog">No</v-btn>
          <v-btn color="red" :loading="deleting" @click="confirmDelete">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="6000" :color="snackbarColor">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      houses: [],
      dialogDelete: false,
      selectedHouse: null,
      searchQuery: "",
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      loading: false,
      deleting: false,
      itemsPerPage: 5,
      page: 1,
      totalItems: 0,
    };
  },
  computed: {
    filteredHouses() {
      if (this.searchQuery) {
        return this.houses.filter((house) =>
          house.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.houses;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },
  methods: {
    openEditDialog(houseId) {
      try {
        this.$router.push({ name: "EditHouse", params: { id: houseId } });
      } catch (error) {
        this.showSnackbar("Error navigating to edit page", "error");
        console.error("Navigation error:", error);
      }
    },
    formatDate(dateString) {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("default", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(date);
    },
    async fetchHouses() {
      this.loading = true;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/house", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: this.page,
            limit: this.itemsPerPage,
          },
        });
        
        this.houses = response.data.data || [];
        this.totalItems = response.data.total || this.houses.length;
        this.showSnackbar("Houses loaded successfully", "success");
      } catch (error) {
        this.showSnackbar("Error fetching houses: " + error.message, "error");
        console.error("Error fetching houses:", error);
      } finally {
        this.loading = false;
      }
    },
    openDeleteDialog(houseId) {
      this.selectedHouse = houseId;
      this.dialogDelete = true;
    },
    closeDeleteDialog() {
      this.dialogDelete = false;
      this.selectedHouse = null;
    },
    async confirmDelete() {
      if (!this.selectedHouse) return;
      
      this.deleting = true;
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/house/${this.selectedHouse}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        this.showSnackbar("House deleted successfully!", "success");
        this.closeDeleteDialog();
        await this.fetchHouses();
      } catch (error) {
        this.showSnackbar("Error deleting house: " + error.message, "error");
        console.error("Error deleting house:", error);
      } finally {
        this.deleting = false;
      }
    },
    handlePageChange(newPage) {
      this.page = newPage;
      this.fetchHouses();
    },
    showSnackbar(message, color = "success") {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },
  created() {
    this.fetchHouses();
  },
};
</script>

<style scoped>
.bg-orange {
  background-color: #ff9800;
}

.bg-body {
  background-color: bisque;
}

.text-center {
  display: flex;
  justify-content: center;
}

.color-hovers:hover {
  color: #1976d2;
}

.search-field {
  max-width: 400px;
}
</style>