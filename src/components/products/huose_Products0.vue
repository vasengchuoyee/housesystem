<template>
  <v-container>
    <!-- <div>
      <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="Search templates"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        v-model="searchQuery"
        placeholder="Search products"
        class="search-width"
      >
      </v-text-field>
    </div> -->
    <!-- <v-row> -->
    <div>
      <siglepro />
    </div>
    <!-- <v-row>
        <v-col
          v-for="item in filteredProducts"
          :key="item.id"
          cols="6"
          xs="12"
          sm="12"
          md="6"
          lg="3"
        >
          <v-card class="borders" max-width="344">
            <v-hover v-slot="{ isHovering, props }">
              <router-link to="/prod001">
                <img
                  class="align-center d-flex"
                  style="width: 100%; height: 50%"
                  :src="item.image"
                  cover
                  @mouseover="hovered = true"
                  @mouseleave="hovered = false"
                  alt="Hover Image"
                />
              </router-link>
            </v-hover>
            <v-title>
              <v-row>
                <v-col>
                  <h3 class="mt-4">{{ item.name }}</h3>
                </v-col>
                <v-col class="text-gray">
                  <sup class="text-red ml-15">{{ item.discount }}</sup>
                  <div>
                    Price:
                    <del
                      ><b>{{ formatPrice(item.price) }}</b></del
                    ><br />

                    <b class="text-red"
                      >{{
                        formatPrice(
                          calculateDiscountedPrice(item.price, item.discount)
                        )
                      }}
                      ₭</b
                    >
                  </div>
                </v-col>
              </v-row>

              <div>
                <v-row>
                  <v-col @click="toggleHeart(item)">
                    <v-icon class="ml-4" :color="item.isLiked ? 'red' : 'red'"
                      >{{ item.isLiked ? "mdi-heart" : "mdi-heart-outline" }}
                    </v-icon>
                  </v-col>

                  <v-col>
                    <span class="text-green text-subtitle-2">20 Reviews</span>
                  </v-col>
                </v-row>
                <br />
                <v-rating
                  :model-value="2"
                  size="small"
                  dense
                  color="orange"
                  hover
                  class="rating"
                ></v-rating>
              </div>
            </v-title>
          </v-card>
        </v-col>
      </v-row> -->
    <v-row>
      <v-col
        v-for="item in filteredProducts"
        :key="item.id"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="borders">
          <v-hover v-slot="{ isHovering, props }">
            <router-link :to="`/prod001`">
              <img
                class="align-center d-flex"
                style="width: 100%; height: 50%"
                :src="item.image"
                cover
                @mouseover="hovered = true"
                @mouseleave="hovered = false"
                alt="Hover Image"
              />
            </router-link>
          </v-hover>
          <v-title>
            <v-row>
              <v-col>
                <h3 class="mt-4">{{ item.name }}</h3>
              </v-col>
              <v-col class="text-gray">
                <sup class="text-red ml-15">{{ item.discount }}</sup>
                <div>
                  Price:
                  <del
                    ><b>{{ formatPrice(item.price) }}</b></del
                  ><br />
                  <b class="text-red">
                    {{
                      formatPrice(
                        calculateDiscountedPrice(item.price, item.discount)
                      )
                    }}
                    ₭
                  </b>
                </div>
              </v-col>
            </v-row>

            <div>
              <v-row>
                <v-col>
                  <v-icon
                    @click="toggleHeart(item)"
                    class="ml-4"
                    :color="item.isLiked ? 'red' : 'red'"
                  >
                    {{ item.isLiked ? "mdi-heart" : "mdi-heart-outline" }}
                  </v-icon>
                </v-col>

                <v-col>
                  <span class="text-green text-subtitle-2">20 Reviews</span>
                </v-col>
              </v-row>
              <br />
              <v-rating
                :model-value="2"
                size="small"
                dense
                color="orange"
                hover
                class="rating"
              ></v-rating>
            </div>
          </v-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- </v-row> -->
  </v-container>
</template>

