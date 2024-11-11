<template>
  <div class="quiz-item">
    <h3>{{ quiz.category }}</h3>
    <p>{{ quiz.description }}</p>
    <button @click="goToQuiz">{{ $t("quizApp.startQuiz") }}</button>
  </div>
</template>

<script>
export default {
  props: {
    quiz: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  methods: {
    goToQuiz() {
      console.log("Navigating to category:", this.quiz.id);
      this.$router.push(`/quiz/${String(this.quiz.id)}`);
    },
  },
};
</script>
