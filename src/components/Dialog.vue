<template>
    <v-row justify="center" class="dogfont">
      <v-dialog
        v-model="dialog"
        width="800"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
          <v-icon >mdi-arrow-right-bold-circle-outline</v-icon>
            ກົດເພື່ອອ່ານຄຳແນະນຳ
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">ອະທິບາຍລາຍລະອຽດ</span>
          </v-card-title>
          <v-card-text class="dogfont">
            <h2>ກ່ອນທີ່ຈະສາມາດດາວໂລດຟາຍ pdf ໂມດິວຂອງແບບເຮືອນນີ້ເພື່ອໃນການດຳເນີນການປູກສ້າງອາຄານເຮືອນຂອງທ່ານ ກາລຸນາຊຳລະຄ່າແບບໃຫ້ຄົບຕາມທີ່ແບບເຮືອນຈຶ່ງສະດວກໃນການດາວໂລດຟາຍ ໂດຍສາມາດສະແກນຕາມຄິວອາຂ້າງລຸ່ມນີ້
           You can pay with BCELone kip and USD BCELone pay only</h2>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="dialog = false"
              class="dogfont"
            >
              ເຂົ້າໃຈແລ້ວ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
  <script>
    export default {
      data () {
        return {
          dialog: false,
        }
      },
    }
  </script>