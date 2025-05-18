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
            required
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
          <!-- PDF File Upload -->
          <div class="preview-container">
            <a v-if="pdfUrl" :href="pdfUrl" target="_blank" class="pdf-preview">
              <v-icon size="large" color="red">mdi-file-pdf-box</v-icon>
              <span class="pdf-name">{{ pdfFileName }}</span>
            </a>
            <v-file-input
              v-model="pdfFile"
              label="House PDF Document"
              prepend-icon="mdi-file-pdf"
              class="inputs-width"
              @update:modelValue="handlePdfFile"
              accept=".pdf"
              :show-size="true"
              required
            ></v-file-input>
          </div>

          <!-- Exterior View -->
          <div class="preview-container">
            <img
              v-if="exteriorImageUrl"
              :src="exteriorImageUrl"
              alt="Exterior View"
              class="preview-image"
            />
            <v-file-input
              v-model="exteriorViewFile"
              label="Exterior View"
              prepend-icon="mdi-camera"
              class="inputs-width"
              @update:modelValue="handleExteriorView"
              accept="image/*"
            ></v-file-input>
          </div>

          <!-- Interior View -->
          <div class="preview-container">
            <div v-if="interiorImageUrls.length" class="preview-grid">
              <img
                v-for="(url, index) in interiorImageUrls"
                :key="index"
                :src="url"
                alt="Interior View"
                class="preview-image-small"
              />
            </div>
            <v-file-input
              v-model="interiorViewFiles"
              label="Interior Views"
              prepend-icon="mdi-camera"
              class="inputs-width"
              @update:modelValue="handleInteriorViews"
              multiple
              accept="image/*"
            ></v-file-input>
          </div>

          <!-- Rooftop View -->
          <div class="preview-container">
            <img
              v-if="rooftopImageUrl"
              :src="rooftopImageUrl"
              alt="Rooftop View"
              class="preview-image"
            />
            <v-file-input
              v-model="rooftopViewFile"
              label="Rooftop View"
              prepend-icon="mdi-camera"
              class="inputs-width"
              @update:modelValue="handleRooftopView"
              accept="image/*"
            ></v-file-input>
          </div>

          <v-file-input
            v-model="videoFile"
            label="Video File"
            prepend-icon="mdi-video"
            @update:modelValue="handleVideoFile"
            class="inputs-width"
            accept=".mp4, .avi, .mov"
          ></v-file-input>

          <!-- Other Fields -->
          <v-text-field
            v-model="state.name"
            label="House Name"
            :counter="10"
            required
          ></v-text-field>
          <v-text-field
            v-model.number="state.buy_price"
            label="Buy Price"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            v-model.number="state.sale_price"
            label="Sale Price"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            v-model.number="state.discount"
            label="Discount (%)"
            type="number"
            required
          ></v-text-field>
          <v-container fluid>
            <v-textarea
              v-model="state.description"
              label="Description"
              :counter="200"
            ></v-textarea>
          </v-container>
        </v-col>

        <!-- More Inputs on the Right Side -->
        <v-col cols="6">
          <v-text-field
            v-model.number="state.width"
            append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
            label="Width"
            type="number"
            class="inputs-width"
            required
          ></v-text-field>
          <v-text-field
            v-model.number="state.length"
            append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
            label="Length"
            type="number"
            class="inputs-width"
            required
          ></v-text-field>
          <v-select
            v-model="state.bedroom"
            :items="items1"
            label="Bedroom"
            class="inputs-width"
            required
          ></v-select>
          <v-select
            v-model="state.reception_room"
            :items="items2"
            label="Reception Room"
            class="inputs-width"
            required
          ></v-select>
          <v-select
            v-model="state.toilet_room"
            :items="items3"
            label="Toilet Room"
            class="inputs-width"
            required
          ></v-select>
          <v-select
            v-model="state.kitchen_room"
            :items="items4"
            label="Kitchen Room"
            class="inputs-width"
            required
          ></v-select>
          <v-select
            v-model="state.parking_place"
            :items="items5"
            label="Parking Place"
            class="inputs-width"
            required
          ></v-select>
          <v-checkbox
            v-model="state.checkbox"
            label="Do you confirm all details?"
            required
          ></v-checkbox>

          <v-btn class="bg-orange" @click="clear">Clear</v-btn>
          <v-btn
            class="ml-16"
            :color="state.checkbox ? 'primary' : 'grey'"
            type="submit"
            :disabled="!state.checkbox"
          >
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
      buy_price: null,
      sale_price: null,
      discount: null,
      description: "",
      width: null,
      length: null,
      bedroom: null,
      reception_room: null,
      toilet_room: null,
      kitchen_room: null,
      parking_place: null,
      checkbox: false,
      subDescription: "",
      rating: 0,
      video: null
    });

    const snackbar = reactive({
      show: false,
      message: "",
      color: "success",
      timeout: 3000,
    });

    // Only keep necessary refs
    const selectedCategory = ref("");
    const exteriorViewFile = ref(null);
    const interiorViewFiles = ref([]);
    const videoFile = ref(null);
    const rooftopViewFile = ref(null);
    const pdfFile = ref(null);
    const exteriorImageUrl = ref("");
    const interiorImageUrls = ref([]);
    const rooftopImageUrl = ref("");
    const data = ref([]); // Category data from API

        // Add this code inside setup() before the return statement
    
    const items1 = ref([1, 2, 3, 4]); // Bedroom options
    const items2 = ref([1, 2, 3, 4]); // Reception room options
    const items3 = ref([1, 2, 3, 4]); // Toilet room options
    const items4 = ref([1, 2, 3, 4]); // Kitchen room options
    const items5 = ref([1, 2, 3, 4]); // Parking place options

    const uploadedFiles = reactive({
      exterior: null,
      interior: [],
      rooftop: null,
      video: null,
      pdf: null
    });

        // Replace the existing rules object with this:
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
      checkbox: { required }
    };

    // Initialize Vuelidate
    const v$ = useVuelidate(rules, state);

    // Fetch category data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BEST_URL}/api/category`);
        data.value = response.data.data || [];
      } catch (error) {
        console.error("Error fetching categories:", error);
        snackbar.show = true;
        snackbar.message = "Failed to load categories";
        snackbar.color = "error";
      }
    };

    // Function to upload single file to Firebase
    const uploadToFirebase = async (file, endpoint) => {
      if (!file) return null;
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await axios.post(
          `${API_BEST_URL}/api/upload${endpoint}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        return response.data.url;
      } catch (error) {
        console.error(`Error uploading to ${endpoint}:`, error);
        throw error;
      }
    };

    // Function to handle all file uploads
    const uploadAllFiles = async () => {
      
      try {
        // Upload house file
        let houseFileUrl = null;
        console.log("state.housefile===============", state.housefile);
        console.log("uploadedFiles.pdf===============", uploadedFiles.pdf);
        if (state.housefile) {
          
          houseFileUrl = await uploadToFirebase(state.housefile, '/house-file');
        }

        // Upload exterior view
        let exteriorUrl = null;
        if (uploadedFiles.exterior) {
          exteriorUrl = await uploadToFirebase(uploadedFiles.exterior, '/exterior-view');
        }

        // Upload interior views
        let interiorUrls = [];
        if (uploadedFiles.interior?.length) {
          interiorUrls = await Promise.all(
            uploadedFiles.interior.map(file => 
              uploadToFirebase(file, '/interior-view')
            )
          );
        }

        // Upload rooftop view
        let rooftopUrl = null;
        if (uploadedFiles.rooftop) {
          rooftopUrl = await uploadToFirebase(uploadedFiles.rooftop, '/rooftop-view');
        }

        // Upload video
        let videoUrl = null;
        if (state.video) {
          videoUrl = await uploadToFirebase(state.video, '/house-video');
        }

        return {
          houseFileUrl,
          exteriorUrl,
          interiorUrls,
          rooftopUrl,
          videoUrl
        };
      } catch (error) {
        console.error('Error uploading files:', error);
        throw new Error('Failed to upload one or more files');
      }
    };

    console.log("uploadAllFiles==============", uploadAllFiles);

        // Replace the existing submitForm function with this:
    const submitForm = async () => {
      try {
        const isValid = await v$.value.$validate();
        if (!isValid) {
          snackbar.show = true;
          snackbar.message = "Please fill in all required fields";
          snackbar.color = "error";
          return;
        }
    
        if (!selectedCategory.value) {
          snackbar.show = true;
          snackbar.message = "Please select a category";
          snackbar.color = "error";
          return;
        }
    
        if (!pdfFile.value) {
          snackbar.show = true;
          snackbar.message = "Please upload a PDF document";
          snackbar.color = "error";
          return;
        }
    
        // Show loading state
        snackbar.show = true;
        snackbar.message = "Uploading files...";
        snackbar.color = "info";
    
        // First upload all files
        const urls = await uploadAllFiles();
    
        // Create payload with URLs
        const payload = {
          category_id: selectedCategory.value,
          name: state.name,
          files: urls.houseFileUrl,
          exterior_view: urls.exteriorUrl,
          interior_views: urls.interiorUrls,
          rooftop_view: urls.rooftopUrl,
          video: urls.videoUrl,
          bedroom: state.bedroom,
          reception_room: state.reception_room,
          toilet_room: state.toilet_room,
          kitchen_room: state.kitchen_room,
          parking_place: state.parking_place,
          width: state.width,
          length: state.length,
          buy_price: state.buy_price,
          sale_price: state.sale_price,
          discount: state.discount || 0,
          rating: state.rating || 0,
          description: state.description || "",
          subDescription: state.subDescription || ""
        };
    
        // Submit data to API
        const response = await axios.post(`${API_BEST_URL}/api/house`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
    
        if (response.data) {
          console.log("Form submitted successfully:", response.data);
          clear();
          snackbar.show = true;
          snackbar.message = "House data submitted successfully";
          snackbar.color = "success";
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        snackbar.show = true;
        snackbar.message = error.response?.data?.message || "Error uploading files. Please try again.";
        snackbar.color = "error";
      }
    };

    // Clear form fields
    const clear = () => {
      Object.assign(state, {
        name: "",
        buy_price: null,
        sale_price: null,
        discount: null,
        description: "",
        width: null,
        length: null,
        bedroom: null,
        reception_room: null,
        toilet_room: null,
        kitchen_room: null,
        parking_place: null,
        checkbox: false,
        subDescription: "",
        rating: 0,
        video: null,
        housefile: null,
      });
      selectedCategory.value = "";
      exteriorViewFile.value = null;
      interiorViewFiles.value = null;
      videoFile.value = null;
      rooftopViewFile.value = null;
      houseFile.value = null;
      pdfFile.value = null;
      exteriorImageUrl.value = "";
      interiorImageUrls.value = [];
      rooftopImageUrl.value = "";
      Object.assign(uploadedFiles, {
        exterior: null,
        interior: [],
        rooftop: null,
        video: null,
        pdf: null,
      });
      v$.value.$reset();
    };

    // Initialize data
    fetchData();

    // Keep only necessary file handlers
    const handleExteriorView = (file) => {
      if (file) {
        try {
          const fileObj = file instanceof File ? file : file[0];
          console.log("fileObj======================", fileObj);
          if (fileObj) {
            exteriorImageUrl.value = URL.createObjectURL(fileObj);
            uploadedFiles.exterior = fileObj;
          }
          
        } catch (error) {
          console.error("Error handling exterior view:", error);
          exteriorImageUrl.value = "";
          uploadedFiles.exterior = null;
        }
      } else {
        exteriorImageUrl.value = "";
        uploadedFiles.exterior = null;
      }
    };

    const handleInteriorViews = (files) => {
      if (files?.length) {
        try {
          uploadedFiles.interior = Array.from(files);
          interiorImageUrls.value = Array.from(files).map(file => 
            URL.createObjectURL(file)
          );
        } catch (error) {
          console.error("Error handling interior views:", error);
          interiorImageUrls.value = [];
          uploadedFiles.interior = [];
        }
      } else {
        interiorImageUrls.value = [];
        uploadedFiles.interior = [];
      }
    };

    const handleRooftopView = (file) => {
      if (file) {
        try {
          const fileObj = file instanceof File ? file : file[0];
          if (fileObj) {
            rooftopImageUrl.value = URL.createObjectURL(fileObj);
            uploadedFiles.rooftop = fileObj;
          }
        } catch (error) {
          console.error("Error handling rooftop view:", error);
          rooftopImageUrl.value = "";
          uploadedFiles.rooftop = null;
        }
      } else {
        rooftopImageUrl.value = "";
        uploadedFiles.rooftop = null;
      }
    };

    const handleVideoFile = (file) => {
      if (file) {
        try {
          uploadedFiles.video = file instanceof File ? file : file[0];
        } catch (error) {
          console.error("Error handling video:", error);
          uploadedFiles.video = null;
        }
      } else {
        uploadedFiles.video = null;
      }
    };

    return {
      state,
      snackbar,
      selectedCategory,
      exteriorViewFile,
      interiorViewFiles,
      videoFile,
      rooftopViewFile,
      pdfFile,
      exteriorImageUrl,
      interiorImageUrls,
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
      handleVideoFile,
      v$,
    };
  },
};
</script>

<style scoped>
.preview-container {
  margin-bottom: 20px;
}

.preview-image {
  max-width: 80%;
  max-height: 100px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.preview-image-small {
  width: 180px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.preview-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}

.inputs-width {
  max-width: 400px;
}

.bordered-select {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  max-width: 400px;
}

.v-btn {
  width: 150px;
  height: 40px;
}
</style>
