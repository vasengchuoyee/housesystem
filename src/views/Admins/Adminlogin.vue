<!-- <template>
  <v-container fluid class="backgrounds">
    <v-card class="login-container">
      <h2 class="text-center">Admin Login</h2>

      <v-alert
        v-if="error"
        type="error"
        class="mb-4"
        closable
        @click:close="error = null"
      >
        {{ error }}
      </v-alert>

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
      loading: false,
      error: null
    };
  },

  methods: {
    async login() {
      this.loading = true;
      this.error = null;

      const payload = {
        phone: this.phone,
        password: this.password,
      };

      try {
        const res = await axios.post(
          "http://localhost:3000/api/employee/login",
          payload,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        console.log("Login response:", res.data);

        const token = res.data.token; // Or res.data.data.token depending on your API

        if (token) {
          // Store token in both localStorage and cookies
          localStorage.setItem('token', token);
          Cookies.set('token', token, { expires: 1 }); // Expires in 1 day

          // Set the token for all future axios requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Navigate to admin dashboard
          this.$router.push({ name: "admins" });
        } else {
          throw new Error("No token received from server");
        }
      } catch (error) {
        console.error("Login error:", error);
        
        if (error.response) {
          switch (error.response.status) {
            case 400:
              this.error = "Invalid phone number or password format";
              break;
            case 401:
              this.error = "Invalid credentials";
              break;
            case 403:
              this.error = "Account is not authorized";
              break;
            default:
              this.error = "Server error occurred";
          }
        } else if (error.request) {
          this.error = "Network error - please check your connection";
        } else {
          this.error = error.message || "Login failed";
        }
      } finally {
        this.loading = false;
      }
    }
  },

  mounted() {
    // Check if user is already logged in
    const existingToken = localStorage.getItem('token') || Cookies.get('token');
    if (existingToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`;
      this.$router.push({ name: "admins" });
    }
  }
};
</script>

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
</script> -->

<!-- <style scoped>
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
</style>  -->

<template>
  <v-container fluid class="backgrounds">
    <v-card class="login-container">
      <h2 class="text-center">Admin Login</h2>

      <v-alert
        v-if="error"
        type="error"
        class="mb-4"
        closable
        @click:close="error = null"
      >
        {{ error }}
      </v-alert>

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
      loading: false,
      error: null,
    };
  },

  // methods: {
  //   async login() {
  //     this.loading = true;
  //     this.error = null;

  //     const payload = {
  //       phone: this.phone,
  //       password: this.password,
  //     };

  //     try {
  //       const res = await axios.post(
  //         "http://localhost:3000/api/employee/login",
  //         payload,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       console.log("Login response:", res.data);

  //       // Make sure to access token from the correct path in response
  //       const token = res.data.data.token;

  //       if (token) {
  //         // Store token
  //         localStorage.setItem("token", token);
  //         Cookies.set("token", token, { expires: 1 });

  //         // Set default authorization header
  //         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //         // Navigate to admin dashboard
  //         await this.$router.push({ name: "admins" });
  //       } else {
  //         throw new Error("No token received from server");
  //       }
  //     } catch (error) {
  //       console.error("Login error:", error);

  //       if (error.response) {
  //         switch (error.response.status) {
  //           case 400:
  //             this.error = "Invalid phone number or password format";
  //             break;
  //           case 401:
  //             this.error = "Invalid credentials";
  //             break;
  //           case 403:
  //             this.error = "Account is not authorized";
  //             break;
  //           default:
  //             this.error = "Server error occurred";
  //         }
  //       } else if (error.request) {
  //         this.error = "Network error - please check your connection";
  //       } else {
  //         this.error = error.message || "Login failed";
  //       }
  //     } finally {
  //       this.loading = false;
  //     }
  //   },
  // },

  // mounted() {
  //   // Check if user is already logged in
  //   const existingToken = localStorage.getItem("token") || Cookies.get("token");
  //   if (existingToken) {
  //     axios.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${existingToken}`;
  //     this.$router.push({ name: "admins" });
  //   }
  // },
 methods: {
  async login() {
    try {
      this.loading = true;
      this.error = null;

      const res = await axios.post(
        "http://localhost:3000/api/employee/login",
        {
          phone: this.phone,
          password: this.password,
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Login response:", res.data);

      // Extract token from response data
      const token = res.data.data.token;

      if (!token) {
        throw new Error("No token received from server");
      }

      // Store token
      localStorage.setItem("token", token);
      
      // Set axios default header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      console.log("Token stored:", {
        token: token,
        stored: localStorage.getItem("token")
      });

      // Navigate to admin dashboard
      await this.$router.push({ name: "admins" });

    } catch (error) {
      console.error("Login error details:", {
        status: error.response?.status,
        message: error.response?.data?.message,
        error: error.message
      });

      if (error.response) {
        switch (error.response.status) {
          case 400:
            this.error = "Invalid phone number or password format";
            break;
          case 401:
            this.error = "Invalid credentials";
            break;
          case 403:
            this.error = "Account is not authorized";
            break;
          default:
            this.error = "Server error occurred";
        }
      } else if (error.request) {
        this.error = "Network error - please check your connection";
      } else {
        this.error = error.message || "Login failed";
      }
    } finally {
      this.loading = false;
    }
  }
}
  
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
