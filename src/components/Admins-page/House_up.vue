<template>
  <form class="ml-10 bg-white">
    <h2 class="text-center text-green">
      This is the admin page for uploading the product
    </h2>
    <!-- <div>
      <Themenu />
    </div> -->
    <hr />
    <br />

    <v-row>
      <v-col cols="6">
        <!-- <v-select
          class="btn_select"
          v-model="state.select"
          :error-messages="v$.select.$errors.map((e) => e.$message)"
          :items="items"
          item-text="name"
          label="ປະເພດແບບເຮືອນ"
          required
          @blur="v$.select.$touch"
          @change="v$.select.$touch"
        ></v-select> -->

        <select v-if="categorys.length">
          <option>please select</option>
          <option
            v-for="(cate, index) in categorys"
            :key="index"
            :value="cate.name"
          >
            {{ cate.name }}
          </option>
        </select>
        <p v-else>Loading...</p>
        <p v-if="selected">you select: {{ selected }}</p>
        <br />

        <div v-if="imageUrl">
          <img :src="imageUrl" alt="Uploaded Image" class="up-images" />
        </div>
        <v-file-input
          label="House_Image"
          prepend-icon="mdi-camera"
          variant="filled"
          append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
          @change="handleFileUpload"
          class="inputs-width"
        ></v-file-input>

        <div v-if="imageUrl">
          <img :src="imageUrl" alt="Uploaded Image" class="up-images" />
        </div>
        <v-file-input
          label="Image_show(9)"
          prepend-icon="mdi-camera"
          variant="filled"
          append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
          @change="handleFileUpload"
          class="inputs-width"
        ></v-file-input>

        <v-file-input
          label="PDF_House"
          prepend-icon="mdi-link-variant"
          variant="filled"
          append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
          @change="handleFileUpload"
          class="inputs-width"
        ></v-file-input>

        <v-file-input
          label="Video_House"
          prepend-icon="mdi-link-variant"
          variant="filled"
          append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
          @change="handleFileUpload"
          class="inputs-width"
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
          v-model="state.price"
          :error-messages="v$.price.$errors.map((e) => e.$message)"
          append-inner-icon="mdi-checkbox-multiple-marked-circle-outline"
          label="House_Price"
          class="inputs-width"
          required
          @blur="v$.price.$touch"
          @input="v$.price.$touch"
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
            :counter="100"
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
          v-model="state.select01"
          :error-messages="v$.select01.$errors.map((e) => e.$message)"
          :items="items1"
          label="BedRoom"
          class="inputs-width"
          required
          @blur="v$.select01.$touch"
          @change="v$.select01.$touch"
        ></v-select>

        <v-select
          v-model="state.select02"
          :error-messages="v$.select02.$errors.map((e) => e.$message)"
          :items="items2"
          label="BathRoom"
          class="inputs-width"
          required
          @blur="v$.select02.$touch"
          @change="v$.select02.$touch"
        ></v-select>

        <v-select
          v-model="state.select03"
          :error-messages="v$.select03.$errors.map((e) => e.$message)"
          :items="items3"
          label="LivingRoom"
          class="inputs-width"
          required
          @blur="v$.select03.$touch"
          @change="v$.select03.$touch"
        ></v-select>

        <v-select
          v-model="state.select04"
          :error-messages="v$.select04.$errors.map((e) => e.$message)"
          :items="items4"
          label="KitchenRoom"
          class="inputs-width"
          required
          @blur="v$.select04.$touch"
          @change="v$.select04.$touch"
        ></v-select>

        <v-select
          v-model="state.select05"
          :error-messages="v$.select05.$errors.map((e) => e.$message)"
          :items="items5"
          label="ParkingRoom"
          class="inputs-width"
          required
          @blur="v$.select05.$touch"
          @change="v$.select05.$touch"
        ></v-select>

        <v-checkbox
          v-model="state.checkbox"
          :error-messages="v$.checkbox.$errors.map((e) => e.$message)"
          label="Do you make sure at all?"
          required
          @blur="v$.checkbox.$touch"
          @change="v$.checkbox.$touch"
        ></v-checkbox>

        <v-btn class="me-4 bg-green" @click="v$.$validate">Submit</v-btn>
        <v-btn class="bg-orange" @click="clear">Clear</v-btn>

        <v-btn class="bg-red" @click="fetchcategorys">data</v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "House_up",
  components: {},
  data() {
    return {
      categorys: [],
    };
  },

  created() {
    this.fetchcategorys();
  },

  methods: {
    fetchcategorys() {
      const url = "https://7984-115-84-86-150.ngrok-free.app/api/category";

      axios
        .get(url)
        .then((response) => {
          this.categorys = response.data;
          console.log(this.categorys);
        })
        .catch((error) => {
          console.error("Error fatching categoys:", error);
        });
    },
  },
};
</script>

<script setup>
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

// import Themenu from '../../components/Themenu.vue';

const initialState = {
  name: "",
  price: "",
  discount: "",
  width: "",
  length: "",

  select: null,
  select01: null,
  select02: null,
  select03: null,
  select04: null,
  select05: null,

  checkbox: null,
};

const state = reactive({ ...initialState });

const items = [
  {
    name: "ແບບຊັ້ນດຽວ",
  },
  {
    name: "ແບບຊັ້ນດຽວ",
  },
  {
    name: "ແບບຊັ້ນດຽວ",
  },
];
const items1 = ["0", "1", "2", "3", "4"];
const items2 = ["0", "1", "2", "3", "4"];
const items3 = ["0", "1", "2", "3", "4"];
const items4 = ["0", "1", "2", "3", "4"];
const items5 = ["0", "1", "2", "3", "4"];

const rules = {
  name: { required },
  price: { required },
  discount: { required },
  width: { required },
  length: { required },

  select: { required },
  select01: { required },
  select02: { required },
  select03: { required },
  select04: { required },
  select05: { required },

  checkbox: { required },
};

const v$ = useVuelidate(rules, state);

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

let imageUrl = ref("");
</script>

<style scoped>
.inputs-width {
  width: 500px;
  text-align: center;
}

.up-images {
  width: 100px;
  height: auto;
}

.btn_select {
  margin-left: 280px;
  width: 200px;
  color: rgb(230, 14, 14);
}
</style>
