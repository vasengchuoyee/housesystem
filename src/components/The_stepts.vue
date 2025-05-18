<template>
  <div>
    <h4 class="text-gray">* ຂໍ້ມູນແບບເຮືອນ > ໜ້າເພີ່ມລາຍການເຮືອນທັງໝົດ</h4>
    <form
      ref="form"
      class="ml-10 bg-white p-10 mt-4"
      @submit.prevent="submitForm"
    >
      <v-row>
        <v-col cols="6">
          <!-- Category Dropdown -->
          <label for="category-select">ປະເພດ:</label>
          <select
            v-if="data.length"
            v-model="selectedCategory"
            id="category-select"
            class="bordered-select"
          >
            <option value="" disabled hidden>Please select a category</option>
            <option v-for="(item, index) in data" :key="index" :value="item.id">
              {{ item.name }}
            </option>
          </select>
          <p v-else>
            <v-progress-circular
              color="orange"
              indeterminate
            ></v-progress-circular>
            Loading...
          </p>

          <!-- Image Uploads -->
          <br /><br />

          <!-- Exterior View -->
          <div v-if="imageUrl1">
            <img :src="imageUrl1" alt="Exterior View" class="up-images" />
          </div>
          <v-file-input
            v-model="exteriorViewFile"
            label="Exterior View"
            prepend-icon="mdi-camera"
            class="inputs-width"
            @change="handleExteriorView"
            accept="image/*"
          ></v-file-input>

          <!-- Interior View -->
          <div class="d-flex flex-wrap">
            <div v-for="(url, index) in imageUrl2" :key="index" class="ma-2">
              <img :src="url" alt="Interior View" class="up-images" />
            </div>
          </div>
          <v-file-input
            v-model="interiorViewFiles"
            label="Interior Views"
            prepend-icon="mdi-camera"
            class="inputs-width"
            @change="handleInteriorViews"
            multiple
            accept="image/*"
          ></v-file-input>

          <!-- Rooftop View -->
          <div v-if="rooftopImageUrl">
            <img :src="rooftopImageUrl" alt="Rooftop View" class="up-images" />
          </div>
          <v-file-input
            v-model="rooftopViewFile"
            label="Rooftop View"
            prepend-icon="mdi-camera"
            class="inputs-width"
            @change="handleRooftopView"
            accept="image/*"
          ></v-file-input>

          <!-- PDF File -->
          <v-file-input
            v-model="pdfFile"
            label="Files PDF"
            prepend-icon="mdi-file-pdf"
            class="inputs-width"
            accept=".pdf"
          ></v-file-input>

          <!-- Other Fields -->
          <v-text-field
            v-model="state.name"
            label="House_Name"
            :counter="10"
            required
          ></v-text-field>
          <v-text-field
            v-model="state.buy_price"
            label="Buy_Price"
            required
          ></v-text-field>
          <v-text-field
            v-model="state.sale_price"
            label="Sale_Price"
            required
          ></v-text-field>
          <v-text-field
            v-model="state.discount"
            label="Discount(%)"
            required
          ></v-text-field>
          <v-container fluid>
            <v-textarea
              v-model="state.description"
              label="Descriptions"
              :counter="200"
            ></v-textarea>
          </v-container>
        </v-col>

        <!-- More Inputs on the Right Side -->
        <v-col cols="6">
          <v-text-field
            v-model="state.width"
            append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
            label="Width"
            class="inputs-width"
            required
          ></v-text-field>
          <v-text-field
            v-model="state.length"
            append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
            label="Length"
            class="inputs-width"
            required
          ></v-text-field>
          <v-select
            v-model="state.bedroom"
            :items="items1"
            label="BedRoom"
            class="inputs-width"
            required
          ></v-select>
          <v-select
            v-model="state.reception_room"
            :items="items2"
            label="ReceptionRoom"
            class="inputs-width"
            required
          ></v-select>
          <v-select
            v-model="state.toilet_room"
            :items="items3"
            label="ToiletRoom"
            class="inputs-width"
            required
          ></v-select>
          <v-select
            v-model="state.kitchen_room"
            :items="items4"
            label="KitchenRoom"
            class="inputs-width"
            required
          ></v-select>
          <v-select
            v-model="state.parking_place"
            :items="items5"
            label="ParkingPlace"
            class="inputs-width"
            required
          ></v-select>
          <v-checkbox
            v-model="state.checkbox"
            label="Do you make sure at all?"
            required
          ></v-checkbox>

          <v-btn class="bg-orange" @click="clear">Clear</v-btn>
          <v-btn class="ml-16" color="primary" type="submit">
            <v-icon>mdi-database-plus</v-icon> Submit
          </v-btn>
        </v-col>
      </v-row>

      <!-- Snackbar for Feedback -->
      <v-snackbar
        v-model="snackbar.show"
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        top
      >
        {{ snackbar.message }}
      </v-snackbar>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
