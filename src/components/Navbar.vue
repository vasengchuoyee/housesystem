<template>
  <v-app-bar class="Nav-respon">
    <v-row align="center">
      <v-col cols="auto">
        <v-img src="iimg.png" class="logos"></v-img>
      </v-col>
      <v-col class="" cols="12" sm="6" md="6">
        <v-card-text>
          <v-text-field
            :loading="loading"
            density="compact"
            variant="solo"
            label="ຄົ້ນຫາແບບເຮືອນ..."
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:append-inner="onClick"
            class="search-width"
          ></v-text-field>
        </v-card-text>
      </v-col>
    </v-row>

    <div class="text-center">
      <v-menu open-on-hover open-on-click transition="fab-transition">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            Menu
            <v-icon>mdi-chevron-double-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <h4 @click="scroll('0000')">ເຮືອນຊັ້ນໜຶ່ງ</h4>
              <hr />
              <h4 @click="scroll('1111')">ເຮືອນສອງຊັ້ນ</h4>
              <hr />
              <h4 @click="scroll('2222')">ເຮືອນຫຼູບ</h4>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-menu open-on-hover open-on-click>
      <template v-slot:activator="{ props }">
        <v-btn color="black" v-bind="props">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item class="colors">
          <router-link to="/register"><h3>- Register</h3></router-link>
          <hr />
          <router-link to="/logins"><h3>- Login</h3></router-link>
          <hr />
          <router-link to="/admins"><h3>- Admin</h3></router-link>
          <hr />
          <router-link to="/Setting"><h3>- Setting</h3></router-link>
          <hr />
          <router-link to="/Setting"><h3>- Favorite</h3></router-link>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    scroll(refName) {
      const element = document.getElementById(refName);
      element.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
h4 {
  cursor: pointer;
}

h4:hover {
  color: orange;
}

.bg-yellow {
  margin-top: 18px;
}

.search-width {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.logos {
  width: 60px;
  height: auto;
  margin-left: 20px;
}
.Nav-respon {
  background: linear-gradient(
    0deg,
    rgb(252, 251, 251) 0%,
    rgb(248, 149, 1) 50%
  );
}

@media (max-width: 400px) {
  .Nav-respon {
    font-size: 12px;
    display: flex;
  }
  .search-width {
    width: 80%;
    max-width: 200px;
  }

  .logos {
    width: 40px;
    margin-left: 10px;
  }
}
</style>
