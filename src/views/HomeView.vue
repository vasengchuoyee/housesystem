<template>
  <div>
    <!-- import Appbar from components -->
    <Appbar />
    <Navbar />

    <!-- import slideshow form components -->
    <Slideshow />

    <marquee behavior="scrool" direction="left" class="style"
      >ຂາຍໂມດິວແບບເຮືອນ ອອກແບບສະຖາປັດຕະຍະກໍາ ຕົບແຕ່ງພາຍໃນ ແລະ
      ພ້ອມຮັບເມົາກໍ້ສ້າງອາຄານຕາມໃຈທີ່ທ່ານມັກ
    </marquee>

    <!-- All products -->
    <v-container fluid>
      <v-card class="back-image">
        <v-card-text id="services">
          <!-- products -->
          <div>
            <v-row id="0000">
              <!-- <h3>ເຮືອນສອງຊັ້ນ</h3> -->
              <huose_Products0 />
            </v-row>
          </div>
          <br />
          <v-cols cols="12" sm="6" ref="house" class="about-me small-card">
            <h2>ເຮືອນມາດຕະຖານ ແລະ ມີຄຸນນະພາບດີ ພ້ອມອອກແບບຕາມຫຼັກຮຸ່ງຈອຍ</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              aliquam itaque ea eius eos consequuntur nam deserunt unde est
              dignissimos?
            </p>
          </v-cols>
          <br /><br />
          <v-row id="1111">
            <v-col>
              <!-- <h3>ເຮືອນສອງຊັ້ນ</h3> -->
              <Products11 />
            </v-col>
          </v-row>

          <v-row id="2222">
            <!-- <h3>ເຮືອນຫຼູບ</h3> -->
            <Products22 />
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
    <hr />
    <!-- import folder testing from comp -->
    <v-card id="work">
      <Testing />
    </v-card>

    <!-- contact  -->
    <div ref="aboutMe" class="about-me">
      <v-col cols="12" sm="12" class="px-16" id="contact">
        <v-row>
          <v-col cols="12" sm="4">
            <div class="child">
              <h1>Contact info.</h1>
              <v-btn
                icon="mdi-map-marker"
                color="#4CAF50"
                class="mt-10"
                variant="outlined"
              ></v-btn
              ><br />
              <span class="text-caption">13 raod, Noth Ban phulackchalean </span
              ><br />
              <v-btn
                icon="mdi-phone"
                color="#4CAF50"
                class="mt-10"
                variant="outlined"
              ></v-btn
              ><br />
              <span class="text-caption">020-2874-2080 </span> <br />
              <span class="text-caption">020-7724-4616 </span> <br />
              <v-btn
                icon="mdi-email"
                color="#4CAF50"
                class="mt-10"
                variant="outlined"
              ></v-btn
              ><br />
              <span class="text-caption">vasengchuoyee@gmail.com </span>
            </div>
          </v-col>

          <v-col cols="12" sm="8">
            <!-- test -->
            <sending />
          </v-col>
        </v-row>
      </v-col>
    </div>

    <!-- footer -->
    <div id="footer">
      <Footer />
    </div>

    <!-- button go back to the top -->
    <goback />
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import Appbar from "../components/Appbar.vue";
import Navbar from "../components/Navbar.vue";
import Slideshow from "../components/Slideshow.vue";
import Footer from "../components/Footer.vue";
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
    Appbar,
    Navbar,
    Slideshow,
    Footer,
    Testing,
    Products11,
    Products22,
    sending,
    huose_Products0,
    goback,
  },
});
</script>

<style scoped>
.back-image {
  /* background-image: url('mode-bground.jpg'); */
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

<!-- https://vasengowner.web.app -->
