<!-- <template>
  <div>
    <Appbar />
    <The_stepts />
    <v-container-fluid>
      <v-img src="bcel.png"></v-img>
      <br />
      <v-container class="center">
        <v-col>
          <Dialog />
        </v-col>

        <div style="text-align: start">
          <label>
            <input type="radio" v-model="activeComponent" value="Images" />
            ບັນຊີເງິນກີບ (KIP)
          </label>
          <label>
            <input type="radio" v-model="activeComponent" value="Images1" />
            ບັນຊີເງິນໂດລາ (USD)
          </label>
          <transition name="fade" mode="out-in">
            <component :is="activeComponent"></component>
          </transition>
        </div>

        <v-card>
          <h4>Upload your screen pic to show</h4>
          <input type="file" accept="image/jpeg" @change="uploadImage" />
          <br />
          <br />
          <v-text-field
            label="Name"
            persistent-hint
            variant="outlined"
            v-model="message"
          ></v-text-field>
          <br />
          <v-text-field
            label="Email"
            persistent-hint
            variant="outlined"
            v-model="message"
          ></v-text-field>
          <br />
          <v-text-field
            label="Phone"
            persistent-hint
            variant="outlined"
            v-model="message"
          ></v-text-field>

     

          <div class="center">
            <v-btn
              :disabled="dialog"
              :loading="dialog"
              color="purple-darken-2"
              @click="dialog = true"
            >
              Sending
            </v-btn>
            <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
              <v-card color="primary">
                <v-card-text>
                  thank you very much
                  <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                  ></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </v-card>
      </v-container>
    </v-container-fluid>
  </div>
</template>

<script>
import { shallowRef } from "vue";

import Appbar from "../components/Appbar.vue";
import Images1 from "../components/Image_qr/Images1.vue";
import Images from "../components/Image_qr/Images.vue";
import Dialog from "../components/Dialog.vue";
import The_stepts from "../components/The_stepts.vue";
export default {
  name: "imageUpload",
  data() {
    const activeComponent = shallowRef("Images");
    return {
      dialog: false,
      previewImage: null,
      activeComponent,
    };
  },
  components: {
    Appbar,
    Images,
    Images1,
    Dialog,
    The_stepts
  },
  methods: {
    uploadImage(event) {
      const URL = "http://foobar.com/upload";

      let data = new FormData();
      data.append("name", "my-picture");
      data.append("file", event.target.files[0]);

      let config = {
        header: {
          "Content-Type": "image/png",
        },
      };

      axios.put(URL, data, config).then((response) => {
        console.log("image upload response > ", response);
      });
    },
  },

  methods: {
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
  },
  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 1000);
    },
  },
};
</script>

<style>
.uploading-image {
  display: flex;
}

.img {
  width: 20%;
  height: 20%;
}

.center {
  text-align: center;
  font-family: "Noto Sans Lao", sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> -->

<template>
  <div>
    <Appbar />
    <The_stepts />
    <v-container-fluid>
      <v-img src="bcel.png"></v-img>
      <br />
      <v-container class="center">
        <v-col>
          <Dialog />
        </v-col>

        <div style="text-align: start">
          <label>
            <input type="radio" v-model="activeComponent" value="Images" />
            ບັນຊີເງິນກີບ (KIP)
          </label>
          <label>
            <input type="radio" v-model="activeComponent" value="Images1" />
            ບັນຊີເງິນໂດລາ (USD)
          </label>
          <transition name="fade" mode="out-in">
            <component :is="activeComponent"></component>
          </transition>
        </div>

        <v-card>
          <h4>Upload your screen pic to show</h4>
          <input type="file" accept="image/jpeg" @change="uploadImage" />
          <br />
          <br />
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

          <div class="center">
            <v-btn
              :disabled="dialog || !isFormValid"
              :loading="dialog"
              color="purple-darken-2"
              @click="sendToWhatsApp"
            >
              Sending
            </v-btn>
            <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
              <v-card color="primary">
                <v-card-text>
                  thank you very much
                  <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                  ></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </v-card>
      </v-container>
    </v-container-fluid>
  </div>
</template>

<script>
import { shallowRef } from "vue";
import Appbar from "../components/Appbar.vue";
import Images1 from "../components/Image_qr/Images1.vue";
import Images from "../components/Image_qr/Images.vue";
import Dialog from "../components/Dialog.vue";
import The_stepts from "../components/The_stepts.vue";
import axios from "axios";

export default {
  name: "imageUpload",
  data() {
    const activeComponent = shallowRef("Images");
    return {
      dialog: false,
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
    Appbar,
    Images,
    Images1,
    Dialog,
    The_stepts,
  },
  methods: {
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
    sendToWhatsApp() {
      const message = `Name: ${this.name}\nEmail: ${this.email}\nPhone: ${this.phone}`;
      const url = `https://wa.me/8562077474616?text=${encodeURIComponent(
        message
      )}`;
      window.open(url);
      // } catch (error) {
      //     console.error(error);
      //   },
      this.dialog = true;
    },
  },
  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 1000);
    },
  },
};
</script>

<style>
.uploading-image {
  display: flex;
}

.img {
  width: 20%;
  height: 20%;
}

.center {
  text-align: center;
  font-family: "Noto Sans Lao", sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
