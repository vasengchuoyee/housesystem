
<!-- TypingText.vue -->
<template>
  <div>
    <span>{{ typedText }}</span><span v-show="showCursor">|</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    typingSpeed: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      currentIndex: 0,
      typedText: "",
      showCursor: true,
      intervalId: null,
    };
  },
  methods: {
    startTyping() {
      this.intervalId = setInterval(this.typeNextCharacter, this.typingSpeed);
    },
    typeNextCharacter() {
      const currentText = this.text;
      if (this.typedText.length < currentText.length) {
        this.typedText += currentText[this.typedText.length];
      } else {
        clearInterval(this.intervalId);
        this.showCursor = false;
        setTimeout(() => {
          this.typedText = "";
          this.currentIndex = 0;
          this.showCursor = true;
          this.startTyping();
        }, 1000); // Wait for 1 second before starting again
      }
    },
  },
  mounted() {
    this.startTyping();
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
/* Add your styling here if needed */
</style>
