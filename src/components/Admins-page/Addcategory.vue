<template>
  <div class="categoryss">
    <h4 class="text-gray mt-4">* ໜ້າເພີ່ມປະເພດເຮືອນ</h4><br>
    <div class="bg-white">
    <v-row >
      <v-col>
        <v-text-field
          v-model="searchQuery"
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Search category"
          variant="solo"
          hide-details
          single-line
        ></v-text-field>
      </v-col>
      <v-col>
        <div class="text-center pa-4">
          <v-btn @click="openAddDialog" class="bg-orange text-primary">
            <v-icon>mdi-database-plus</v-icon>
            ADD Category</v-btn
          >

          <v-dialog v-model="dialog" width="auto">
            <v-card
              class="dialog-save"
              max-width="800"
              prepend-icon="mdi-checkbox-marked-circle"
              :title="isEditMode ? 'Edit category' : 'Add a new category'"
            >
              <v-text-field
                v-model="newCategory.name"
                label="Category"
                variant="underlined"
              ></v-text-field>

              <v-text-field
                v-model="newCategory.description"
                label="Description"
                variant="underlined"
              ></v-text-field>

              <template v-slot:actions>
                <v-btn
                  class="ms-auto bg-red"
                  text="Clear"
                  @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn color="primary" @click="saveCategory">
                  <v-icon>mdi-database-plus</v-icon>
                  Save</v-btn
                >
              </template>
            </v-card>
          </v-dialog>

          <!-- Snackbar for success alert -->
          <v-snackbar v-model="snackbar" :timeout="3000">
            {{ snackbarMessage }}
            <v-btn text @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </div>
      </v-col>
    </v-row>
    <br />

    <v-table height="auto">
      <thead class="table-head">
        <tr>
          <th class="text-left">No.</th>
          <th class="text-left">Category</th>
          <th class="text-left">Description</th>
          <th class="text-left">Date/Time</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody class="bg-body">
        <tr v-for="(item, index) in data" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ formatDate(item.createdAt) }}</td>
          <td>
            <div class="text-center">
              <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props">
                    <v-icon color="red">mdi-pencil</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <div>
                    <v-list-item>
                      <a @click="openEditDialog(item)">
                        <v-icon left class="color-hovers"
                          >mdi-pencil-circle</v-icon
                        >Edit</a
                      >
                    </v-list-item>
                    <v-list-item @click="openDeleteDialog(item.id)">
                      <v-icon left class="color-hovers">mdi-delete</v-icon>
                      Delete
                    </v-list-item>
                  </div>

                  <!-- Delete Confirmation Dialog -->
                  <v-dialog v-model="dialogDelete" max-width="500">
                    <v-card>
                      <v-card-title class="headline"
                        >Confirm Deletion</v-card-title
                      >
                      <v-card-text
                        >Are you sure you want to delete this
                        category?</v-card-text
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red" @click="confirmDelete">Yes</v-btn>
                        <v-btn @click="dialogDelete = false">No</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      searchQuery: "",
      dialog: false,
      snackbar: false,
      snackbarMessage: "",
      isEditMode: false,
      editItemId: null,
      dialogDelete: false,
      newCategory: {
        name: "",
        description: "",
      },
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
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      const url = "http://localhost:3000/api/category";
      axios
        .get(url)
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
      this.editItemId = item.id;
      this.newCategory = {
        name: item.name || "",
        description: item.description || "",
      };
      this.dialog = true;
    },
    saveCategory() {
      const url = this.isEditMode
        ? `http://localhost:3000/api/category/${this.editItemId}`
        : "http://localhost:3000/api/category";

      const request = this.isEditMode
        ? axios.put(url, this.newCategory)
        : axios.post(url, this.newCategory);

      request
        .then((response) => {
          this.snackbarMessage = this.isEditMode
            ? "Category updated successfully!"
            : "Category added successfully!";
          this.snackbar = true;
          this.dialog = false; // Close the dialog
          this.fetchData(); // Refresh data
          this.resetForm(); // Reset form fields
        })
        .catch((error) => {
          console.error("Error saving category:", error);
        });
    },

    openDeleteDialog(id) {
      this.itemToDelete = id;
      this.dialogDelete = true; // Open the confirmation dialog
    },
    confirmDelete() {
      const url = `http://localhost:3000/api/category/${this.itemToDelete}`;
      axios
        .delete(url)
        .then(() => {
          this.snackbarMessage = "Category deleted successfully!";
          this.snackbar = true;
          this.fetchData(); // Refresh data
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        })
        .finally(() => {
          this.dialogDelete = false; // Close the confirmation dialog
          this.itemToDelete = null; // Reset the item to delete
        });
    },
    resetForm() {
      this.newCategory = {
        name: "",
        description: "",
        date: "",
      };
    },
  },
};
</script>

<style>
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
.categoryss {
  width: 1200px;
  height: auto;
  padding: 10px;
}

.table-head {
  background-color: rgb(205, 203, 203);
}
</style>
