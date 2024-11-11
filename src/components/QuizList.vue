<template>
  <div class="quiz-list">
    <QuizItem
      v-for="quiz in quizzes"
      :key="quiz.id"
      :quiz="quiz"
      @selectQuiz="selectQuiz"
    />
  </div>
</template>

<script>
import QuizItem from "./QuizItem.vue";

export default {
  components: {
    QuizItem,
  },
  props: {
    quizzes: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    selectQuiz(quizId) {
      this.$emit("quizSelected", quizId);
    },
  },
};
</script>
