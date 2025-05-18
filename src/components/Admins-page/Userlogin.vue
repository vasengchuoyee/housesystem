<template>
  <div class="mt-10">
    <h4 class="text-gray">* ຂໍ້ມູນພະນັກງານ > ຈັດການລູກຄ້າ</h4>
    
    <v-text-field
        v-model="searchQuery"
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search User"
        variant="solo"
        hide-details
        single-line
        class="search-field"
      ></v-text-field>
  

    <v-table height="auto">
      <thead class="bg-orange">
        <tr>
          <th class="text-left">No.</th>
          <th class="text-left">First Name</th>
          <th class="text-left">Last Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Address</th>
          <th class="text-left">Role</th>
          <th class="text-left">Status</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-body">
        <tr v-for="(item, index) in filteredData" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.role }}</td>
          <td>{{ item.status }}</td>
          <td>
            <div class="text-center">
              <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props">
                    <v-icon color="red">mdi-pencil</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item @click="openEditDialog(item)">
                    <v-icon left class="color-hovers">mdi-pencil-circle</v-icon
                    >Edit
                  </v-list-item>
                  <v-list-item @click="openDeleteDialog(item.id)">
                    <v-icon left class="color-hovers">mdi-delete</v-icon>
                    Delete
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-alert v-if="data.length === 0" type="info">
      <v-progress-circular color="orange" indeterminate></v-progress-circular>
      No users available to display...
    </v-alert>

    <!-- Edit User Dialog -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">
          {{ isEditMode ? "Edit User" : "Add User" }}
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="userForm.firstName"
              label="First Name"
              :rules="[(v) => !!v || 'First name is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="userForm.lastName"
              label="Last Name"
              :rules="[(v) => !!v || 'Last name is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="userForm.email"
              label="Email"
              :rules="[
                (v) => !!v || 'Email is required',
                (v) => /.+@.+/.test(v) || 'E-mail must be valid',
              ]"
              required
            ></v-text-field>
            <v-text-field
              v-model="userForm.phone"
              label="Phone"
              :rules="[(v) => !!v || 'Phone is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="userForm.address"
              label="Address"
            ></v-text-field>
            <v-text-field
              v-model="userForm.role"
              label="Role"
              :rules="[(v) => !!v || 'Role is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="userForm.status"
              label="Status"
              :rules="[(v) => !!v || 'Status is required']"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" @click="saveUser">{{
            isEditMode ? "Update" : "Save"
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="dialogDelete" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="confirmDelete">Yes</v-btn>
          <v-btn @click="dialogDelete = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie"; // Import Cookies to manage token retrieval

export default {
  data() {
    return {
      data: [],
      searchQuery: "",
      dialog: false,
      dialogDelete: false,
      valid: false,
      userForm: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        role: "USER",
        status: "active",
      },
      isEditMode: false,
      editUserId: null,
      itemToDelete: null,
      snackbar: false,
      snackbarMessage: "",
    };
  },
  created() {
    this.fetchData(); // Fetch data when component is created
  },
  computed: {
    filteredData() {
      if (!this.searchQuery) {
        return this.data;
      }
      return this.data.filter((item) =>
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    formatDate(dateString) {
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
    fetchData() {
      const token = Cookies.get("token");
      const url = "http://localhost:3000/api/user";
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.data = response.data.data; // Store the fetched data
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Error handling
        });
    },
    openAddDialog() {
      this.isEditMode = false;
      this.resetForm();
      this.dialog = true;
    },
    openEditDialog(item) {
      this.isEditMode = true;
      this.editUserId = item.id;
      this.userForm = { ...item }; // Populate the form with the selected user data
      this.dialog = true;
    },
    saveUser() {
      if (!this.$refs.form.validate()) {
        return;
      }
      const token = Cookies.get("token");
      const url = this.isEditMode
        ? `http://localhost:3000/api/user/${this.editUserId}`
        : "http://localhost:3000/api/user";

      const request = this.isEditMode
        ? axios.put(url, this.userForm, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        : axios.post(url, this.userForm, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

      request
        .then(() => {
          this.snackbarMessage = this.isEditMode
            ? "User updated successfully!"
            : "User added successfully!";
          this.snackbar = true;
          this.dialog = false; // Close the dialog
          this.fetchData(); // Refresh data
          this.resetForm(); // Reset form fields
        })
        .catch((error) => {
          console.error("Error saving user:", error);
        });
    },
    openDeleteDialog(id) {
      this.itemToDelete = id;
      this.dialogDelete = true;
    },
    confirmDelete() {
      const token = Cookies.get("token");
      const url = `http://localhost:3000/api/user/${this.itemToDelete}`;
      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.snackbarMessage = "User deleted successfully!";
          this.snackbar = true;
          this.dialogDelete = false; // Close the delete dialog
          this.fetchData(); // Refresh data
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    },
    resetForm() {
      this.userForm = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        role: "USER",
        status: "active",
      };
      this.editUserId = null;
    },
  },
};
</script>

<style scoped>
.text-primary {
  color: #3f51b5;
}
.bg-body {
  background-color: bisque;
}
.color-hovers {
  color: orange;
}
.color-hovers:hover {
  color: red;
}

.v-list {
  padding: 4px;
  min-width: 150px;
  border-radius: 8px;
}

.v-list-item {
  margin: 4px 0;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.v-list-item:hover {
  background-color: #f5f5f5;
  transform: translateX(4px);
}

.v-list-item-title {
  font-size: 14px;
  margin-left: 8px;
  color: #424242;
}

.color-hovers {
  font-size: 20px;
  margin-right: 8px;
  transition: color 0.3s ease;
}

.v-list-item:hover .color-hovers {
  color: #1976d2;
}

/* Edit button specific styles */
.v-list-item:nth-child(1) .color-hovers {
  color: #4caf50;
}

/* Delete button specific styles */
.v-list-item:nth-child(2) .color-hovers {
  color: #f44336;
}

/* Add animation for menu appearance */
.v-menu__content {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.v-menu__content.menuable__content__active {
  opacity: 1;
  transform: translateY(0);
}
</style>
