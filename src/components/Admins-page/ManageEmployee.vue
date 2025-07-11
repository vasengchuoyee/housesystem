<!-- Employees.vue -->
<template>
  <div class="mt-10">
    <h4 class="text-gray">* ຂໍ້ມູນພະນັກງານ > ຈັດການພະນັກງານ</h4>

    <v-col>
      <v-text-field
        v-model="searchQuery"
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search employees"
        variant="solo"
        hide-details
        single-line
        class="search-field"
      ></v-text-field>
    </v-col>

    <v-table height="auto">
      <thead class="bg-orange">
        <tr>
          <th class="text-left">No.</th>
          <th class="text-left">First Name</th>
          <th class="text-left">Last Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Address</th>
          <th class="text-left">Position</th>
          <th class="text-left">Date/Work</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-body">
        <tr v-for="(item, index) in filteredData" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.position }}</td>
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
                  <v-list-item @click="openEditDialog(item)">
                      <v-icon class="color-hovers">mdi-pencil-circle</v-icon>
                      Edit
                    <!-- <v-list-item-title></v-list-item-title> -->
                  </v-list-item>
                  <v-list-item @click="openDeleteDialog(item.id)">
                      <v-icon class="color-hovers">mdi-delete</v-icon>
                      Delete
                    </v-list-item>
                    <!-- <v-list-item-title></v-list-item-title> -->
                </v-list>

              </v-menu>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-alert v-if="data.length === 0" type="info">
      <v-progress-circular color="orange" indeterminate></v-progress-circular>
      No categories available to display...
    </v-alert>

    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card>
        <v-card-title class="headline">
          {{ isEditMode ? "Edit Employee" : "Add Employee" }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="saveEmployee">
            <v-text-field
              v-model="employeeForm.firstName"
              label="First Name"
              :rules="[(v) => !!v || 'First name is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="employeeForm.lastName"
              label="Last Name"
              :rules="[(v) => !!v || 'Last name is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="employeeForm.email"
              label="Email"
              :rules="[
                (v) => !!v || 'Email is required',
                (v) => /.+@.+/.test(v) || 'E-mail must be valid',
              ]"
              required
            ></v-text-field>
            <v-text-field
              v-model="employeeForm.address"
              label="Address"
            ></v-text-field>
            <v-text-field
              v-model="employeeForm.position"
              label="Position"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="closeDialog">Cancel</v-btn>
          <v-btn
            color="blue darken-1"
            :loading="saving"
            :disabled="!valid"
            @click="saveEmployee"
          >
            {{ isEditMode ? "Update" : "Save" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500" persistent>
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text
          >Are you sure you want to delete this employee?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="dialogDelete = false">No</v-btn>
          <v-btn color="red" :loading="deleting" @click="confirmDelete"
            >Yes</v-btn
          >
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
export default {
  data() {
    return {
      data: [],
      searchQuery: "",
      dialog: false,
      dialogDelete: false,
      valid: false,
      loading: false,
      saving: false,
      deleting: false,
      employeeForm: {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        position: "",
      },
      isEditMode: false,
      editEmployeeId: null,
      itemToDelete: null,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
    };
  },
  created() {
    this.checkAuthAndFetch();
  },
  computed: {
    filteredData() {
      if (!this.searchQuery) {
        this.$emit("update-total-employees", this.data.length); // Emit total employees
        return this.data;
      }
      const filtered = this.data.filter((item) =>
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
      this.$emit("update-total-employees", filtered.length); // Emit filtered total
      return filtered;
    },
  },
  methods: {
    checkAuthAndFetch() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.showSnackbar("Please login first", "error");
        this.$router.push("/login");
        return;
      }
      this.fetchData();
    },

    async fetchData() {
      this.loading = true;
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/employee", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        this.data = result.data || [];
        this.showSnackbar("Employees loaded successfully", "success");
      } catch (error) {
        this.handleError(error, "Error fetching employees");
      } finally {
        this.loading = false;
      }
    },

        // Update the saveEmployee method
    async saveEmployee() {
      if (!this.$refs.form.validate()) {
        this.showSnackbar("Please fill all required fields correctly", "error");
        return;
      }

      this.saving = true;
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
        return;
      }

      try {
        const url = this.isEditMode
          ? `http://localhost:3000/api/employee/${this.editEmployeeId}`
          : "http://localhost:3000/api/employee";

        // Create payload
        const payload = {
          firstName: this.employeeForm.firstName.trim(),
          lastName: this.employeeForm.lastName.trim(),
          email: this.employeeForm.email.trim(),
          address: this.employeeForm.address?.trim() || "",
          position: this.employeeForm.position?.trim() || ""
        };

        console.log('Request URL:', url);
        console.log('Request Payload:', payload);
        console.log('Request Method:', this.isEditMode ? 'PUT' : 'POST');

        const response = await fetch(url, {
          method: this.isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Server Response:', data);

        if (!response.ok) {
          throw new Error(data.message || data.error || 'Server error occurred');
        }

        this.showSnackbar(
          this.isEditMode ? "Employee updated successfully" : "Employee added successfully",
          "success"
        );
        await this.fetchData();
        this.closeDialog();
      } catch (error) {
        console.error("Save employee error:", error);
        this.showSnackbar(
          `Failed to ${this.isEditMode ? "update" : "add"} employee: ${error.message}`,
          "error"
        );
      } finally {
        this.saving = false;
      }
    },

    // Update the confirmDelete method
    async confirmDelete() {
      this.deleting = true;
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
        return;
      }

      try {
        const url = `http://localhost:3000/api/employee/${this.itemToDelete}`;
        console.log('Delete Request URL:', url);

        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log('Delete Response:', data);

        if (!response.ok) {
          throw new Error(data.message || data.error || `Failed to delete employee (${response.status})`);
        }

        this.showSnackbar("Employee deleted successfully", "success");
        await this.fetchData();
        this.dialogDelete = false;
        this.itemToDelete = null;
      } catch (error) {
        console.error("Delete error:", error);
        this.showSnackbar(`Error deleting employee: ${error.message}`, "error");
      } finally {
        this.deleting = false;
      }
    },

    // async saveEmployee() {
    //   if (!this.$refs.form.validate()) {
    //     this.showSnackbar("Please fill all required fields correctly", "error");
    //     return;
    //   }

    //   this.saving = true;
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     this.$router.push("/");
    //     return;
    //   }

    //   try {
    //     const url = this.isEditMode
    //       ? `http://localhost:3000/api/employee/${this.editEmployeeId}`
    //       : "http://localhost:3000/api/employee";

    //     // Prepare the request payload
    //     const payload = {
    //       firstName: this.employeeForm.firstName,
    //       lastName: this.employeeForm.lastName,
    //       email: this.employeeForm.email,
    //       address: this.employeeForm.address || "",
    //       position: this.employeeForm.position || "",
    //     };

    //     // If editing, remove any undefined or null values
    //     if (this.isEditMode) {
    //       Object.keys(payload).forEach((key) =>
    //         payload[key] === undefined || payload[key] === null
    //           ? delete payload[key]
    //           : {}
    //       );
    //     }

    //     const response = await fetch(url, {
    //       method: this.isEditMode ? "PUT" : "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify(payload),
    //     });

    //     const data = await response.json();

    //     if (!response.ok) {
    //       throw new Error(data.message || `Error: ${response.statusText}`);
    //     }

    //     this.showSnackbar(
    //       this.isEditMode
    //         ? "Employee updated successfully"
    //         : "Employee added successfully",
    //       "success"
    //     );
    //     await this.fetchData();
    //     this.closeDialog();
    //   } catch (error) {
    //     console.error("Save employee error:", error);
    //     this.showSnackbar(
    //       `Failed to ${this.isEditMode ? "update" : "add"} employee: ${
    //         error.message
    //       }`,
    //       "error"
    //     );
    //   } finally {
    //     this.saving = false;
    //   }
    // },

    // async saveEmployee() {
    //   if (!this.$refs.form.validate()) {
    //     this.showSnackbar("Please fill all required fields correctly", "error");
    //     return;
    //   }

    //   this.saving = true;
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     this.$router.push("/login");
    //     return;
    //   }

    //   const url = this.isEditMode
    //     ? `http://localhost:3000/api/employee/${this.editEmployeeId}`
    //     : "http://localhost:3000/api/employee";

    //   try {
    //     const response = await fetch(url, {
    //       method: this.isEditMode ? "PUT" : "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`
    //       },
    //       body: JSON.stringify({
    //         id: this.isEditMode ? this.editEmployeeId : undefined,
    //         firstName: this.employeeForm.firstName,
    //         lastName: this.employeeForm.lastName,
    //         email: this.employeeForm.email,
    //         address: this.employeeForm.address || "",
    //         position: this.employeeForm.position || ""
    //       })
    //     });

    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    //     }

    //     await response.json();
    //     this.showSnackbar(
    //       this.isEditMode ? "Employee updated successfully" : "Employee added successfully",
    //       "success"
    //     );
    //     this.fetchData();
    //     this.closeDialog();
    //   } catch (error) {
    //     this.handleError(error, "Error saving employee");
    //   } finally {
    //     this.saving = false;
    //   }
    // },

    async confirmDelete() {
      this.deleting = true;
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/employee/${this.itemToDelete}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        this.showSnackbar("Employee deleted successfully", "success");
        this.fetchData();
        this.dialogDelete = false;
        this.itemToDelete = null;
      } catch (error) {
        this.handleError(error, "Error deleting employee");
      } finally {
        this.deleting = false;
      }
    },

    formatDate(dateString) {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    openEditDialog(item) {
      this.isEditMode = true;
      this.editEmployeeId = item.id;
      this.employeeForm = { ...item }; // Create a copy of the item
      this.dialog = true;
    },

    openDeleteDialog(id) {
      this.itemToDelete = id;
      this.dialogDelete = true;
    },

    closeDialog() {
      this.dialog = false;
      this.resetForm();
    },

    resetForm() {
      this.employeeForm = {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        position: "",
      };
      this.isEditMode = false;
      this.editEmployeeId = null;
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    },

    showSnackbar(message, color = "success") {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    handleError(error, defaultMessage) {
      console.error(error);
      this.showSnackbar(error.message || defaultMessage, "error");
    },
  },
};
</script>

<style scoped>
.bg-body {
  background-color: bisque;
}

a {
  cursor: pointer;
}

.dialog-save {
  background-color: rgb(253, 251, 243);
  border-radius: 100%;
  box-shadow: 0px 0px 2px 2px;
}

.color-hovers:hover {
  color: #1976d2;
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
