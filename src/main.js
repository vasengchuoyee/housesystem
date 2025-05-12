// import { createApp } from "vue";
// import { createPinia } from 'pinia';
// import App from "./App.vue";
// import router from "./router";
// import vuetify from "./plugins/vuetify";
// import { loadFonts } from "./plugins/webfontloader";
// import { ref } from "vue";
// // import Cookies from 'js-cookie'; 

// import { reactive } from "vue";
// import { useVuelidate } from "@vuelidate/core";
// // import VueCompositionAPI from "@vue/composition-api";
// import i18n from './i18n/i18n'; 

// import "./assets/main.css";
// import VideoBg from "vue-videobg";
// const pinia = createPinia();
// loadFonts();

// createApp(App)
//   .use(pinia)
//   .use(router)
//   .use(vuetify)
//   .use(useVuelidate)
//   .use(i18n)
//   // .use(VueCompositionAPI)
//   .component("video-bg", VideoBg)
//   .mount("#app");


import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "./assets/main.css";
import "./assets/style.css";
import VideoBg from "vue-videobg";

const pinia = createPinia();
loadFonts();

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .component("video-bg", VideoBg)
  .mount("#app");
