<template>
  <v-layout class="rounded rounded-md">
    <v-main class="mains">
      <v-row class="mt-8">
        <v-row>
          <h2 class="text-center">ໜ້າຈັດການສິ້ນຄ້າທັງໝົດ</h2>
          <v-col class="lefts">
            <router-link to="/to">
            <v-badge color="#f46" overlap content="2" class="mr-2">
              <v-icon color="#ffff">mdi-heart</v-icon>
            </v-badge>       
           </router-link>

           <router-link to="/to">
            <v-badge color="#f46" overlap content="0" class="mr-2">
              <v-icon color="#ffff" >mdi-bell</v-icon>
            </v-badge>       
           </router-link>
          </v-col>
        </v-row>
      </v-row>

      <v-row>
        <v-col class="widths">
          <v-card class="border">
            <v-div class="top">
              <p>ຍອດຂາຍວັນນີ້</p>
              <b>$53,000</b><br />
              <p><span>+55%</span> since yesterday</p>
            </v-div>
            <v-icon class="margin" color="red">mdi-cards</v-icon>
          </v-card>
        </v-col>

        <v-col class="widths">
          <v-card class="border">
            <v-div class="top">
              <p>ລູກຄ້າ</p>
              <b>2,300</b><br />
              <p><span>+3%</span> since last week</p>
            </v-div>
            <v-icon class="margin" color="green">mdi-human-greeting</v-icon>
          </v-card>
        </v-col>

        <v-col class="widths">
          <v-card class="border">
            <v-div class="top">
              <p>ລາຍການເຮືອນທັງໝົດ</p>
              <b>+3,464</b><br />
              <p><span>-2%</span> since Last quarter</p>
            </v-div>
            <v-icon class="margin" color="blue"
              >mdi-comment-account-outline</v-icon
            >
          </v-card>
        </v-col>

        <v-col class="widths">
          <v-card class="border">
            <v-div class="top">
              <p>ລາຍການຂາຍ</p>
              <b>$103,430</b><br />
              <p><span>+5%</span> than last month</p>
            </v-div>
            <v-icon class="margin" color="orange">mdi-cart</v-icon>
          </v-card>
        </v-col>
      </v-row>

      <v-card style="height: auto; width: 2000px">
        <Usteams />
      </v-card>
      <v-card>
        <chart />
      </v-card>
    </v-main>
  </v-layout>
</template>

<script>
import Usteams from "./Usteams.vue";
import chart from "./chart.vue";

export default {
  name: "Admins",
  components: {
    Usteams,
    chart
  },
  data: () => ({
    loaded: false,
    loading: false,
    isTooltipVisible: false,
  }),

  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },

    showTooltip() {
      this.isTooltipVisible = true;
    },
    hideTooltip() {
      this.isTooltipVisible = false;
    },
  },
};
</script>

<style scoped></style>
