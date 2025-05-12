<template>
  <LayoutPage>
    <v-container>
      <div class="wave-body">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
      <div>
        <v-text-field
          v-model="searchQuery"
          :loading="houseStore.loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="ຄົ້ນຫາແບບເຮືອນ..."
          variant="solo"
          hide-details
          single-line
          rounded
        />
      </div>

      <!-- Luxury Houses Section -->
      <h3 class="text-center text-orange">ເຮືອນ ຫຼູບ-ຮ້ານ-ສຳນັກງານ</h3>
      <v-row v-if="luxuryProducts.length > 0">
        <v-col
          v-for="item in luxuryProducts"
          :key="item.id"
          cols="6"
          xs="12"
          sm="6"
          md="6"
          lg="3"
        >
          <v-card class="borders">
            <router-link :to="'/prod001/' + item.id">
              <img
                class="product-image"
                :src="item.image || '/0001.jpg'"
                alt="Product Image"
              />
            </router-link>
            <v-title>
              <h3 class="mt-4">{{ item.name }}</h3>
              <sup class="text-red ml-16">- {{ item.discount }}%</sup>
              <div>
                <del>
                  <b class="text-gray">{{ formatPrice(item.sale_price) }}₭</b>
                </del>
                <br />
                <b class="motion-text text-red">
                  {{
                    formatPrice(
                      calculateDiscountedPrice(item.sale_price, item.discount)
                    )
                  }}₭
                </b>
              </div>
              <v-icon
                @click="toggleHeart(item)"
                class="ml-4"
                :color="item.isLiked ? 'red' : 'red'"
              >
                {{ item.isLiked ? "mdi-heart" : "mdi-heart-outline" }}
              </v-icon>
              <v-rating
                :model-value="item.rating"
                size="small"
                dense
                color="orange"
                hover
                class="rating"
              />
            </v-title>
          </v-card>
        </v-col>
      </v-row>
      <div v-else class="text-center">
        <p class="text-gray">No luxury houses available</p>
      </div>

      <!-- General Houses Section -->
      <h3 class="text-center text-orange">ເຮືອນທົ່ວໄປ</h3>
      <v-row v-if="generalProducts.length > 0">
        <v-col
          v-for="item in generalProducts"
          :key="item.id"
          cols="6"
          xs="12"
          sm="6"
          md="6"
          lg="3"
        >
          <v-card class="borders">
            <router-link :to="'/prod001/' + item.id">
              <img
                class="product-image"
                :src="item.image || '/0002.jpg'"
                alt="Product Image"
              />
            </router-link>
            <v-title>
              <h3 class="mt-4">{{ item.name }}</h3>
              <sup class="text-red ml-16">- {{ item.discount }}%</sup>
              <div>
                <del>
                  <b class="text-gray">{{ formatPrice(item.sale_price) }}₭</b>
                </del>
                <br />
                <b class="motion-text text-red">
                  {{
                    formatPrice(
                      calculateDiscountedPrice(item.sale_price, item.discount)
                    )
                  }}₭
                </b>
              </div>
              <v-icon
                @click="toggleHeart(item)"
                class="ml-4"
                :color="item.isLiked ? 'red' : 'red'"
              >
                {{ item.isLiked ? "mdi-heart" : "mdi-heart-outline" }}
              </v-icon>
              <v-rating
                :model-value="item.rating"
                size="small"
                dense
                color="orange"
                hover
                class="rating"
              />
            </v-title>
          </v-card>
        </v-col>
      </v-row>
      <div v-else class="text-center">
        <p class="text-gray">No general houses available</p>
      </div>

      <!-- Double Story Houses Section -->
      <h3 class="text-center text-orange">ເຮືອນສອງຊັ້ນ</h3>
      <v-row v-if="doubleStoryProducts.length > 0">
        <v-col
          v-for="item in doubleStoryProducts"
          :key="item.id"
          cols="6"
          xs="12"
          sm="6"
          md="6"
          lg="3"
        >
          <v-card class="borders">
            <router-link :to="'/prod001/' + item.id">
              <img
                class="product-image"
                :src="item.image || '/0003.jpg'"
                alt="Product Image"
              />
            </router-link>
            <v-title>
              <h3 class="mt-4">{{ item.name }}</h3>
              <sup class="text-red ml-16">- {{ item.discount }}%</sup>
              <div>
                <del>
                  <b class="text-gray">{{ formatPrice(item.sale_price) }}₭</b>
                </del>
                <br />
                <b class="motion-text text-red">
                  {{
                    formatPrice(
                      calculateDiscountedPrice(item.sale_price, item.discount)
                    )
                  }}₭
                </b>
              </div>
              <v-icon
                @click="toggleHeart(item)"
                class="ml-4"
                :color="item.isLiked ? 'red' : 'red'"
              >
                {{ item.isLiked ? "mdi-heart" : "mdi-heart-outline" }}
              </v-icon>
              <v-rating
                :model-value="item.rating"
                size="small"
                dense
                color="orange"
                hover
                class="rating"
              />
            </v-title>
          </v-card>
        </v-col>
      </v-row>
      <div v-else class="text-center">
        <p class="text-gray">No double story houses available</p>
      </div>
    </v-container>
  </LayoutPage>
</template>

<script>
import { useHouseAllStore } from "@/stores/houseall";
import LayoutPage from "../layouts/LayoutPage.vue";

export default {
  name: "Products",
  components: {
    LayoutPage,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    houseStore() {
      return useHouseAllStore();
    },
    luxuryProducts() {
      return this.houseStore.products.filter(
        (item) => item.category_tb?.cateName === "ເຮືອນ ຫຼູບ-ຮ້ານ"
      );
    },
    generalProducts() {
      return this.houseStore.products.filter(
        (item) => item.category_tb?.cateName === "ເຮືອນ ທົ່ວໄປ"
      );
    },
    doubleStoryProducts() {
      return this.houseStore.products.filter(
        (item) => item.category_tb?.cateName === "ເຮືອນ ສອງຊັ້ນ"
      );
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
    toggleHeart(item) {
      item.isLiked = !item.isLiked;
    },
  },
  created() {
    this.houseStore.fetchProducts();
  },
};
</script>

<style>
.product-image {
  width: 260px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.text-center {
  text-align: center;
}

.text-gray {
  color: #777;
}
</style>
