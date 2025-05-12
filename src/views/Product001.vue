<template>
  <LayoutPage>
    <v-card>
      <v-row class="bgcolor" justify="center">
        <v-col cols="12" md="6">
          <v-card class="colors">
            <v-col>
              <v-responsive aspect-ratio="16/9">
                <video autoplay muted class="w-100">
                  <source src="/animitions.mp4" type="video/mp4" />
                </video>
              </v-responsive>
            </v-col>

            <v-sheet class="mx-auto" elevation="8" max-width="800">
              <v-slide-group
                v-model="model"
                class="pa-4"
                selected-class="bg-primary"
                multiple
                show-arrows
              >
                <v-slide-group-item
                  v-for="(image, index) in imagePaths"
                  :key="index"
                  v-slot="{ isSelected, toggle, selectedClass }"
                >
                  <v-card
                    :class="['ma-4', selectedClass]"
                    color="transparent"
                    width="100px"
                    @click="toggle"
                  >
                    <div class="d-flex fill-height align-center justify-center">
                      <v-scale-transition>
                        <v-icon
                          v-if="isSelected"
                          color="white"
                          icon="mdi-close-circle-outline"
                          size="48"
                        ></v-icon>
                      </v-scale-transition>
                      <v-img :src="image" alt="Image"></v-img>
                    </div>
                  </v-card>
                </v-slide-group-item>
              </v-slide-group>
            </v-sheet>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" class="padd">
          <v-row class="mt-8">
            <v-col cols="8">
              <h2 class="text-center text-primary">{{ product.name }}</h2>
            </v-col>
            <v-col cols="4">
              <v-icon>mdi-import</v-icon>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-icon color="green">mdi-seat-individual-suite</v-icon>
              {{ product.bedroom }} <br />ຫ້ອງນອນ
            </v-col>
            <v-col>
              <v-icon color="red">mdi-bank</v-icon>
              {{ product.reception_room }} <br />ຫ້ອງຮັບແຂກ
            </v-col>
            <v-col>
              <v-icon color="blue">mdi-water-pump</v-icon>
              {{ product.toilet_room }} <br />ຫ້ອງນໍ້າ
            </v-col>
            <v-col>
              <v-icon color="orange">mdi-home-variant</v-icon>
              {{ product.kitchen_room }} <br />ຫ້ອງຄົວ
            </v-col>
            <v-col>
              <v-icon color="pink">mdi-car-wash</v-icon>
              {{ product.parking_place }} <br />ສະຖານທີ່ຈອດລົດ
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <!-- <h5>Price: {{ formatPrice(product.sale_price) }}₭</h5> -->
              <b class="text-red">
                price:
                {{
                  formatPrice(
                    calculateDiscountedPrice(
                      product.sale_price,
                      product.discount
                    )
                  )
                }}₭
              </b>
            </v-col>
            <v-col>Area: {{ product.width }} m x {{ product.length }} m</v-col>
          </v-row>
          <p>{{ product.description }}</p>

          <div class="text-center">
            <h3>
              You can download all the models with this house in one PDF here
            </h3>
            <br />
            <v-btn color="primary" @click="handleDownload">
              <v-icon>mdi-file-pdf</v-icon>Download here
            </v-btn>
            <v-dialog v-model="dialog" width="600">
              <v-card class="text-center">
                <v-card-text>
                  Please log in before you can proceed to the next step and see
                  more of what we have on this website. Thank you!
                </v-card-text>
                <v-card-actions class="d-flex justify-center align-center">
                  <v-icon class="text-red" @click="dialog = false">
                    mdi-close-circle
                  </v-icon>

                  <RouterLink to="/register">
                    <v-btn class="buttons">Register</v-btn>
                  </RouterLink>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </LayoutPage>
</template>

<script>
import { useProductStore } from "@/stores/products";
import { useSecondStore } from "@/stores/second";
import { useBestStore } from "@/stores/best";
import { useRoute } from "vue-router";
import LayoutPage from "../layouts/LayoutPage.vue";

export default {
  name: "ProductDetail",
  components: { LayoutPage },
  data() {
    return {
      product: null,
      imagePaths: ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"],
      dialog: false,
    };
  },
  computed: {
    isLoggedIn() {
      // Check login status dynamically
      return !!this.$store.state.user.token; // Example
    },
  },
  methods: {
    formatPrice(price) {
      return parseFloat(price)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    calculateDiscountedPrice(price, discount) {
      const discountAmount = (price * discount) / 100;
      return price - discountAmount;
    },
    handleDownload() {
      if (this.isLoggedIn) {
        this.$router.push("/download-page");
      } else {
        this.dialog = true;
      }
    },
  },
  created() {
    const productStore = useProductStore();
    const secondStore = useSecondStore();
    const bestStore = useBestStore();
    const route = useRoute();
    const productId = route.params.id;

    let product =
      productStore.getProductById(productId) ||
      secondStore.getProductById(productId) ||
      bestStore.getProductById(productId);

    this.product = product || null;
  },
};
</script>


<style scoped>
.borders {
  width: 280px;
  height: auto;
  text-align: start;
  overflow: hidden;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0.5px 2px 0px 0px #888888;
  background-color: #f1f1f1;
  justify-content: center;
}
.borders:hover {
  background: linear-gradient(
    0deg,
    rgb(252, 251, 251) 0%,
    rgb(241, 193, 35) 100%
  );
}

.rating {
  margin-top: -8px;
  margin-left: 20px;
}
.text-gray {
  color: #757575;
}
.buttons {
  background-color: yellow;
  margin-left: 40px;
}
</style>
