<template>
  <div>
    <Appbar />

    <v-card
      class="mx-auto bg-yellow text-center mt-10"
      max-width="500"
      title="User Registration"
      @submit.prevent="onSubmit"
    >
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="first"
            :rules="[rules.required]"
            color="primary"
            label="First name"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="last"
            :rules="[rules.required]"
            color="primary"
            label="Last name"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            color="primary"
            label="Email"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="[rules.required, rules.min(8)]"
            color="primary"
            label="Password"
            placeholder="Enter your password"
            variant="underlined"
            type="password"
          ></v-text-field>

          <v-checkbox
            v-model="terms"
            :rules="[rules.required]"
            color="secondary"
            label="Remember me"
          ></v-checkbox>
        </v-form>
      </v-container>

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
    </v-card>
  </div>
</template>

<script>
import Appbar from "../../components/Appbar.vue";
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
    password: null,
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
    onSubmit() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;

      setTimeout(() => {
        this.loading = false;

        this.$router.push("/logins");
      }, 2000);
    },
  },
};
</script>
