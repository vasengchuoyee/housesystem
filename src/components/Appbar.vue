<template>
  <v-app-bar scroll-behavior="hide" class="links" height="40">
    <v-row class="respons">
      <v-col>
        <h2 class="title">Teams Designer</h2>
      </v-col>
      <v-col class="nav_bar_menu">
        <router-link to="/"
          ><v-btn class="text-primary">Home</v-btn></router-link
        >
        <v-btn text @click="scroll('services')" class="text">Services</v-btn>
        <v-btn text @click="scroll('work')" class="text">Work</v-btn>
        <v-btn text @click="scroll('contact')" class="text">Contact</v-btn>
        <v-btn text @click="scroll('footer')" class="text">About</v-btn>
      </v-col>
      <v-col cols="auto" class="contact-info">
        <a href="https://www.facebook.com/profile.php?id=100075502165014">
          <v-icon class="face">mdi-facebook</v-icon>
        </a>
        <v-icon class="mt-1">mdi-phone-in-talk</v-icon>
        <span>+856 20 28742080</span>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    scroll(refName) {
      const element = document.getElementById(refName);
      element.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.title {
  margin-left: 10px;
  font-family: "Tangerine", cursive; 
}

.links {
  display: flex;
  justify-content: flex-end;
}
.respons {
  background: linear-gradient(
    0deg,
    rgb(250, 163, 2) 0%,
    rgb(252, 251, 251) 100%
  );
}

.links v-btn {
  margin-left: 10px;
}

.contact-info {
  margin-top: 6px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: gray;
}

.face:hover {
  color: blue;
}

.text:hover {
  color: blue;
  border-radius: 50px;
}
@media (max-width: 450px) {
  .respons {
    margin-top: 2rem;
    display: flex;
    align-content: center;
    flex-direction: column;
  }
  .links {
    width: 100%;
    display: flex;
  }

  .nav_bar_menu {
    display: flex;
    align-self: start;
  }
  .title {
    display: none;
  }
}

@media (max-width: 600px) {
  .title {
    font-size: 18px;
    margin-left: 20px;
    margin-top: 0px;
  }

  /* .links {
    justify-content: center;
    margin-top: 10px;
    flex-wrap: wrap;
    font-size: 12px;
  }

  .links v-btn {
    margin: 5px;
    font-size: 12px;
  }

  .contact-info {
    justify-content: flex-end;
    margin-top: 10px;
    margin-right: 20px;
  } */
}
</style>
