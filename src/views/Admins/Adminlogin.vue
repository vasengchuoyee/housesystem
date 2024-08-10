<!-- Login.vue -->
<template>
  <v-container fluid class="backgroud">
    <div class="login-container">
      <h2>Admin Login</h2>
      <form @submit.prevent="login">
        <label for="name">Name:</label>
        <input class="inputs" type="text" v-model="email" required>
        <label for="password">Password:</label>
        <input class="inputs" type="password" v-model="password" required>
        <button type="submit">Login</button>
      </form>
    </div>
  </v-container>
</template>

<script>
import axios from "axios"
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      email: 'admin@gmail.com',
      password: 'admin@123',
    };
  },
  methods: {
    login() {
      const formData = new FormData();
      formData.append('email', this.email);
      formData.append('password', this.password);
      console.log(formData)
      axios.post("https://restaurant.hidden-it.com/api/login",
        formData).then(res => {
          console.log('Login successful', res.data);
          const token = res.data.token
          Cookies.set('token', token);
          if (token) {
            this.$router.push({ name: "admins" })
          } else {
            this.$router.push({ name: "adminlogin" })
          }
        }).catch(error => {
          console.log(error)
        })

    },
    mounted() {
      const token = Cookies.get('token');
      console.log("get token:", token)
      if (token) {
        this.$router.push({ name: "admins" })
      }
      else {
        console.log("No token!")
      }
    },

  },
};
</script>


<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #272525;
  border-radius: 5px;
  margin-top: 50px;

}

.backgroud {
  background-image: url('logos.png');
  background-color: rgb(173, 245, 173);

}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 10px;
}

input {
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.inputs {
  background-color: rgb(238, 208, 208);
}
</style>