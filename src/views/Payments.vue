<template>
  <LayoutPage>
    <div class="center">
      <v-container-fluid>
        <v-container>
          <v-col>
            <v-card-text>
              <h5>
                <p class="text-red">ຄຳແນະນຳ:</p>
                ກ່ອນທີ່ຈະສາມາດດາວໂລດຟາຍ pdf
                ໂມດິວຂອງແບບເຮືອນນີ້ເພື່ອໃນການດຳເນີນການປູກສ້າງອາຄານເຮືອນຂອງທ່ານ
                ກາລຸນາຊຳລະຄ່າແບບໃຫ້ຄົບຕາມທີ່ແບບເຮືອນຈຶ່ງສະດວກໃນການດາວໂລດຟາຍ
                ໂດຍສາມາດສະແກນຕາມຄິວອາຂ້າງລຸ່ມນີ້
                <p>
                  <span class="text-green">ກາລຸນາລໍ່ຖ້າ:</span
                  >ຫຼັງຈາກຊຳລະແລ້ວພວກເຮົາຈະໄດ້ກວດສອບໃນບິນ ພາຍໃນ 24 ຊົ່ວໂມງ
                </p>
              </h5>
            </v-card-text>
          </v-col>
          <v-row>
            <v-col cols="12" sm="6">
              <v-card class="pa-4">
                <v-row class="mb-4">
                  <v-col cols="12">
                    <h2 class="text-center text-orange">
                      ເຮືອນແບບ ຂອງຫຼວງພະບາງ
                    </h2>
                  </v-col>
                </v-row>

                <v-row class="mb-4">
                  <v-col>
                    <v-icon color="green" large
                      >mdi-seat-individual-suite</v-icon
                    >
                    <p class="mt-2">4 ຫ້ອງນອນ</p>
                  </v-col>
                  <v-col>
                    <v-icon color="red" large>mdi-bank</v-icon>
                    <p class="mt-2">2 ຫ້ອງຮັບແຂກ</p>
                  </v-col>
                  <v-col>
                    <v-icon color="blue" large>mdi-water-pump</v-icon>
                    <p class="mt-2">2 ຫ້ອງນໍ້າ</p>
                  </v-col>
                  <v-col>
                    <v-icon color="orange" large>mdi-home-variant</v-icon>
                    <p class="mt-2">1 ຫ້ອງຄົວ</p>
                  </v-col>
                  <v-col>
                    <v-icon color="pink" large>mdi-car-wash</v-icon>
                    <p class="mt-2">2 ສະຖານທີ່ຈອດລົດ</p>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <h5 class="text-h6">Price: $20,000</h5>
                  </v-col>
                  <v-col>
                    <p>The Area: 20 m x 18 m</p>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="text-start">
                <v-img src="qrcode.png" class="my-2" contain></v-img>
                <v-btn color="primary" @click="downloadQRCode">
                  Download QR Code
                </v-btn>
              </div>
            </v-col>
          </v-row>

          <br />
          <hr />

          <v-card>
            <h4>ຂໍ້ມູນທີ່ສຳຄັນແລະຈຳເປັນຕ້ອງປ້ອນ</h4>
            <br />
            <v-file-input
              label="File input"
              prepend-icon="mdi-camera"
              variant="filled"
              @change="uploadImage"
            ></v-file-input>
            <v-text-field
              label="Name"
              persistent-hint
              variant="outlined"
              v-model="name"
              :rules="nameRules"
            ></v-text-field>
            <br />
            <v-text-field
              label="Email"
              persistent-hint
              variant="outlined"
              v-model="email"
              :rules="emailRules"
            ></v-text-field>
            <br />
            <v-text-field
              label="Phone"
              persistent-hint
              variant="outlined"
              v-model="phone"
              :rules="phoneRules"
            ></v-text-field>

            <div>
              <v-btn
                :disabled="dialog || !isFormValid"
                :loading="loading"
                color="purple-darken-2"
                @click="sendData"
              >
                Sending
              </v-btn>
              <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
                <v-card class="text-center py-5">
                  <v-icon size="64" class="success-icon"
                    >mdi-check-circle-outline</v-icon
                  >
                  <h1 class="mt-3">Success!</h1>
                  <p>Your submission was sent successfully.</p>
                  <v-btn color="primary" @click="goToBillcum"
                    >See Bill order</v-btn
                  >
                </v-card>
              </v-dialog>
            </div>
          </v-card>
        </v-container>
      </v-container-fluid>
    </div>
  </LayoutPage>
</template>

<script>
import { shallowRef } from "vue";
import LayoutPage from "../layouts/LayoutPage.vue";

export default {
  name: "imageUpload",
  data() {
    const activeComponent = shallowRef("Images");
    return {
      dialog: false,
      loading: false,
      previewImage: null,
      activeComponent,
      name: "",
      email: "",
      phone: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length >= 3) || "Name must be at least 3 characters",
      ],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      phoneRules: [
        (v) => !!v || "Phone is required",
        (v) => /^\d{10}$/.test(v) || "Phone must be valid",
      ],
    };
  },
  computed: {
    isFormValid() {
      return (
        this.name &&
        this.email &&
        this.phone &&
        this.previewImage &&
        this.nameRules.every((rule) => rule(this.name) === true) &&
        this.emailRules.every((rule) => rule(this.email) === true) &&
        this.phoneRules.every((rule) => rule(this.phone) === true)
      );
    },
  },
  components: {
    LayoutPage,
  },
  // methods: {
  // uploadImage(e) {
  //   const image = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(image);
  //   reader.onload = (e) => {
  //     this.previewImage = e.target.result;
  //     console.log(this.previewImage);
  //   };
  // },

  methods: {
    async uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };

      // Upload the image to your server or a hosting service
      await this.uploadImageToServer(image);
    },
    downloadQRCode() {
      const link = document.createElement("a");
      link.href = "qrcode.png"; // Path to your QR code image
      link.download = "qrcode.png";
      link.click();
    },

    async uploadImageToServer(image) {
      // Replace this with actual API call to upload the image to your server
      // and return the URL of the uploaded image
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const imageUrl =
            "https://yourserver.com/uploaded-images/" + image.name; // Simulated URL
          resolve(imageUrl);
        }, 2000);
      });
    },

    async sendData() {
      this.loading = true;
      try {
        // Send other data to your backend API
        await this.sendToDatabase();

        // Get the image URL after uploading it
        const imageUrl = await this.uploadImageToServer(this.previewImage);

        // Prepare the message to be sent via WhatsApp, including the image URL
        let message = `Name: ${this.name}\nEmail: ${this.email}\nPhone: ${this.phone}\nImage: ${imageUrl}`;
        let whatsappLink =
          "https://web.whatsapp.com/send?phone=8562028742080&text=" +
          encodeURI(message);

        // Open WhatsApp link
        window.open(whatsappLink);

        // Show the success dialog
        this.dialog = true;
      } catch (error) {
        console.error("Failed to send data:", error);
      } finally {
        this.loading = false;
      }
    },

    async sendToDatabase() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    },

    async sendToDatabase() {
      // Simulate an API call with a delay (Replace this with actual API call to your backend)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    },
    goToBillcum() {
      this.$router.push("/userprofile");
    },
  },
};
</script>
<style>
.uploading-image {
  display: flex;
}

.center {
  text-align: center;
  font-family: "Phetsarath OT", sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.text-start {
  text-align: start;
  width: 200px;
}
.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.pa-4 {
  padding: 1rem;
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: 500;
}
.success-container {
  background-color: #e3f2fd;
  height: 100vh;
}

.success-icon {
  color: #4caf50;
}
</style>
