<template>
  <div class="timer-circle">
    <svg class="progress-ring" width="50" height="50">
      <circle
        ref="progressCircle"
        class="progress-ring__circle"
        stroke="#76c7c0"
        stroke-width="8"
        fill="transparent"
        r="52"
        cx="60"
        cy="60"
      />
    </svg>
    <div class="time-left">{{ timeLeft }}s</div>
  </div>
</template>

<script>
export default {
  props: ["initialTime"],
  data() {
    return {
      timeLeft: this.initialTime,
      circumference: 2 * Math.PI * 52,
    };
  },
  mounted() {
    this.startTimer();
  },
  watch: {
    timeLeft() {
      this.updateCircle();
    },
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
    updateCircle() {
      if (this.$refs.progressCircle) {
        const offset =
          this.circumference * (1 - this.timeLeft / this.initialTime);
        this.$refs.progressCircle.style.strokeDashoffset = offset;
      }
    },
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped lang="scss">
.timer-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 120px;
  height: 120px;

  .time-left {
    position: absolute;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  .progress-ring {
    transform: rotate(-90deg); // Rotate to start from the top
  }

  .progress-ring__circle {
    transition: stroke-dashoffset 1s linear;
    stroke-dasharray: 326.725; // circumference of the circle (2 * π * radius)
  }
}
</style>