import { API_BEST_URL } from "../../config/Constants";

export default {
  setup() {
    // Reactive state for the form
    const state = reactive({
      name: "",
      files: "",
      buy_price: "",
      sale_price: "",
      discount: "",
      description: "",
      width: "",
      length: "",
      bedroom: null,
      reception_room: null,
      toilet_room: null,
      kitchen_room: null,
      parking_place: null,
      checkbox: false,
    });

    const snackbar = reactive({
      show: false,
      message: "",
      color: "success",
      timeout: 3000,
    });

    const selectedCategory = ref("");
    const exteriorViewFile = ref(null);
    const interiorViewFiles = ref([]);
    const pdfFile = ref(null);
    const videoFile = ref(null);
    const rooftopViewFile = ref(null);
    const imageUrl1 = ref("");
    const imageUrl2 = ref([]);
    const rooftopImageUrl = ref("");
    const data = ref([]); // Category data from API

    const uploadedFiles = reactive({
      exteriorView: null,
      interiorViews: [],
      rooftopView: null,
    });

    // Predefined static items
    const items1 = ["0", "1", "2", "3", "4"];
    const items2 = ["0", "1", "2", "3", "4"];
    const items3 = ["0", "1", "2", "3", "4"];
    const items4 = ["0", "1", "2", "3", "4"];
    const items5 = ["0", "1", "2", "3", "4"];

    // Vuelidate validation setup
    const rules = {
      name: { required },
      buy_price: { required },
      sale_price: { required },
      discount: { required },
      width: { required },
      length: { required },
      bedroom: { required },
      reception_room: { required },
      toilet_room: { required },
      kitchen_room: { required },
      parking_place: { required },
      checkbox: { required },
    };

    // Initialize Vuelidate
    const v$ = useVuelidate(rules, state);

    // Fetch category data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BEST_URL}/api/category`);
        data.value = response.data.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Handle file uploads
    // const handleExteriorView = async () => {
    //   if (exteriorViewFile.value) {
    //     try {
    //       const token = localStorage.getItem('token');
    //       const formData = new FormData();
    //       formData.append("image", exteriorViewFile.value);

    //       const response = await axios.post(
    //         `${API_BEST_URL}/api/upload/exterior-view`,
    //         formData,
    //         {
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //             "Accept": "application/json",
    //             "Authorization": `Bearer ${token}`
    //           }
    //         }
    //       );

    //       if (response.data.path) {
    //         uploadedFiles.exteriorView = response.data.path;
    //         imageUrl1.value = URL.createObjectURL(exteriorViewFile.value);
    //       }
    //     } catch (error) {
    //       console.error("Error uploading exterior view:", error);
    //       snackbar.show = true;
    //       snackbar.message = error.response?.status === 405 ?
    //         "Upload method not allowed. Please contact administrator." :
    //         "Error uploading exterior view: " + (error.response?.data?.message || error.message);
    //       snackbar.color = "error";
    //     }
    //   }
    // };

    // const handleInteriorViews = async () => {
    //   if (interiorViewFiles.value?.length) {
    //     try {
    //       const token = localStorage.getItem('token');
    //       uploadedFiles.interiorViews = [];
    //       imageUrl2.value = [];

    //       for (const file of interiorViewFiles.value) {
    //         const formData = new FormData();
    //         formData.append("image", file);

    //         const response = await axios.post(
    //           `${API_BEST_URL}/api/upload/interior-view`,
    //           formData,
    //           {
    //             headers: {
    //               "Content-Type": "multipart/form-data",
    //               "Accept": "application/json",
    //               "Authorization": `Bearer ${token}`
    //             }
    //           }
    //         );

    //         if (response.data.path) {
    //           uploadedFiles.interiorViews.push(response.data.path);
    //           imageUrl2.value.push(URL.createObjectURL(file));
    //         }
    //       }
    //     } catch (error) {
    //       console.error("Error uploading interior views:", error);
    //       snackbar.show = true;
    //       snackbar.message = error.response?.status === 405 ?
    //         "Upload method not allowed. Please contact administrator." :
    //         "Error uploading interior views: " + (error.response?.data?.message || error.message);
    //       snackbar.color = "error";
    //     }
    //   }
    // };

    const handleRooftopView = async () => {
      if (rooftopViewFile.value) {
        try {
          const token = localStorage.getItem('token');
          const formData = new FormData();
          formData.append("image", rooftopViewFile.value);

          const response = await axios.post(
            `${API_BEST_URL}/api/upload/rooftop-view`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
              }
            }
          );

          if (response.data.path) {
            uploadedFiles.rooftopView = response.data.path;
            rooftopImageUrl.value = URL.createObjectURL(rooftopViewFile.value);
          }
        } catch (error) {
          console.error("Error uploading rooftop view:", error);
          snackbar.show = true;
          snackbar.message = error.response?.status === 405 ?
            "Upload method not allowed. Please contact administrator." :
            "Error uploading rooftop view: " + (error.response?.data?.message || error.message);
          snackbar.color = "error";
        }
      }
    };

    const handleExteriorView = async () => {
      if (exteriorViewFile.value) {
        try {
          const token = localStorage.getItem("token");
          const formData = new FormData();
          formData.append("file", exteriorViewFile.value); // Changed from "image" to "file"

          const response = await axios.post(
            `${API_BEST_URL}/api/upload/exterior-view`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.path) {
            uploadedFiles.exteriorView = response.data.path;
            imageUrl1.value = URL.createObjectURL(exteriorViewFile.value);
          }
        } catch (error) {
          console.error("Error uploading exterior view:", error);
          snackbar.show = true;
          snackbar.message =
            "Error uploading exterior view: " +
            (error.response?.data?.message || error.message);
          snackbar.color = "error";
        }
      }
    };

    const handleInteriorViews = async () => {
      if (interiorViewFiles.value?.length) {
        try {
          const token = localStorage.getItem("token");
          uploadedFiles.interiorViews = [];
          imageUrl2.value = [];

          const formData = new FormData();
          for (const file of interiorViewFiles.value) {
            formData.append("files[]", file); // Changed to handle multiple files in one request
          }

          const response = await axios.post(
            `${API_BEST_URL}/api/upload/interior-view`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.paths) {
            uploadedFiles.interiorViews = response.data.paths;
            interiorViewFiles.value.forEach((file) => {
              imageUrl2.value.push(URL.createObjectURL(file));
            });
          }
        } catch (error) {
          console.error("Error uploading interior views:", error);
          snackbar.show = true;
          snackbar.message =
            "Error uploading interior views: " +
            (error.response?.data?.message || error.message);
          snackbar.color = "error";
        }
      }
    };

    // Clear form fields
    const clear = () => {
      Object.assign(state, {
        name: "",
        files: "",
        buy_price: "",
        sale_price: "",
        discount: "",
        description: "",
        width: "",
        length: "",
        bedroom: null,
        reception_room: null,
        toilet_room: null,
        kitchen_room: null,
        parking_place: null,
        checkbox: false,
      });
      selectedCategory.value = "";
      exteriorViewFile.value = null;
      interiorViewFiles.value = [];
      pdfFile.value = null;
      videoFile.value = null;
      rooftopViewFile.value = null;
      rooftopImageUrl.value = "";
      Object.assign(uploadedFiles, {
        exteriorView: null,
        interiorViews: [],
        rooftopView: null,
      });
    };

    // Submit form data
    // const submitForm = async () => {
    //   try {
    //     const isValid = await v$.value.$validate();
    //     if (!isValid) {
    //       snackbar.show = true;
    //       snackbar.message = "Please fill in all required fields";
    //       snackbar.color = "error";
    //       return;
    //     }

    //     const formData = new FormData();

    //     // Add files only if they exist
    //     if (uploadedFiles.exteriorView) {
    //       formData.append("exterior_view", uploadedFiles.exteriorView);
    //     }

    //     if (uploadedFiles.interiorViews.length) {
    //       uploadedFiles.interiorViews.forEach((path) => {
    //         formData.append("interior_views[]", path);
    //       });
    //     }

    //     if (uploadedFiles.rooftopView) {
    //       formData.append("rooftop_view", uploadedFiles.rooftopView);
    //     }

    //     if (pdfFile.value) {
    //       formData.append("pdf_file", pdfFile.value);
    //     }

    //     // Add other form data
    //     formData.append("category_id", selectedCategory.value);
    //     Object.keys(state).forEach(key => {
    //       if (state[key] !== null && state[key] !== undefined) {
    //         formData.append(key, state[key]);
    //       }
    //     });

    //     const response = await axios.post(`${API_BEST_URL}/api/house`, formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         "Accept": "application/json"
    //       },
    //     });

    //     console.log("Response:", response.data);
    //     clear();
    //     snackbar.show = true;
    //     snackbar.message = "Data submitted successfully";
    //     snackbar.color = "success";
    //   } catch (error) {
    //     console.error("Error submitting form:", error);
    //     snackbar.show = true;
    //     snackbar.message = error.response?.data?.message || "Error submitting data";
    //     snackbar.color = "error";
    //   }
    // };

    const submitForm = async () => {
      try {
        const isValid = await v$.value.$validate();
        if (!isValid) {
          snackbar.show = true;
          snackbar.message = "Please fill in all required fields";
          snackbar.color = "error";
          return;
        }

        const token = localStorage.getItem("token");
        const formData = new FormData();

        // Add files
        if (exteriorViewFile.value) {
          formData.append("exterior_view", exteriorViewFile.value);
        }

        if (interiorViewFiles.value.length) {
          interiorViewFiles.value.forEach((file, index) => {
            formData.append(`interior_views[${index}]`, file);
          });
        }

        if (rooftopViewFile.value) {
          formData.append("rooftop_view", rooftopViewFile.value);
        }

        if (pdfFile.value) {
          formData.append("pdf_file", pdfFile.value);
        }

        // Add other form data
        formData.append("category_id", selectedCategory.value);
        Object.keys(state).forEach((key) => {
          if (state[key] !== null && state[key] !== undefined) {
            formData.append(key, state[key].toString());
          }
        });

        const response = await axios.post(
          `${API_BEST_URL}/api/house`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response:", response.data);
        clear();
        snackbar.show = true;
        snackbar.message = "Data submitted successfully";
        snackbar.color = "success";
      } catch (error) {
        console.error("Error submitting form:", error);
        snackbar.show = true;
        snackbar.message =
          "Error submitting form: " +
          (error.response?.data?.message || error.message);
        snackbar.color = "error";
      }
    };

    fetchData();

    return {
      state,
      snackbar,
      selectedCategory,
      exteriorViewFile,
      interiorViewFiles,
      pdfFile,
      videoFile,
      rooftopViewFile,
      imageUrl1,
      imageUrl2,
      rooftopImageUrl,
      data,
      items1,
      items2,
      items3,
      items4,
      items5,
      clear,
      submitForm,
      handleExteriorView,
      handleInteriorViews,
      handleRooftopView,
      v$,
    };
  },
};
</script>
