<template>
  <div class="results-page">
    <h2>{{ $t("quizApp.score") }} {{ score }}</h2>
    <button class="retry-btn" @click="playAgain">
      {{ $t("quizApp.playAgain") }}
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: { ...mapState(["score"]) },
  methods: {
    playAgain() {
      this.$store.commit("setScore", 0);
      this.$router.push("/");
    },
  },
};
</script>
