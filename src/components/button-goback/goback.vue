<template>
  <div>
    <a
      class="back-to-top"
      @click="scrollToTop"
      :class="{ show: showButton }"
      href="#"
    >
      <div class="arrow"></div>
      <div class="arrow"></div>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showButton: false,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 200) {
        this.showButton = true;
      } else {
        this.showButton = false;
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: -40px;
  right: 40px;
  display: block;
  width: 80px;
  height: 80px;
  line-height: 50px;
  background: orange;
  color: #fff;
  text-align: center;
  text-decoration: none;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.3);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 9;
  transition: all 0.3s;
}

.back-to-top:focus {
  color: #fff;
}

.back-to-top.show {
  bottom: 40px;
  right: 40px;
  opacity: 1;
  transform: scale(1);
}

.back-to-top.show:hover {
  color: #fff;
  bottom: 30px;
  opacity: 1;
}

.arrow {
  background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHN0eWxlPi5zdDB7ZmlsbDojZmZmfTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTMxOS4xIDIxN2MyMC4yIDIwLjIgMTkuOSA1My4yLS42IDczLjdzLTUzLjUgMjAuOC03My43LjZsLTE5MC0xOTBjLTIwLjEtMjAuMi0xOS44LTUzLjIuNy03My43UzEwOSA2LjggMTI5LjEgMjdsMTkwIDE5MHoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzE5LjEgMjkwLjVjMjAuMi0yMC4yIDE5LjktNTMuMi0uNi03My43cy01My41LTIwLjgtNzMuNy0uNmwtMTkwIDE5MGMtMjAuMiAyMC4yLTE5LjkgNTMuMi42IDczLjdzNTMuNSAyMC44IDczLjcuNmwxOTAtMTkweiIvPjwvc3ZnPg==);
  position: absolute;
  width: 12px;
  height: 12px;
  background-size: contain;
  transform: rotate(-90deg);
  top: 30%;
  left: 40%;
}

.arrow:nth-child(2) {
  top: 42%;
}

@keyframes bounceAlpha {
  0% {
    opacity: 1;
    transform: rotate(-90deg) translateX(0px) scale(1);
  }

  25% {
    opacity: 0;
    transform: rotate(-90deg) translateX(10px) scale(0.9);
  }

  26% {
    opacity: 0;
    transform: rotate(-90deg) translateX(-10px) scale(0.9);
  }

  55% {
    opacity: 1;
    transform: rotate(-90deg) translateX(0px) scale(1);
  }
}

.back-to-top:hover .arrow {
  animation-name: bounceAlpha;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.back-to-top:hover .arrow:nth-child(2) {
  animation-name: bounceAlpha;
  animation-duration: 1.4s;
  animation-delay: 0.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@media only screen and (min-width: 360px) {
  .back-to-top {
    width: 60px;
    height: 60px;
    line-height: 20px;
    margin-left: 100px;
  }

  .back-to-top.show {
    bottom: 60px;
    right: 10px;
  }

  .back-to-top.show:hover {
    bottom: 10px;
  }
}
</style>
