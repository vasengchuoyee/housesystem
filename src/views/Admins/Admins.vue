<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list dense>
        <v-list-item>
          <a href="/">
            <v-img src="iimg.png" class="logos"></v-img>
            <h3 @mouseover="showTooltip" @mouseout="hideTooltip">
              House System
            </h3>
          </a>
        </v-list-item>

        <v-list-item-group v-model="selectedTab">
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            @click="changePage(item.page)"
          >
            <v-row>
              <v-col>
                <v-list-item-icon>
                  <v-icon :color="item.color">{{ item.icon }}</v-icon>
                </v-list-item-icon>
              </v-col>
              <v-col class="side_bar">
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-window v-model="selectedTab">
        <v-window-item
          v-for="(component, index) in components"
          :key="index"
          :value="index"
        >
          <component :is="component" />
        </v-window-item>
      </v-window>
    </v-main>
  </v-app>
</template>

<script>
import Admins_chil from "../../components/Admins-page/Admins_chil.vue";
import House_up from "../../components/Admins-page/House_up.vue";
import user from "../../components/Admins-page/user.vue";
import saler from "../../components/Admins-page/saler.vue";
import chart from "../../components/Admins-page/chart.vue";

export default {
  name: "Admins",
  components: {
    Admins_chil,
    House_up,
    user,
    saler,
    chart,
  },
  data: () => ({
    selectedTab: 0,
    isTooltipVisible: false,
    menuItems: [
      { title: "Dashboard", icon: "mdi-monitor", color: "blue", page: 0 },
      { title: "House Upload", icon: "mdi-console", color: "green", page: 1 },
      {
        title: "Users",
        icon: "mdi-account-multiple-outline",
        color: "red",
        page: 2,
      },

      {
        title: "Selling",
        icon: "mdi-cart-outline",
        color: "orange",
        page: 3,
      },
      { title: "Orther", icon: "mdi-web", color: "blue", page: 4 },
      { title: "Profiles", icon: "mdi-account", color: "default", page: 5 },
    ],
    components: [Admins_chil, House_up, user, saler, chart],
  }),
  methods: {
    changePage(page) {
      this.selectedTab = page;
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

<style scoped>
.v-navigation-drawer {
  width: 250px;
}

h3 {
  color: green;
}

.v-list-item {
  cursor: pointer;
}

.logos {
  width: 100px;
  height: auto;
}

.side_bar {
  margin-left: -180px;
}

.side_bar :hover {
  color: orange;
}
</style>
