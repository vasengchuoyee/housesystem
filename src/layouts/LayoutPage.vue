<template>
  <div class="wrapper">
    <v-app-bar>
      <v-row class="respons" no-gutters>
        <RouterLink to="/" class="title-link">
          <h2 class="title">YATU Teams Designer</h2>
        </RouterLink>

        <v-spacer />

        <!-- Desktop Menu -->
        <v-col class="hide-on-small d-none d-md-flex menu-desktop">
          <v-btn text @click="goToSection('/')">{{ $t("Home") }}</v-btn>
          <RouterLink to="/cumstom"
            ><v-btn text>{{ $t("Products") }}</v-btn></RouterLink
          >
          <v-btn text @click="goToSection('/#work')">{{ $t("Work") }}</v-btn>
          <v-btn text @click="goToSection('/#contact')">{{
            $t("Contact")
          }}</v-btn>
         
        </v-col>
        <RouterLink to="/register"
            ><v-btn>{{ $t("Register") }}</v-btn></RouterLink
          >

        <!-- Mobile Menu -->
        <v-col class="d-md-none mobile-menu">
          <v-btn icon @click.stop="menuVisible = !menuVisible">
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-btn>
          <v-menu
            v-model="menuVisible"
            :close-on-content-click="true"
            transition="slide-y-transition"
            offset-y
            max-width="250"
          >
            <v-list>
              <v-list-item
                v-for="item in menuItems"
                :key="item.path"
                @click="goToSection(item.path)"
              >
                <v-list-item-title>
                  <v-icon :color="item.color" left small>{{
                    item.icon
                  }}</v-icon>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>

        <!-- Language Toggle -->
        <v-col class="lang-cols">
          <v-btn @click="toggleLanguage" class="language-btn">
            <v-row align="center" no-gutters>
              <v-img
                :src="$i18n.locale === 'la' ? '/usa.png' : '/laos.png'"
                :alt="$i18n.locale === 'la' ? 'English Flag' : 'Lao Flag'"
                :title="$i18n.locale === 'la' ? 'English' : 'Laos'"
                class="flag-img"
              />
              <p class="lang-text d-none d-md-flex">
                {{ $i18n.locale === "la" ? "EN" : "LAO" }}
              </p>
            </v-row>
          </v-btn>
        </v-col>

        <!-- Contact Info (Moved to a v-col and aligned right) -->
        <v-col class="d-none d-md-flex" cols="auto">
          <a
            href="https://www.facebook.com/profile.php?id=100075502165014"
            target="_blank"
          >
            <v-icon class="face">mdi-facebook</v-icon>
          </a>
          <v-icon class="phone-icon">mdi-phone-in-talk</v-icon>
          <span class="phone-number">+856 20 28742080</span>
        </v-col>
      </v-row>
    </v-app-bar>

    <slot></slot>

    <v-footer class="footer" padless>
      <v-container>
        <v-row justify="center" class="footer-content">
          <v-col cols="12" md="6" class="team-section">
            <v-img src="iimg.png" max-width="80" class="team-logo" contain />
            <span class="team-title">Our Team</span>
            <v-row>
              <v-col
                v-for="member in teamMembers"
                :key="member.name"
                cols="6"
                sm="3"
              >
                <v-img :src="member.img" class="team-img" contain />
                <p class="member-name">{{ member.name }}</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" class="text-start">
            <div class="contact-list">
              <div
                v-for="contact in contacts"
                :key="contact.icon"
                class="contact-item"
              >
                <v-icon small>{{ contact.icon }}</v-icon>
                <a :href="contact.href" :target="contact.target || '_blank'">{{
                  contact.text
                }}</a>
              </div>
            </div>
            <p class="location-text">
              ທີມງານ YATU ອອກແບບສະຖາປັດຕະຍະກໍາ ແລະ ຕົບແຕ່ງພາຍໃນ
              ຂອງພວກເຮົາຕັ້ງຢູ່ ບ້ານ ດອນໃໝ່, ມ. ໄຊຍະບູລີ, ຂ. ໄຊຍະບູາລີ,
              ເສັ້ນທາງເລກທີ4.
            </p>
          </v-col>
          <v-col cols="12" class="copyright-section">
            <p class="copyright">
              © {{ new Date().getFullYear() }} —
              <strong>@VASENG CHUOYEE</strong>
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuVisible: false,
      menuItems: [
        {
          path: "/",
          title: this.$t("Home"),
          icon: "mdi-home",
          color: "orange",
        },
        {
          path: "/cumstom",
          title: this.$t("Products"),
          icon: "mdi-shopping",
          color: "blue",
        },
        {
          path: "/#work",
          title: this.$t("Work"),
          icon: "mdi-briefcase",
          color: "green",
        },
        {
          path: "/#contact",
          title: this.$t("Contact"),
          icon: "mdi-email",
          color: "yellow",
        },
      ],
      teamMembers: [
        { img: "xaysuoly.jpg", name: "ທ່ານ ອຈ ປທ ສາຍສຮີ ຢ່າງ" },
        { img: "sengpor.jpg", name: "ທ່ານ ປຕ ເຊັ່ງປໍ ຢ່າງ" },
        { img: "leexay.jpeg", name: "ທ່ານ ປຕ ລີຊາຍ ໄຈດວງທໍ່" },
        { img: "mengvaj.jpg", name: "ທ່ານ ປຕ ເມັງວ່າງ ຈົງຕົວ" },
      ],
      contacts: [
        {
          icon: "mdi-facebook",
          href: "https://www.facebook.com/profile.php?id=100075502165014&mibextid=ZbWKwL",
          text: "Facebook",
          target: "_blank",
        },
        {
          icon: "mdi-whatsapp",
          href: "https://api.whatsapp.com/send?phone=2028742080&text=[ສະບາຍດີ.!! ພວກເຮົາມີຄຳປຶກສາກ່ຽວກັບເຮືອນ ຢາກໃຫ້ທ່ານຊ່ວຍປຶກສາ]",
          text: "Whatsapp",
          target: "_blank",
        },
        { icon: "mdi-phone", href: "tel:02028742080", text: "020-28-742-080" },
        {
          icon: "mdi-email",
          href: "mailto:vasengchuoyee@gmail.com",
          text: "vasengchuoyee@gmail.com",
        },
        {
          icon: "mdi-map-marker",
          href: "https://www.google.com/maps/place/...",
          text: "Location",
          target: "_blank",
        },
      ],
    };
  },
  methods: {
    goToSection(section) {
      this.$router.push(section);
      this.menuVisible = false;
    },
    toggleLanguage() {
      this.$i18n.locale = this.$i18n.locale === "en" ? "la" : "en";
    },
  },
};
</script>

