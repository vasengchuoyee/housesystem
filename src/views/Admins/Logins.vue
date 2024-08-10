<!-- <template>
  <v-card>
    <Appbar />
    <v-sheet class="bg-yellow pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="400">
        <h2>Please Login into the Websites</h2>
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Email"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Password"
            placeholder="Enter your password"
          ></v-text-field>

          <br />

          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            Sign In
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </v-card>
</template>
<script>
import Appbar from "../../components/Appbar.vue";
export default {
  name: "AboutView",
  components: {
    Appbar,
  },
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      // setTimeout(() => (this.loading = false), 2000)
      setTimeout(() => {
        this.loading = false;

        this.$router.push("/prod002");
      }, 2000);
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script> -->

<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8 mt-10"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
    <h3 class="text-center mt-6">Users Login</h3>
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a
        >
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn class="mb-8" color="blue" size="large" variant="tonal" block>
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>

export default {
  name: 'Logins',
  components: {
    // Appbar
  },
  data: () => ({
    visible: false,
  }),
};
</script>
