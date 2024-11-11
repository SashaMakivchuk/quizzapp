<template>
  <div>{{ timeLeft }}</div>
</template>

<script>
export default {
  props: ["initialTime"],
  data() {
    return {
      timeLeft: this.initialTime,
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.$emit("timeout");
          clearInterval(this.interval);
        }
      }, 1000);
    },
    resetTimer() {
      console.log("resetTimer called");
      clearInterval(this.interval);
      this.timeLeft = this.initialTime;
      this.startTimer();
    },
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>
