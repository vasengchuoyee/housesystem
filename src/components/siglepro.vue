<template>
    <div>
        <v-hover v-slot="{ isHovering, props }">
            <v-card class="mx-auto" color="grey-lighten-4" max-width="400" v-bind="props">
                <v-img :aspect-ratio="16 / 9" cover src="0001.jpg">
                    <v-expand-transition>
                        <div v-if="isHovering"
                            class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h2"
                            style="height: 40%;">
                            $14.99
                            <br>
                            <v-btn class="bg-green"
                                href="https://api.whatsapp.com/send?phone=2028742080&text= [ສະບາຍດີ.!! ພວກເຮົາມີຄຳປຶກສາກ່ຽວກັບເຮືອນ ຢາກໃຫ້ທ່ານຊ່ວຍປຶກສາ] ">contact
                                us</v-btn>
                        </div>
                    </v-expand-transition>
                </v-img>

                <v-card-text class="pt-6">
                    <h8 class="text-red">THE BEST SELLER</h8><br>

                    <h10> examples name </h10>
                    <router-link to="/prod001">
                        <v-btn class="bg-orange">see more info</v-btn>
                    </router-link>

                    <v-containers class="style">
                        <p class="text-grey">(ເນື້ອທີ່ ຂະໜາດ 40x30) ຫ້ອງນອນ 4, ຫ້ອງນໍ້າ 4, ຫ້ອງຮັບແຂກ 1, ຫ້ອງຄົວ 2 ຫ້ອງ,
                            ສະຖານທີ່ຈອດລົດ 6 ຄັນ.</p>

                        <b class="text-">Price:$14.99 </b><br>
                        <span class="text-blue text-subtitle-2">30 Reviews <v-btn variant="text"
                                :class="fav ? 'text-primary' : ''" icon="mdi-heart" @click="fav = !fav"></v-btn></span>
                        <v-col cols="2" sm="1">
                            <v-rating :model-value="4" dense color="orange" background-color="orange" hover></v-rating>
                        </v-col>
                    </v-containers>
                </v-card-text>
            </v-card>
        </v-hover>
    </div>
</template>

<script>
export default {
    name: 'admins',
    components: {

    },

    data() {
        return {
            fav: true,

        }
    }
}
</script>
<style>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;
}

.bg-green {
    margin-left: 20px;
}
</style>

<!-- <template>
  <div>
    <h4 class="text-gray">* ຂໍ້ມູນແບບເຮືອນ > ໜ້າເພີ່ມລາຍການເຮືອນທັງໝົດ</h4>
    <form
      ref="form"
      class="ml-10 bg-white p-10 mt-4"
      @submit.prevent="submitForm"
    >
      <v-row>
        <v-col cols="6">
         
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

          
          <br /><br />

          <div v-if="imageUrl1">
            <img
              :src="imageUrl1"
              alt="Uploaded Exterior Image"
              class="up-images"
            />
          </div>
          <v-file-input
            v-model="exteriorViewFile"
            label="House_Image"
            prepend-icon="mdi-camera"
            class="inputs-width"
          ></v-file-input>

          <div v-if="imageUrl2">
            <img
              :src="imageUrl2"
              alt="Uploaded Interior Image"
              class="up-images"
            />
          </div>
          <v-file-input
            v-model="interiorViewFiles"
            label="House_Image1"
            prepend-icon="mdi-camera"
            class="inputs-width"
            multiple
          ></v-file-input>

          <v-file-input
            v-model="pdfFile"
            label="Files PDF"
            prepend-icon="mdi-camera"
            class="inputs-width"
          ></v-file-input>

          
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
    const imageUrl1 = ref("");
    const imageUrl2 = ref([]);
    const data = ref([]); // Category data from API

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
        const response = await axios.get("http://localhost:3000/api/category");
        data.value = response.data.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
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
    };

    // Submit form data
    const submitForm = async () => {
      // Ensure v$ is reactive
      const validation = v$.value;

      // Validate the form
      validation.$touch();
      if (validation.$invalid) {
        snackbar.show = true;
        snackbar.message = "Please fill in all required fields";
        snackbar.color = "error";
        return;
      }

      // Prepare the form data
      const formData = {
        category_id: selectedCategory.value,
        name: state.name,
        files: state.files,
        bedroom: state.bedroom,
        reception_room: state.reception_room,
        toilet_room: state.toilet_room,
        kitchen_room: state.kitchen_room,
        parking_place: state.parking_place,
        width: state.width,
        length: state.length,
        video: videoFile.value,
        buy_price: state.buy_price,
        sale_price: state.sale_price,
        discount: state.discount || 0,
        rating: 0, // Default rating
        description: state.description,
        exteriorViews: "",
        interiorViews: "", 
        rooftopViews: "", 
      };

      console.log("Form Data:", formData);

      try {
        // Send the data to the API
        const response = await axios.post(
          "http://localhost:3000/api/house",
          formData
        );
        console.log("Response:", response.data);

        // Clear the form after successful submission
        clear();  
        snackbar.show = true;
        snackbar.message = "Data submitted successfully";
        snackbar.color = "success";
      } catch (error) {
        console.error("Error submitting form:", error);
        snackbar.show = true;
        snackbar.message = "Error submitting data. Please try again!";
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
      imageUrl1,
      imageUrl2,
      data,
      items1,
      items2,
      items3,
      items4,
      items5,
      clear,
      submitForm,
      v$, // Ensure v$ is returned
    };
  },
};

</script> -->