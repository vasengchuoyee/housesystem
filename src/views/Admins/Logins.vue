<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-12 pb-8" elevation="8" rounded="lg">
          <h3 class="text-center mt-6">Users Login</h3>
          <v-form ref="form">
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>
            <v-text-field
              density="compact"
              placeholder="Phone"
              prepend-inner-icon="mdi-phone-outline"
              variant="outlined"
              v-model="phone"
              :rules="phoneRules"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
              Password
              <a class="text-caption text-decoration-none text-blue" href="#">Forgot login password?</a>
            </div>

            <v-text-field
              density="compact"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              v-model="password"
              :rules="passwordRules"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              @click:append-inner="visible = !visible"
            ></v-text-field>

            <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="loginUser">
              Log In
            </v-btn>
          </v-form>

          <v-card-text class="text-center">
            <a class="text-blue text-decoration-none" href="#">
              Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Logins",
  data() {
    return {
      phone: "",
      password: "",
      visible: false,
      phoneRules: [
        (v) => !!v || "Phone is required",
        (v) => /^\d{10,}$/.test(v) || "Phone must be at least 10 digits",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be at least 6 characters",
      ],
    };
  },
  methods: {
    async loginUser() {
      const form = this.$refs.form;
      if (form && form.validate()) {
        const payload = {
          phone: this.phone,
          password: this.password,
        };

        try {
          const response = await axios.post("http://localhost:3000/api/user/login", payload);
          console.log("Response:", response.data);

          if (response.data.success) {
            this.$router.push("/payments0012");
          } else {
            alert("Login failed: " + response.data.message);
          }
        } catch (error) {
          console.error("Login failed:", error.response?.data?.message || error.message);
          alert("Login failed: " + (error.response?.data?.message || "Please try again later."));
        }
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
