<template>
  <LayoutPage>
    <v-container>
      <Appbar />
      <h2 class="text-orange text-center">User Profile</h2>
      <v-btn class="bg-green"> My favorite </v-btn>
      <div class="pa-4 text-center">
        <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ props: activatorProps }">
            <v-avatar size="60" v-bind="activatorProps" class="margin-icon">
              <template v-if="userProfile.image">
                <img :src="userProfile.image" alt="Profile" />
              </template>
              <template v-else>
                <v-icon color="orange" style="cursor: pointer">mdi-48px mdi-account </v-icon>                
              </template>             
            </v-avatar>            
          </template>

          <v-card>
            <v-card-text>
              <v-form ref="profileForm" @submit.prevent="saveProfile">
                <v-col cols="12" class="text-center">
                  <v-avatar size="100">
                    <img :src="userProfile.image" alt="Profile" />
                  </v-avatar>
                  <v-icon
                    small
                    color="primary"
                    class="mt-3"
                    @click="triggerFileInput"
                  >
                    mdi-camera
                  </v-icon>
                  <input
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    @change="onImageChange"
                    style="display: none"
                  />
                </v-col>
                <!-- Form Fields -->
                <v-row dense>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="userProfile.firstName"
                      label="First name*"
                      variant="outlined"
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="userProfile.lastName"
                      label="Last name*"
                      variant="outlined"
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="userProfile.phone"
                      label="Phone*"
                      variant="outlined"
                      required
                      :rules="[rules.required, rules.phone]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="userProfile.email"
                      label="Email*"
                      variant="outlined"
                      required
                      :rules="[rules.required, rules.email]"
                    ></v-text-field>
                  </v-col>

                  <!-- <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="userProfile.password"
                      label="Password*"
                      type="password"
                      variant="outlined"
                      required
                      :rules="[rules.required, rules.password]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      v-model="userProfile.confirmPassword"
                      label="Confirm Password*"
                      type="password"
                      variant="outlined"
                      required
                      :rules="[rules.required, rules.password]"
                    ></v-text-field>
                  </v-col> -->
                </v-row>

                <small class="text-caption text-medium-emphasis">
                  Make sure you really want to change
                </small>
              </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text="Close"
                variant="plain"
                @click="dialog = false"
              ></v-btn>
              <v-btn
                color="primary"
                text="Save"
                variant="tonal"
                @click="saveProfile"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <!-- Order History Section -->
      <v-card>
        <v-card-title class="text-orange">Order History</v-card-title>
        <v-card-text>
          <!-- Search Bar -->
          <v-row>
            <v-col>
              <v-text-field
                v-model="search"
                label="Search by Product Name"
                append-inner-icon="mdi-magnify"
                variant="solo"
                hide-details
                single-line
                rounded
              ></v-text-field>
            </v-col>
            <v-col>
              <!-- Filter By Status -->
              <v-select
                v-model="selectedStatus"
                :items="statuses"
                label="Filter by Status"
                variant="outlined"
                class="mx-4"
              ></v-select>
            </v-col>
          </v-row>

          <!-- Orders Table -->
          <div class="order-table-wrapper">
            <table class="order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Link Files</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in filteredOrders" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>{{ order.product }}</td>
                  <td>{{ order.quantity }}</td>
                  <td>{{ order.totalPrice }}</td>
                  <td>PDF House_files</td>
                  <td>
                    <span :class="getStatusClass(order.status)">
                      {{ order.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
          ></v-pagination>
        </v-card-text>
      </v-card>

      <!-- Snackbar Notification -->
      <v-snackbar v-model="snackbar" :timeout="timeout" top>
        {{ snackbarMessage }}
        <v-btn text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </LayoutPage>
</template>

<script>
import axios from "axios";
import LayoutPage from "../layouts/LayoutPage.vue";

export default {
  name: "UserProfile",
  components: {
    LayoutPage,
  },
  data() {
    return {
      userProfile: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
      },
      dialog: false,
      apiUrl: "http://localhost:3000/api/user",
      orders: [
        {
          id: 1,
          product: "Product A",
          quantity: 2,
          totalPrice: 100,
          status: "Success",
        },
        {
          id: 2,
          product: "Product B",
          quantity: 1,
          totalPrice: 50,
          status: "Pending",
        },
        {
          id: 3,
          product: "Product C",
          quantity: 3,
          totalPrice: 150,
          status: "Failed",
        },
      ],
      search: "",
      selectedStatus: "",
      statuses: ["All", "Success", "Pending", "Failed"],
      currentPage: 1,
      itemsPerPage: 5,
      snackbar: false,
      snackbarMessage: "",
      timeout: 3000,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return pattern.test(value) || "Invalid email.";
        },
        phone: (value) => value.length === 10 || "Phone must be 10 digits.",
        password: (value) =>
          value.length >= 6 || "Password must be at least 6 characters.",
      },
    };
  },
  computed: {
    filteredOrders() {
      let orders = this.orders;

      if (this.search) {
        orders = orders.filter((order) =>
          order.product.toLowerCase().includes(this.search.toLowerCase())
        );
      }

      if (this.selectedStatus && this.selectedStatus !== "All") {
        orders = orders.filter((order) => order.status === this.selectedStatus);
      }

      return orders.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    },
    totalPages() {
      return Math.ceil(this.orders.length / this.itemsPerPage);
    },
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    fetchUserProfile() {
      axios
        .get(`${this.apiUrl}/${this.userId}`)
        .then((response) => {
          const { firstName, lastName, phone, email, image } = response.data;
          this.userProfile = { firstName, lastName, phone, email, image };
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.userProfile.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveProfile() {
      axios
        .put(`${this.apiUrl}/${this.userId}`, this.userProfile)
        .then(() => {
          this.snackbarMessage = "Profile updated successfully!";
          this.snackbar = true;
          this.dialog = false;
        })
        .catch((error) => {
          this.snackbarMessage = "Error updating profile.";
          this.snackbar = true;
          console.error("Error updating profile:", error);
        });
    },
    getStatusClass(status) {
      switch (status) {
        case "Success":
          return "status-success";
        case "Pending":
          return "status-pending";
        case "Failed":
          return "status-failed";
        default:
          return "status-unknown";
      }
    },
  },
};
</script>

<style scoped>
.v-avatar img {
  object-fit: cover;
}
img {
  width: 100px;
  height: auto;
  border-radius: 50px;
}
.order-table-wrapper {
  overflow-x: auto;
}
.order-table {
  width: 100%;
  border-collapse: collapse;
}
.order-table th,
.order-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.order-table th {
  background-color: yellow;
  font-weight: bold;
}
.status-success {
  color: green;
}
.status-pending {
  color: orange;
}
.status-failed {
  color: red;
}
.status-unknown {
  color: grey;
}
.margin-icon {
  margin-left: 1000px;
  
}
</style>
