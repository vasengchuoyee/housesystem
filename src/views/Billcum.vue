<template>
    <form ref="form" class="ml-10 bg-white" @submit.prevent="submitForm">
      <h2 class="mt-4 text-center text-primary">ໜ້າເພີ່ມລາຍການເຮືອນທັງໝົດ</h2>
      <v-row>
        <v-col cols="6">
          <label for="category-select">ປະເພດ:</label>
          <select
            v-if="data.length"
            v-model="selectedCategory"
            id="category-select"
            class="bordered-select"
          >
            <option value="" disabled selected hidden>
              Please select a category
            </option>
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
          <div>
            <div v-if="imageUrl1">
              <img
                :src="imageUrl1"
                alt="Uploaded Exterior Image"
                class="up-images"
              />
            </div>
            <v-file-input
              label="House_Image"
              prepend-icon="mdi-camera"
              @change="(event) => handleFileUpload(event, 'exterior')"
              class="inputs-width"
            ></v-file-input>
  
            <div v-if="imageUrls2.length">
              <div v-for="(url, index) in imageUrls2" :key="index">
                <img :src="url" alt="Uploaded Interior Image" class="up-images" />
              </div>
            </div>
            <v-file-input
              label="Interior Images"
              prepend-icon="mdi-camera"
              multiple
              @change="handleMultipleFileUpload"
              class="inputs-width"
            ></v-file-input>
          </div>
  
          <!-- File Uploads -->
          <v-file-input
            label="PDF_House"
            prepend-icon="mdi-link-variant"
            class="inputs-width"
          ></v-file-input>
          <v-file-input
            v-model="videoFile"
            label="Video_House"
            prepend-icon="mdi-link-variant"
            @change="(event) => handleFileUpload(event, 'video')"
            class="inputs-width"
            required
          ></v-file-input>
  
          <!-- Other Fields -->
          <v-text-field
            v-model="state.name"
            label="House_Name"
            :counter="10"
            required
          ></v-text-field>
          <v-text-field
            v-model="state.buyPrice"
            label="Buy_Price"
            required
          ></v-text-field>
          <v-text-field
            v-model="state.salePrice"
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
            :error-messages="v$.bedroom.$errors.map((e) => e.$message)"
            :items="items1"
            label="BedRoom"
            class="inputs-width"
            required
            @blur="v$.bedroom.$touch"
            @change="v$.bedroom.$touch"
          ></v-select>
  
          <v-select
            v-model="state.receptionRoom"
            :error-messages="v$.receptionRoom.$errors.map((e) => e.$message)"
            :items="items2"
            label="ReceptionRoom"
            class="inputs-width"
            required
            @blur="v$.receptionRoom.$touch"
            @change="v$.receptionRoom.$touch"
          ></v-select>
  
          <v-select
            v-model="state.toiletRoom"
            :error-messages="v$.toiletRoom.$errors.map((e) => e.$message)"
            :items="items3"
            label="ToiletRoom"
            class="inputs-width"
            required
            @blur="v$.toiletRoom.$touch"
            @change="v$.toiletRoom.$touch"
          ></v-select>
  
          <v-select
            v-model="state.kitchenRoom"
            :error-messages="v$.kitchenRoom.$errors.map((e) => e.$message)"
            :items="items4"
            label="KitchenRoom"
            class="inputs-width"
            required
            @blur="v$.kitchenRoom.$touch"
            @change="v$.kitchenRoom.$touch"
          ></v-select>
  
          <v-select
            v-model="state.parkingPlace"
            :error-messages="v$.parkingPlace.$errors.map((e) => e.$message)"
            :items="items5"
            label="ParkingPlace"
            class="inputs-width"
            required
            @blur="v$.parkingPlace.$touch"
            @change="v$.parkingPlace.$touch"
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
        >{{ snackbar.message }}</v-snackbar
      >
    </form>
  </template>
  
  <script>
  import axios from "axios";
  import { reactive } from "vue";
  import { useVuelidate } from "@vuelidate/core";
  import { required } from "@vuelidate/validators";
  
  export default {
    name: "HouseUp",
    data() {
      return {
        data: [],
        selectedCategory: "",
        imageUrl1: "", // Exterior Image URL after upload
        imageUrls2: [], // Array of Interior Image URLs after upload
        pdfFile: "",
        videoFile: "",
        snackbar: { show: false, message: "", color: "", timeout: 3000 },
        state: reactive({
          name: "",
          buyPrice: "",
          salePrice: "",
          discount: "",
          description: "",
          width: "",
          length: "",
          bedroom: "",
          receptionRoom: "",
          toiletRoom: "",
          kitchenRoom: "",
          parkingPlace: "",
        }),
        v$: useVuelidate(),
      };
    },
    validations() {
      return {
        state: {
          name: { required },
          buyPrice: { required },
          salePrice: { required },
          discount: { required },
          width: { required },
          length: { required },
          bedroom: { required },
          receptionRoom: { required },
          toiletRoom: { required },
          kitchenRoom: { required },
          parkingPlace: { required },
        },
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      // async handleFileUpload(event, fileType) {
      //   const file = event.target.files[0];
      //   if (!file) return; // If no file is selected, return early
  
      //   const formData = new FormData();
      //   formData.append("file", file);
  
      //   try {
      //     let response;
      //     if (fileType === "exterior") {
      //       // Upload exterior image
      //       response = await axios.post(
      //         "http://localhost:3000/api/upload/exterior-view",
      //         formData,
      //         { headers: { "Content-Type": "multipart/form-data" } }
      //       );
      //       this.imageUrl1 = response.data.data.url; // Set uploaded exterior image URL
      //     } else if (fileType === "pdf") {
      //       // Upload PDF file
      //       response = await axios.post(
      //         "http://localhost:3000/api/upload/pdf",
      //         formData,
      //         { headers: { "Content-Type": "multipart/form-data" } }
      //       );
      //       this.pdfFile = response.data.url; // Set uploaded PDF file URL
      //     } else if (fileType === "video") {
      //       // Upload video file
      //       response = await axios.post(
      //         "http://localhost:3000/api/upload/video",
      //         formData,
      //         { headers: { "Content-Type": "multipart/form-data" } }
      //       );
      //       this.videoFile = response.data.url; // Set uploaded video file URL
      //     }
      //   } catch (error) {
      //     console.error("Error uploading file:", error);
      //     this.snackbar.show = true;
      //     this.snackbar.message = "Error uploading file. Please try again!";
      //     this.snackbar.color = "error";
      //   }
      // },
  
      async handleMultipleFileUpload(event) {
        const files = Array.from(event.target.files);
        if (!files.length) return;
  
        this.imageUrls2 = [];
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
  
          try {
            const response = await axios.post(
              "http://localhost:3000/api/upload/interior-view",
              formData,
              { headers: { "Content-Type": "multipart/form-data" } }
            );
            this.imageUrls2.push(response.data.data.url); // Add each uploaded interior image URL
          } catch (error) {
            console.error("Error uploading interior image:", error);
            this.snackbar.show = true;
            this.snackbar.message =
              "Error uploading interior image. Please try again!";
            this.snackbar.color = "error";
          }
        }
      },
  
      clear() {
        this.state.name = "";
        this.state.buyPrice = "";
        this.state.salePrice = "";
        this.state.discount = "";
        this.state.description = "";
        this.state.width = "";
        this.state.length = "";
        this.state.bedroom = "";
        this.state.receptionRoom = "";
        this.state.toiletRoom = "";
        this.state.kitchenRoom = "";
        this.state.parkingPlace = "";
        this.selectedCategory = "";
        this.imageUrl1 = "";
        this.imageUrls2 = [];
        this.pdfFile = "";
        this.videoFile = "";
      },
  
      async submitForm() {
        this.v$.$touch(); // Touch all fields to show validation errors
  
        if (this.v$.$invalid) {
          this.snackbar.show = true;
          this.snackbar.message = "Please fix the validation errors!";
          this.snackbar.color = "error";
          return;
        }
  
        // const payload = {
        //   ...this.state,
        //   exteriorImage: this.imageUrl1,
        //   interiorImages: this.imageUrls2,
        //   pdfFile: this.pdfFile,
        //   videoFile: this.videoFile,
        //   categoryId: this.selectedCategory,
        // };
        const state = reactive({ ...initialState });
  
        const payload = {
          category_id: this.selectedCategory, // The selected category ID
          name: this.state.name, // House name
          files: this.pdfFile ? this.pdfFile.name : null, // PDF file name if it exists
          bedroom: this.state.bedroom, // Number of bedrooms
          reception_room: this.state.receptionRoom, // Number of reception rooms
          toilet_room: this.state.toiletRoom, // Number of toilets
          kitchen_room: this.state.kitchenRoom, // Number of kitchens
          parking_place: this.state.parkingPlace, // Number of parking places
          width: this.state.width, // Width of the house
          length: this.state.length, // Length of the house
          video: this.videoFile ? this.videoFile.name : "req.body.video", // Video file name or placeholder
          buy_price: this.state.buyPrice, // Buying price
          sale_price: this.state.salePrice, // Selling price
          discount: this.state.discount, // Discount value
          description: this.state.description || "req.body.description", // Description or placeholder
          subDescription: this.state.subDescription || "req.body.subDescription", // Sub-description or placeholder
          exteriorViews: this.exteriorViewFile
            ? this.exteriorViewFile.name
            : "fileName1", // Exterior view file name or placeholder
          interiorViews: this.interiorViewFile
            ? this.interiorViewFile.name
            : "fileName2", // Interior view file name or placeholder
          rooftopViews: this.rooftopViewFile
            ? this.rooftopViewFile.name
            : "fileName3", // Rooftop view file name or placeholder
        };
  
        try {
          // Send a POST request to the API
          const response = await axios.post(
            "http://localhost:3000/api/house",
            payload,
            {
              headers: {
                "Content-Type": "application/json", // Set the content type to JSON
              },
            }
          );
  
          this.snackbar.show = true;
          this.snackbar.message = "House data submitted successfully!";
          this.snackbar.color = "success";
          this.clear(); // Clear form after successful submission
        } catch (error) {
          console.error("Error submitting form:", error);
          this.snackbar.show = true;
          this.snackbar.message =
            "Error submitting house data. Please try again!";
          this.snackbar.color = "error";
        }
      },
  
      async fetchData() {
        try {
          const response = await axios.get("http://localhost:3000/api/category");
          this.data = response.data.data;
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      },
    },
    setup() {
      const initialState = {
        name: "",
        buyPrice: "",
        salePrice: "",
        video: "",
        discount: "",
        width: "",
        length: "",
        bedroom: null,
        receptionRoom: null,
        toiletRoom: null,
        kitchenRoom: null,
        parkingPlace: null,
        checkbox: null,
        description: "",
        subDescription: "",
      };
  
      const state = reactive({ ...initialState });
  
      const items1 = ["0", "1", "2", "3", "4"];
      const items2 = ["0", "1", "2", "3", "4"];
      const items3 = ["0", "1", "2", "3", "4"];
      const items4 = ["0", "1", "2", "3", "4"];
      const items5 = ["0", "1", "2", "3", "4"];
  
      const rules = {
        name: { required },
        buyPrice: { required },
        salePrice: { required },
        video: { required },
        discount: { required },
        width: { required },
        length: { required },
        bedroom: { required },
        receptionRoom: { required },
        toiletRoom: { required },
        kitchenRoom: { required },
        parkingPlace: { required },
        checkbox: { required },
      };
  
      const v$ = useVuelidate(rules, state);
  
      return {
        state,
        items1,
        items2,
        items3,
        items4,
        items5,
        v$,
      };
    },
  };
  </script>
  
  <style scoped>
  .bordered-select {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
    width: 100%;
  }
  .inputs-width {
    width: 100%;
  }
  .up-images {
    max-width: 100px;
    height: auto;
  }
  </style>
  