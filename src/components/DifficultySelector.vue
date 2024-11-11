<template>
  <div class="difficulty-selector">
    <label for="difficulty">{{ $t("quizApp.difficulty") }}</label>
    <select
      id="difficulty"
      v-model="selectedDifficulty"
      @change="updateDifficulty"
    >
      <option value="easy">{{ $t("quizApp.easy") }}</option>
      <option value="medium">{{ $t("quizApp.medium") }}</option>
      <option value="hard">{{ $t("quizApp.hard") }}</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return { selectedDifficulty: "medium" };
  },
  methods: {
    updateDifficulty() {
      this.$emit("selectDifficulty", this.selectedDifficulty);
    },
  },
};
</script>
