<template>
  <v-card class="container-fuild">
    <Appbar />
    <h2 class="text-center text-primary">User Registration</h2><br>
    <v-row justify="center">
      
      <v-col
        class="user-border"
        @submit.prevent="onSubmit"
        cols="12"
        lg="4"
        md="6"
        sm="8"
      >
        <v-card>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="first"
              :rules="[rules.required]"
              label="First name"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="last"
              label="Last name"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="[rules.email]"
              label="Email"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="phone"
              :rules="[rules.required, rules.min(8)]"
              label="Phone"
              placeholder="Enter your phone"
              variant="underlined"
              type="tel"
            ></v-text-field>

            <v-text-field
              v-model="address"
              label="Address"
              placeholder="Enter your address"
              variant="underlined"
              type="text"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="[rules.required, rules.min(8)]"
              label="Password"
              placeholder="Enter your password"
              variant="underlined"
              type="password"
            ></v-text-field>

            <v-checkbox
              v-model="terms"
              :rules="[rules.required]"
              color="secondary"
              label="Agree and make sure all your info"
            ></v-checkbox>
          </v-form>
        </v-card>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            @click="onSubmit"
          >
            Register
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Appbar from "../../components/Appbar.vue";
import axios from "axios";

export default {
  name: "register",
  components: {
    Appbar,
  },

  data: () => ({
    valid: false,
    first: null,
    last: null,
    email: null,
    phone: null,
    address: null,
    password: null,
    image: null,
    terms: false,
    loading: false,
    rules: {
      required: (v) => !!v || "Field is required",
      email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      min: (length) => (v) =>
        (v && v.length >= length) || `Minimum ${length} characters`,
    },
  }),

  methods: {
    async onSubmit() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;

      // Create the payload object
      const payload = {
        firstName: this.first,
        lastName: this.last || "",
        email: this.email || "",
        phone: this.phone,
        address: this.address || "",
        password: this.password,
        image: this.image ? "Image file name" : null, // Placeholder for image
        role: "USER", // Default role
        status: "active", // Default status
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/api/user",
          payload
        );

        if (response.status === 201) {
          // Successfully registered, navigate to login page
          this.$router.push("/logins");
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert("Failed to register. Please try again.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.v-text-field {
  margin-left: 8px;
}
</style>
