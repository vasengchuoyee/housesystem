<template>
  <v-carousel show-arrows="hover" height="300px" cycle>
    <v-carousel-item>
      <v-sheet>
        <v-row class="d-flex" justify="center">
          <v-col cols="12" sm="6" class="text-center">
            <video autoplay muted style="width: 100%; height: 100%">
              <source src="/myvideo.mp4" type="video/mp4" />
            </video>
          </v-col>

          <v-col cols="12" sm="6" class="center">
            <p>
              ເຮືອນດີມີຄຸນນະພາບ,ໝັ້ນຄົງຍືນຍົງ,ປອດໄພ ຢູ່ແລ້ວມີຄວາມສຸກໂຮມເຢັນ
              ຮັ່ງມີລໍາລວຍຕະຫຼອດໄປ ສົນກັບຄຳທີ່ວ່າ <br>
              " ເຮືອນນຳໂຊກເງິນໄຫຼ່ຫາ ເຮືອນແໜ້ນໜາຄອບຄົວມີສຸກ "
            </p>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>

    <v-carousel-item>
      <v-sheet>
        <v-col class="d-flex">
          <v-row>
            <v-col>
              <v-img src="0002.jpg" cover class="image"></v-img>
            </v-col>
            <v-col class="slides">
              <h3>
                <typing :text="displayText"></typing><br />

                <typing :text="displayText1"></typing>
              </h3>

              <p>ເຮືອນຂາຍດີ</p>
              <v-btn class="bg-yellow" href="/prod001">ລາຍລະອຽດທີ່ນີ້</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-sheet>
    </v-carousel-item>

    <v-col class="contianer-fluid">
      <v-sheet>
        <v-carousel-item src="0003.jpg" cover class="image">
          <h2 class="image">" ຍອດນີ້ຍົມແບບຂອງຄົນລາວ "</h2>
        </v-carousel-item>
      </v-sheet>
    </v-col>
  </v-carousel>
</template>

<script>
import typing from "./typing.vue";
export default {
  name: "slideshow",
  components: {
    typing,
  },
  data() {
    return {
      showArrows: false,
      displayText: "ເຮືອນສະໄຕແບບຫຼວງພະບາງ",
      displayText1: "ຖືກໃຈທຸກທ່ານ",
    };
  },
};
</script>

<style scoped>
.image {
  text-align: center;
  width: 100%;
  height: 100%;
  color: white;
}

.slides {
  background: linear-gradient(
    0deg,
    rgb(239, 243, 240) 0%,
    rgb(142, 225, 228) 100%
  );
  border-radius: 40px;
  text-align: center;
  margin-top: 20px;
}

.center {
  background-color: rgb(192, 201, 192);
  border-radius: 10px;
  margin-top: 20px;
}

p {
  text-align: center;
  margin-top: 60px;
}

@media screen and (max-width: 600px) {
  .slides {
    padding: 10px;
  }
}
</style>
