<!-- <template>
    <div class="cart">
      <h2>Shopping Cart</h2>
      <ul>
        <li v-for="(item, index) in cart" :key="index">
          {{ item.name }} - {{ item.quantity }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cart: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .cart {
    border: 1px solid #ddd;
    padding: 20px;
    margin: 20px;
  }
  </style> -->
  <template>
    <form ref="form" class="ml-10 bg-white" @submit.prevent="submitForm">
      <h2 class="mt-4 text-center text-primary">ໜ້າເພີ່ມລາຍການເຮືອນທັງໝົດ</h2>
      <hr />
      <br />
  
      <v-row>
        <v-col cols="6">
          <label for="category-select">ປະເພດ:</label>
          <select
            v-if="data.length"
            v-model="selectedCategory"
            id="category-select"
            class="bordered-select"
            placeholder="select"
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
              variant="filled"
              append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
              @change="(event) => handleFileUpload(event, 'exterior')"
              class="inputs-width"
            ></v-file-input>
  
            <div v-if="imageUrls2.length">
              <div v-for="(url, index) in imageUrls2" :key="index">
                <img :src="url" alt="Uploaded Interior Image" class="up-images" />
              </div>
            </div>
            <v-file-input
              label="Image_show(9)"
              prepend-icon="mdi-camera"
              variant="filled"
              append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
              @change="handleMultipleFileUpload"
              multiple
              class="inputs-width"
            ></v-file-input>
          </div>
  
          <v-file-input
            label="PDF_House"
            prepend-icon="mdi-link-variant"
            variant="filled"
            append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
            @change="(event) => handleFileUpload(event, 'pdf')"
            class="inputs-width"
          ></v-file-input>
  
          <v-file-input
            v-model="state.video"
            label="Video_House"
            prepend-icon="mdi-link-variant"
            variant="filled"
            append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
            @change="(event) => handleFileUpload(event, 'video')"
            class="inputs-width"
            required
            @blur="v$.video.$touch"
            @input="v$.video.$touch"
          ></v-file-input>
  
          <v-text-field
            v-model="state.name"
            :counter="10"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
            append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
            label="House_Name"
            variant="solo"
            class="inputs-width"
            required
            @blur="v$.name.$touch"
            @input="v$.name.$touch"
          ></v-text-field>
  
          <v-text-field
            v-model="state.buyPrice"
            :error-messages="v$.buyPrice.$errors.map((e) => e.$message)"
            append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
            label="Buy_Price"
            class="inputs-width"
            required
            @blur="v$.buyPrice.$touch"
            @input="v$.buyPrice.$touch"
          ></v-text-field>
  
          <v-text-field
            v-model="state.salePrice"
            :error-messages="v$.salePrice.$errors.map((e) => e.$message)"
            append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
            label="Sale_Price"
            class="inputs-width"
            required
            @blur="v$.salePrice.$touch"
            @input="v$.salePrice.$touch"
          ></v-text-field>
  
          <v-text-field
            v-model="state.discount"
            :error-messages="v$.discount.$errors.map((e) => e.$message)"
            append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
            label="Discount(%)"
            class="inputs-width"
            required
            @blur="v$.discount.$touch"
            @input="v$.discount.$touch"
          ></v-text-field>
  
          <v-container fluid>
            <v-textarea
              v-model="state.description"
              :counter="200"
              label="Descriptions"
              append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
              class="inputs-width"
            ></v-textarea>
          </v-container>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="state.width"
            :error-messages="v$.width.$errors.map((e) => e.$message)"
            append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
            label="Width"
            class="inputs-width"
            required
            @blur="v$.width.$touch"
            @input="v$.width.$touch"
          ></v-text-field>
  
          <v-text-field
            v-model="state.length"
            :error-messages="v$.length.$errors.map((e) => e.$message)"
            append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
            label="Length"
            class="inputs-width"
            required
            @blur="v$.length.$touch"
            @input="v$.length.$touch"
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
            :error-messages="v$.checkbox.$errors.map((e) => e.$message)"
            label="Do you make sure at all?"
            required
            @blur="v$.checkbox.$touch"
            @change="v$.checkbox.$touch"
          ></v-checkbox>
  
          <v-btn class="bg-orange" @click="clear">Clear</v-btn>
  
          <v-btn class="ml-16" color="primary" type="submit">
            <v-icon>mdi-database-plus</v-icon>
            Submit</v-btn
          >
        </v-col>
      </v-row>
  
      <v-snackbar
        v-model="snackbar.show"
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        top
      >
        {{ snackbar.message }}
      </v-snackbar>
    </form>
  </template>
  
  <script>
  import axios from "axios";
  import { reactive, ref } from "vue";
  import { useVuelidate } from "@vuelidate/core";
  import { required } from "@vuelidate/validators";
  
  export default {
    name: "HouseUp",
    data() {
      return {
        data: [], // Store the fetched data
        selectedCategory: null, // To store the selected category ID
        imageUrl1: "", // To store the first image URL
        imageUrls2: [], // To store multiple image URLs
        pdfFile: null, // To store the PDF file
        videoFile: null, // To store the video file
  
        snackbar: {
          show: false,
          message: "",
          color: "",
          timeout: 3000,
        },
      };
    },
    created() {
      this.fetchData(); // Fetch data when component is created
    },
    methods: {
  
      async handleMultipleFileUpload(event) {
        const files = event.target.files;
        const urls = [];
  
        for (let i = 0; i < files.length; i++) {
          const formData = new FormData();
          formData.append("file", files[i]);
  
          try {
            const response = await axios.post(
              "http://localhost:3000/api/upload/interior-view",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            urls.push(response.data.fileUrl); // Assuming the API returns a fileUrl for each upload
          } catch (error) {
            console.error("Error uploading the file:", error);
          }
        }
  
        this.imageUrls2 = urls;
      },
  
      fetchData() {
        const url = "http://localhost:3000/api/category";
        console.log("Fetching categories");
  
        axios
          .get(url)
          .then((response) => {
            this.data = response.data.data; // Store the fetched data
            console.log(this.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error); // Error handling
          });
      },
      handleFileUpload(event, fileType) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (fileType === "image") {
              this.imageUrl1 = e.target.result;
            } else if (fileType === "pdf") {
              this.pdfFile = file;
            } else if (fileType === "video") {
              this.videoFile = file;
            }
          };
          reader.readAsDataURL(file);
        }
      },
      handleMultipleFileUpload(event) {
        const files = Array.from(event.target.files);
        this.imageUrls2 = []; // Clear previous images
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageUrls2.push(e.target.result);
          };
          reader.readAsDataURL(file);
        });
      },
  
      clear() {
        this.$refs.form.reset();
        this.state = { ...initialState }; // Reset state
        this.selectedCategory = null;
        this.imageUrl1 = "";
        this.imageUrls2 = [];
        this.pdfFile = null;
        this.videoFile = null;
      },
      async submitForm() {
        this.v$.$touch();
        if (this.v$.$invalid) {
          return;
        }
  
        try {
          const payload = {
            category_id: this.selectedCategory, // Same as before
            name: this.state.name, // Same as before
            files: this.pdfFile ? this.pdfFile.name : null, // Same as before
            bedroom: this.state.bedroom, // Same as before
            reception_room: this.state.receptionRoom, // Same as before
            toilet_room: this.state.toiletRoom, // Same as before
            kitchen_room: this.state.kitchenRoom, // Same as before
            parking_place: this.state.parkingPlace, // Same as before
            width: this.state.width, // Same as before
            length: this.state.length, // Same as before
            video: this.videoFile ? this.videoFile.name : "req.body.video", // Use the actual video file name or placeholder
            buy_price: this.state.buyPrice, // Same as before
            sale_price: this.state.salePrice, // Same as before
            discount: this.state.discount, // Same as before
            description: this.state.description || "req.body.description", // Use the description or placeholder
            subDescription:
              this.state.subDescription || "req.body.subDescription", // Same as above
            exteriorViews: this.exteriorViewFile
              ? this.exteriorViewFile.name
              : "fileName1", // New field for exterior views
            interiorViews: this.interiorViewFile
              ? this.interiorViewFile.name
              : "fileName2", // New field for interior views
            rooftopViews: this.rooftopViewFile
              ? this.rooftopViewFile.name
              : "fileName3", // New field for rooftop views
          };
  
          const response = await axios.post(
            "http://localhost:3000/api/house",
            payload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          // Clear form and files after successful submission
          this.clear();
          this.showSnackbar("Data submitted successfully!", "success");
        } catch (error) {
          console.error("An error occurred while submitting the form:", error);
        }
      },
  
      showSnackbar(message, color) {
        this.snackbar.message = message;
        this.snackbar.color = color;
        this.snackbar.show = true;
      },
  
      clear() {
        this.state.name = "";
        this.state.buyPrice = "";
        this.state.salePrice = "";
        this.state.discount = "";
        this.state.width = "";
        this.state.length = "";
        this.state.bedroom = null;
        this.state.receptionRoom = null;
        this.state.toiletRoom = null;
        this.state.kitchenRoom = null;
        this.state.parkingPlace = null;
        this.state.checkbox = null;
        this.state.description = "";
        this.state.subDescription = "";
        this.selectedCategory = null; // Clear the selected category as well
        this.video.state.video = "";
  
        this.imageUrl1 = "";
        this.imageUrls2 = [];
        this.pdfFile = null;
        this.videoFile = null;
  
        // Example: Resetting file inputs if you're using refs
        this.$refs.exteriorFileInput.value = "";
        this.$refs.interiorFileInput.value = "";
        this.$refs.pdfFileInput.value = "";
        this.$refs.videoFileInput.value = "";
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
  