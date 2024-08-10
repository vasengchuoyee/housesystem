import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { ref } from "vue";

import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
// import VueCompositionAPI from "@vue/composition-api";

import "./assets/main.css";
import VideoBg from "vue-videobg";

loadFonts();

createApp(App)
  .use(router)
  .use(vuetify)
  .use(useVuelidate)
  // .use(VueCompositionAPI)
  .component("video-bg", VideoBg)
  .mount("#app");
