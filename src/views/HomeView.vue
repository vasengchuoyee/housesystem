<template>
  <LayoutPage>
    <div>

      <!-- slideshow_components -->
      <div>
        <Slideshow />
      </div>

      <marquee behavior="scroll" direction="left" class="style">
        {{ $t("marqueeText") }}
      </marquee>

      <!-- All products -->

      <v-container fluid>
        <v-card-text id="services">
          <div>
            <v-row id="0000">
              <huose_Products0 />
            </v-row>
          </div>
          <br />
          <v-cols cols="12" sm="6" ref="house" class="about-me small-card">
            <h2>{{ $t("houseDesignTitle") }}</h2>
            <p>{{ $t("houseDesignDescription") }}</p>
          </v-cols>
          <br /><br />
          <v-row id="1111">
            <v-col>
              <Products11 />
            </v-col>
          </v-row>
          <v-col cols="12" sm="6" class="text-center">
            <div class="myvideos">
              <video autoplay muted style="width: 100%; height: 100%">
                <source src="/myvideo.mp4" type="video/mp4" cover />
              </video>
            </div>
            <br />
            <p>{{ $t("videoDescription") }}</p>
          </v-col>
          <v-row id="2222">
            <Products22 />
          </v-row>
        </v-card-text>
      </v-container>

      <hr />

      <v-card id="work">
        <Testing />
      </v-card>

      <!-- contact -->
      <div ref="aboutMe" class="about-me">
        <v-col cols="12" sm="12" class="px-16" id="contact">
          <v-row>
            <v-col cols="12" sm="4">
              <div class="child">
                <h1>{{ $t("contactTitle") }}</h1>
                <v-btn
                  icon="mdi-map-marker"
                  color="#4CAF50"
                  class="mt-10"
                  variant="outlined"
                ></v-btn>
                <br />
                <span class="text-caption">{{ $t("address") }}</span>
                <br />
                <v-btn
                  icon="mdi-phone"
                  color="#4CAF50"
                  class="mt-10"
                  variant="outlined"
                ></v-btn>
                <br />
                <span class="text-caption">{{ $t("phone1") }}</span>
                <br />
                <span class="text-caption">{{ $t("phone2") }}</span>
                <br />
                <v-btn
                  icon="mdi-email"
                  color="#4CAF50"
                  class="mt-10"
                  variant="outlined"
                ></v-btn>
                <br />
                <span class="text-caption">{{ $t("email") }}</span>
              </div>
            </v-col>
            <v-col cols="12" sm="8">
              <sending />
            </v-col>
          </v-row>
        </v-col>
      </div>

      <!-- button go back to the top -->
      <goback />
    </div>
  </LayoutPage>
</template>

<script>
import { defineComponent } from "vue";
import i18n from "../i18n/i18n"; // Import i18n configuration

import LayoutPage from "../layouts/LayoutPage.vue";
// Components

import Slideshow from "../components/Slideshow.vue";
import Testing from "../components/Testing.vue";
import Products11 from "../components/products/Products11.vue";
import Products22 from "../components/products/Products22.vue";
import sending from "../components/sending.vue";
import huose_Products0 from "../components/products/huose_Products0.vue";
import goback from "../components/button-goback/goback.vue";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      tab: null,
    };
  },
  methods: {
    scroll(refName) {
      const element = document.getElementById(refName);
      element.scrollIntoView({ behavior: "smooth" });
    },

    handleAboutMeScrollIntoView() {
      const aboutMeElement = this.$refs.aboutMe;
      const windowHeight = window.innerHeight;
      const aboutMeBounding = aboutMeElement.getBoundingClientRect();
      const aboutMeTopInView =
        aboutMeBounding.top < windowHeight && aboutMeBounding.bottom >= 0;
      if (aboutMeTopInView) {
        aboutMeElement.classList.add("scroll-show");
      } else {
        aboutMeElement.classList.remove("scroll-show");
      }
    },
    handleHouseScrollIntoView() {
      const houseElement = this.$refs.house;
      const windowHeight = window.innerHeight;
      const houseBounding = houseElement.getBoundingClientRect();
      const houseTopInView =
        houseBounding.top < windowHeight && houseBounding.bottom >= 0;
      if (houseTopInView) {
        houseElement.classList.add("scroll-show");
      } else {
        houseElement.classList.remove("scroll-show");
      }
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleAboutMeScrollIntoView);
    window.addEventListener("scroll", this.handleHouseScrollIntoView);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleAboutMeScrollIntoView);
    window.removeEventListener("scroll", this.handleHouseScrollIntoView);
  },

  components: {
    Slideshow,
    Testing,
    Products11,
    Products22,
    sending,
    huose_Products0,
    goback,
    LayoutPage,
  },
});
</script>