<script>
import siglepro from "../siglepro.vue";
export default {
  name: "Products",
  components: {
    siglepro,
  },
  data() {
    return {
      searchQuery: "",
      fav: true,
      hovered: false,
      isLiked: false,
      defaultImageSrc: "path/to/default-image.jpg",
      hoverImageSrc: "path/to/hover-image.jpg",
      products: [
        {
          id: 1,
          name: "ເຮືອນງາມຄຸນນະພາບດີ",
          price: 3000000,
          image: "0001.jpg",
          area: "20x20",
          debroom: 2,
          toilet: 2,
          classroom: 3,
          discount: "-10%",
          active: false,
        },
        {
          id: 2,
          name: "ເຮືອນງາມຄຸນນະພາບດີ",
          price: 4000000,
          image: "0002.jpg",
          area: "20x20",
          debroom: 2,
          toilet: 2,
          classroom: 3,
          discount: "-12%",
          active: false,
        },
        {
          id: 3,
          name: "ເຮືອນງາມຄຸນນະພາບດີ",
          price: 2500000,
          image: "0003.jpg",
          area: "20x20",
          debroom: 2,
          toilet: 2,
          classroom: 3,
          discount: "-10%",
          active: false,
        },
        {
          id: 4,
          name: "ເຮືອນງາມຄຸນນະພາບດີ",
          price: 2500000,
          image: "0003.jpg",
          area: "20x20",
          debroom: 2,
          toilet: 2,
          classroom: 3,
          discount: "-15%",
          active: false,
        },
        {
          id: 5,
          name: "ເຮືອນງາມຄຸນນະພາບດີ",
          price: 2500000,
          image: "0003.jpg",
          area: "20x20",
          debroom: 2,
          toilet: 2,
          classroom: 3,
          discount: "-10%",
          active: false,
        },
        {
          id: 6,
          name: "ເຮືອນງາມຄຸນນະພາບດີ",
          price: 2500000,
          image: "0003.jpg",
          area: "20x20",
          debroom: 2,
          toilet: 2,
          classroom: 3,
          discount: "-5%",
          active: false,
        },
        {
          id: 7,
          name: "ເຮືອນງາມຄຸນນະພາບດີ",
          price: 2500000,
          image: "0003.jpg",
          area: "20x20",
          debroom: 2,
          toilet: 2,
          classroom: 3,
          discount: "-20%",
          active: false,
        },
        {
          id: 8,
          name: "grangejuie",
          price: 2500000,
          image: "0003.jpg",
          area: "20x20",
          debroom: 2,
          toilet: 2,
          classroom: 3,
          discount: "-30%",
          active: false,
        },
      ],
    };
  },
  computed: {
    filteredProducts() {
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        return this.products.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            this.formatPrice(item.price).includes(query) // Search by price
        );
      } else {
        return this.products;
      }
    },
  },
  methods: {
    // format the price
    formatPrice(price) {
      let val = (price / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    toggleHeart(item) {
      item.isLiked = !item.isLiked;
    },
    calculateDiscountedPrice(price, discount) {
      // Convert the discount percentage to a decimal
      const discountDecimal = parseFloat(discount) / 100;

      // Ensure price is a valid number
      const parsedPrice = parseFloat(price);

      // Check if price is a valid number
      if (isNaN(parsedPrice)) {
        console.error("Invalid price:", price);
        return NaN;
      }

      // Calculate the discounted price
      const discountedPrice = parsedPrice + parsedPrice * discountDecimal;

      // Check if discounted price is a valid number
      if (isNaN(discountedPrice)) {
        console.error("Invalid discounted price:", discountedPrice);
        return NaN;
      }

      // Return the discounted price
      return discountedPrice;
    },
  },
};
</script>

<style scoped>
.borders {
  width: 280px;
  height: 300px;
  text-align: start;
  border-radius: 20px 20px;
  border: 0.5px;
  padding: 10px;
  box-shadow: 0.5px 2px 0px 0px #888888;
  background-color: #f1f1f1;
  margin: 0px;
  justify-content: center;
}

.borders:hover {
  background: linear-gradient(
    0deg,
    rgb(252, 251, 251) 0%,
    rgb(241, 193, 35) 100%
  );
}

.search-wrapper {
  margin-bottom: 20px;
}

.form-control {
  width: 200px;
}

.search-width {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.rating {
  margin-top: -8px;
}
</style>
