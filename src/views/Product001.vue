<template>
  <v-card>
    <Appbar />
    <!-- <v-card> -->
      <The_stepts />
    <!-- </v-card> -->

    <v-row class="bgcolor" justify="center">
      <v-col cols="12" md="6">
        <v-card class="colors">
          <v-col>
            <video autoplay muted style="width: 100%; height: 100%;">
              <source
                width="200"
                height="315"
                src="/animitions.mp4"
                type="video/mp4"
              />
            </video>
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
                  height="100"
                  width="140"
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
                    <v-img
                      :src="image"
                      alt="Image"
                      style="max-width: 100%; max-height: 100%"
                    ></v-img>
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
            <h2 class="text-center">ເຮືອນແບບ ຂອງຫຼວງພະບາງ</h2>
          </v-col>
          <v-col cols="4">
            <v-icon>mdi-import</v-icon>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-icon color="green">mdi-seat-individual-suite</v-icon> 4
            <br />ຫ້ອງນອນ
          </v-col>
          <v-col>
            <v-icon color="red">mdi-bank</v-icon> 2 <br />ຫ້ອງຮັບແຂກ
          </v-col>
          <v-col>
            <v-icon color="blue">mdi-water-pump</v-icon> 2 <br />ຫ້ອງນໍ້າ
          </v-col>
          <v-col>
            <v-icon color="orange">mdi-home-variant</v-icon> 1 <br />ຫ້ອງຄົວ
          </v-col>
          <v-col>
            <v-icon color="pink">mdi-car-wash</v-icon> 2 <br />ສະຖານທີ່ຈອດລົດ
          </v-col> </v-row
        ><br />
        <v-row>
          <v-col>
            <h5>Price: $20 000</h5>
          </v-col>
          <v-col>The Area : 20 m x 18 m </v-col>
        </v-row>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          quod, deleniti, accusantium molestiae, aliquam aspernatur quia
          temporibus dolorem molestias rerum amet quam iure inventore itaque!
          Possimus pariatur dolor itaque minima!
        </p>
        <br />

        <hr />
        <hr />

        <div class="text-center">
          <h3>
            You can download all the models with this house in one PDF here
          </h3>
          <br />
          <v-btn color="primary" @click="dialog = true">
            <v-icon>mdi-file-pdf</v-icon>Download here</v-btn
          >
          <v-dialog v-model="dialog" width="auto">
            <v-card>
              <v-card-text>
                Please log in before you can proceed to the next step and see
                more of what we have on this website. Thank you!
              </v-card-text>
              <v-card-actions>
                <v-btn href="/register" class="buttons">Login</v-btn>
                <v-icon color="red" @click="dialog = false"
                  >mdi-close-circle</v-icon
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
    <hr />
    <Footer />
  </v-card>
</template>

<script>
import Appbar from "../components/Appbar.vue";
import Footer from "../components/Footer.vue";
import huose_Products0Vue from "../components/products/huose_Products0.vue";
import The_stepts from "../components/The_stepts.vue";
export default {
  name: "Product001",
  components: {
    Appbar,
    Footer,
    huose_Products0Vue,
    The_stepts,
  },
  data: () => ({
    tab: null,
    dialog: false,
    model: [],
    imagePaths: [
      "0001.jpg",
      "0001.jpg",
      "0001.jpg",
      "0001.jpg",
      "0001.jpg",
      "0001.jpg",
    ],
  }),
  methods: {
    downloadPDF() {
      const pdfPath = "mycv.pdf"; 
      const link = document.createElement("a");
      link.href = pdfPath;
      link.download = "the_files_pdf_of_modern.pdf"; 
      link.click();
    },
    scroll(refName) {
      const element = document.getElementById(refName);
      element.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.buttons {
  color: rgb(28, 226, 88);
  text-align: center;
  height: 80%;
  width: 60%;
}

.img {
  text-align: center;
  height: 60%;
  width: 60%;
}

.bgcolor {
  background-color: rgb(226, 228, 226);
  padding: 40px;
}

.colors {
  background-color: rgba(248, 247, 246, 0.938);
  font-family: "Noto Sans Lao", sans-serif;
  width: 500px;
}

.padd {
  border-style: ridge;
  width: 650px;
  height: auto;
}

/* Additional styles for responsiveness */
@media (max-width: 600px) {
  .colors {
    padding: 10px;
  }
}
</style>
