<template>
  <div>
    <h4 class="text-gray">* ຂໍ້ມູນພະນັກງານ > ເພີ່ມພະນັກງງານໃໝ່</h4>

    <v-row justify="center">
      <v-col class="cards-width">
        <v-card ref="form">
          <v-card-text>
            <v-text-field
              ref="firstName"
              v-model="firstName"
              :error-messages="errorMessages"
              :rules="[() => !!firstName || 'This field is required']"
              label="First Name"
              placeholder="John Doe"
              required
            ></v-text-field>
            <v-text-field
              ref="lastName"
              v-model="lastName"
              :error-messages="errorMessages"
              :rules="[() => !!lastName || 'This field is required']"
              label="Last Name"
              placeholder="John"
              required
            ></v-text-field>
            <v-text-field
              ref="email"
              v-model="email"
              :rules="[() => !!email || 'This field is required', addressCheck]"
              label="Email"
              placeholder="Example@gmail.com"
              required
            ></v-text-field>
            <v-text-field
              ref="phone"
              v-model="phone"
              :rules="[() => !!phone || 'This field is required']"
              label="Phone"
              placeholder="20..."
              required
            ></v-text-field>
            <v-text-field
              ref="password"
              v-model="password"
              :rules="[() => !!password || 'This field is required']"
              label="Password"
              placeholder="******"
              required
            ></v-text-field>
            <v-text-field
              ref="datebth"
              v-model="datebth"
              :rules="[() => !!datebth || 'This field is required']"
              label="Birth Date"
              placeholder="dd/mm/yy"
              required
            ></v-text-field>
            <v-text-field
              ref="address"
              v-model="address"
              :rules="[
                () => !!address || 'This field is required',
                () =>
                  (!!address && address.length <= 25) ||
                  'Address must be less than 25 characters',
                addressCheck,
              ]"
              counter="25"
              label="Address"
              placeholder="Home stay"
              required
            ></v-text-field>
            <v-autocomplete
              ref="position"
              v-model="position"
              :items="positions"
              :rules="[() => !!position || 'This field is required']"
              label="Position"
              placeholder="Position..."
              required
            ></v-autocomplete>
          </v-card-text>
          <v-card-actions class="form-btn" >
            <v-btn variant="text" @click="resetForm" class="clear"> ຍົກເລີກ </v-btn>

            <v-btn class="submits" variant="text" @click="submit">
              <v-icon>mdi-database-plus</v-icon>
              
              ເພີ່ມ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="3000" top color="success">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      positions: ["Designer", "Graphic Designer", "Developer", "Saler"],
      errorMessages: "",
      firstName: null,
      lastName: null,
      address: null,
      email: null,
      phone: null,
      password: null,
      datebth: null,
      position: null,
      employees: [], // Array to store fetched employees
      formHasErrors: false,
      snackbar: false, // Snackbar visibility
      snackbarMessage: "", // Snackbar message
    };
  },

  computed: {
    form() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        email: this.email,
        phone: this.phone,
        password: this.password,
        datebth: this.datebth,
        position: this.position,
      };
    },
  },

  created() {
    this.fetchData(); // Fetch data when the component is created
  },

  methods: {
    resetForm() {
      this.errorMessages = "";
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f] && this.$refs[f].reset();
      });

      this.firstName = null;
      this.lastName = null;
      this.address = null;
      this.email = null;
      this.phone = null;
      this.password = null;
      this.datebth = null;
      this.position = null;
    },
    async submit() {
  this.formHasErrors = false;

  Object.keys(this.form).forEach((f) => {
    if (!this.form[f]) this.formHasErrors = true;
    this.$refs[f] && this.$refs[f].validate(true);
  });

  if (this.formHasErrors) {
    console.log("Form has errors:", this.form);
    return;
  }

  try {
    console.log("Submitting form:", this.form);
    const response = await axios.post("http://localhost:3000/api/employee", this.form);
    console.log("Response from server:", response);
    this.resetForm();
    this.snackbarMessage = "Employee added successfully!";
    this.snackbar = true;
    this.fetchData();
  } catch (error) {
    console.error("Error adding employee:", error.response ? error.response.data : error.message);
    this.snackbarMessage = "Failed to add employee. Please try again.";
    this.snackbar = true;
  }
},

    async fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/api/employee");
        this.employees = response.data; // Update the employees array with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<style scoped>
.cards-width {
  width: 100%;
  justify-content: center;
  border-radius: 10px;
}

.submits {
  width: 140px;
  background-color: orange;
  color: blue;
}
.clear {
  width: 140px;
  background-color: red;
  color: white;
}

.form-btn {
  display: flex;
  padding: 6px;
  justify-content: space-around;

}
</style>
