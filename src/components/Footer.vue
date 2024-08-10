<template>
  <v-footer class="footer">
    <v-col cols="12">
      <v-row class="footer-content">
        <v-col cols="12" sm="4" md="3">
          <v-img src="iimg.png" class="borimg"></v-img>
          <p>Our teams work</p>
          <v-row cols="2" sm="2" md="2" class="avatars">
            <v-col>
              <v-img src="avatar.png"></v-img>
              <p>ທ່ານ ອາຈານ ປທ ໄຊສຸລີ</p>
            </v-col>
            <v-col>
              <v-img src="avatar.png"></v-img>
              <p>ທ່ານ ເຊັ່ງປໍ</p>
            </v-col>
            <v-col>
              <v-img src="avatar.png"></v-img>
              <p>ທ່ານ ລີໄຊ ໄຈດວງທໍ່</p>
            </v-col>
            <v-col>
              <v-img src="avatar.png"></v-img>
              <p>ທ່ານ ເມັງວ່າງ</p>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" sm="4">
          <v-row class="padd">
            <v-icon>mdi-facebook</v-icon>
            <a href="https://www.facebook.com/profile.php?id=100075502165014"
              >Facebook</a
            >
          </v-row>
          <v-row class="padd">
            <v-icon>mdi-whatsapp</v-icon
            ><a
              href="https://api.whatsapp.com/send?phone=2028742080&text= [ສະບາຍດີ.!! ພວກເຮົາມີຄຳປຶກສາກ່ຽວກັບເຮືອນ ຢາກໃຫ້ທ່ານຊ່ວຍປຶກສາ] "
              >whatsapp</a
            >
          </v-row>
          <v-row class="padd">
            <v-icon>mdi-phone</v-icon><a>call: 020-28-742-080</a>
          </v-row>
          <v-row class="padd">
            <v-icon>mdi-email</v-icon><a>Email: vasengchuoyee@gmail.com</a>
          </v-row>
          <v-row class="padd">
            <v-icon>mdi-map-marker</v-icon
            ><a
              href="https://www.google.com/maps/place/%E0%BA%A1%E0%BA%B0%E0%BA%AB%E0%BA%B2%E0%BA%A7%E0%BA%B4%E0%BA%97%E0%BA%B0%E0%BA%8D%E0%BA%B2%E0%BB%84%E0%BA%A5%E0%BA%AA%E0%BA%B8%E0%BA%9E%E0%BA%B2%E0%BA%99%E0%BA%B8%E0%BA%A7%E0%BA%BB%E0%BA%87/@19.8931704,101.7727633,10.25z/data=!4m10!1m2!2m1!1ssuophanuvong+university!3m6!1s0x312ed63d67736b31:0x7c260ec78a32d98b!8m2!3d19.9218398!4d102.1869784!15sChdzdW9waGFudXZvbmcgdW5pdmVyc2l0eZIBBnNjaG9vbOABAA!16s%2Fm%2F0h3lx_r?entry=ttu"
              >Location</a
            >
          </v-row>
          <p>
            ບໍລິສັດ ອອກແບບຮັບເໝົ່າກໍ່ສ້າງ ຂອງພວກເຮົາຕັ້ງຢູ່ ບ້ານ
            ດອນໃໝ່,ເສັ້ນທາງເລກທີ13 ເໜືອ, ມະຫາວິທະຍາໄລ ສຸພານຸວົງ
          </p>
        </v-col>
      </v-row> </v-col
    ><br />
    <v-col cols="12" sm="12" class="text-center">
      <div>
        <hr />
        <div>
          {{ new Date() }}
        </div>
        <div>
          {{ new Date().getFullYear() }} — <strong>@VASENG CHUOYEE</strong>
        </div>
      </div>
    </v-col>

    <div class="text-center">
      <v-rating v-model="rating" hover half-increments></v-rating>
      <pre>{{ rating }}</pre>
    </div>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    rating: 2.5,
  }),
};
</script>

<style scoped>
.footer-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.padd {
  margin: 8px;
  display: flex;
  align-items: center;
}

@media (max-width: 412px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
  }

  .avatars {
    flex-direction: column;
    font-size: 8px;
    width: 80px;
    height: auto;
    display: flex;
    text-align: center;
    margin-left: 40px;
  }
}
</style>
