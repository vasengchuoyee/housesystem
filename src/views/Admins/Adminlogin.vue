<template>
  <v-container fluid class="backgrounds">
    <v-card class="login-container">
      <h2 class="text-center">Admin Login</h2>
      <form @submit.prevent="login">
        <label for="number">Phone:</label>
        <v-text-field
          density="compact"
          placeholder="20xxxxxxxx"
          prepend-inner-icon="mdi-phone-outline"
          variant="outlined"
          v-model="phone"
          required
        ></v-text-field>

        <label for="password">Password:</label>
        <v-text-field
          v-model="password"
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          hint="At least 4 characters"
          variant="outlined"
          @click:append-inner="show1 = !show1"
        ></v-text-field>

        <v-btn
          type="submit"
          class="rounded-lg"
          color="orange"
          :loading="loading"
          block
        >
          Login
        </v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      phone: "",
      password: "",
      show1: false,
      loading: false, // New loading state
    };
  },

  methods: {
    async login() {
      this.loading = true; // Start loading

      const payload = {
        phone: this.phone,
        password: this.password,
      };

      try {
        console.log("Sending login request with payload:", payload);
        const res = await axios.post(
          "http://localhost:3000/api/employee/login",
          payload
        );
        console.log("Login successful", res.data);

        const token = res.data.data.token;
        if (token) {
          localStorage.setItem('token', token); // Store token in localStorage
          console.log("Token set in localStorage:", token);
          this.$router.push({ name: "admins" });
        } else {
          alert("Login failed: Invalid phone or password.");
        }
      } catch (error) {
        console.log("Error during login request:", error);
        if (error.response && error.response.status === 401) {
          alert("Invalid phone or password.");
        } else {
          alert("An error occurred. Please try again.");
        }
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    const token = Cookies.get("token");
    if (token) {
      this.$router.push({ name: "admins" });
    }
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  box-shadow: 0px 0px 4px 0px;
  border-radius: 5px;
  margin-top: 50px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 10px;
}

button {
  padding: 10px;
  background-color: orange;
  color: #fff;
  border: none;
  cursor: pointer;
}

.backgrounds {
  margin-top: 20px;
  background-image: url("admins.png");
}
</style>