<style scoped>
/* Base Styles */
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.respons {
  width: 100%;
  align-items: center;
  max-width: auto;
  margin: 0 auto;
  /* border-radius: 10px; */
  background: linear-gradient(45deg, #ffff, #e0bb03, #ffff);
}

.title {
  font-family: "Times New Roman", Times, serif;
  margin: 0;
  padding: 8px 0;
}

.title-link {
  text-decoration: none;
  color: inherit;
}

.menu-desktop .v-btn {
  text-transform: none;
}

.flag-img {
  border-radius: 50%;
  width: 24px;
  height: 24px;
}

.contact-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
}

.lang-text {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 4px;
}

.footer {
  background: linear-gradient(
    0deg,
    rgb(252, 251, 251) 0%,
    rgb(251, 205, 52) 100%
  );
  margin-top: auto;
}

.team-section {
  text-align: center;
}

.team-title {
  display: block;
  margin: 16px 0;
  font-weight: bold;
  font-size: 18px;
}

.team-img {
  border-radius: 50%;
  border: 2px solid #fff;
  max-width: 60px;
  margin: 0 auto 8px;
  aspect-ratio: 1;
}

.contact-list {
  padding: 16px;
  display: flex;
  justify-content: start;
  flex-direction: column;
  margin-left: 20px;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-item a {
  text-decoration: none;
  color: #1976d2;
}

.contact-item a:hover {
  text-decoration: underline;
}

.location-text {
  text-align: start;
}

.copyright-section {
  text-align: center;
  padding: 16px 0;
}

.face:hover,
.v-btn:hover {
  color: #1976d2;
}

/* Large Screens (Desktop) */
@media (min-width: 960px) {
  .respons {
    padding: 0 32px;
    height: 64px;
  }

  .menu-desktop {
    gap: 16px;
  }

  .lang-col {
    margin-left: 40px;
  }

  .member-name {
    font-size: 12px;
  }

  .location-text {
    font-size: 14px;
  }
}

/* Medium Screens (Tablet) */
@media (max-width: 959px) {
  .respons {
    padding: 8px 16px;
    min-height: 64px;
  }

  .title {
    font-size: 20px;
  }

  .mobile-menu {
    margin-left: auto;
  }
}

/* Small Screens (Mobile) */
@media (max-width: 600px) {
  .respons {
    flex-wrap: wrap;
    padding: 8px;
    gap: 8px;
  }

  .title {
    font-size: 16px;
    width: 100%;
  }

  .mobile-menu {
    order: 1;
  }

  .member-name {
    font-size: 10px;
  }

  .location-text {
    font-size: 12px;
  }
}

/* Extra Small Screens */
@media (max-width: 400px) {
  .title {
    font-size: 14px;
  }

  .member-name {
    font-size: 8px;
  }

  .location-text {
    font-size: 10px;
  }
}
</style>
