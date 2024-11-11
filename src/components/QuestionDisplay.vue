<template>
  <div class="question" v-if="question">
    <p>{{ decodeHtmlEntities(question.question) }}</p>
    <button
      class="answer-option"
      v-for="answer in question.answers"
      :key="answer"
      @click="$emit('submitAnswer', answer)"
    >
      {{ decodeHtmlEntities(answer) }}
    </button>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: false,
      default: () => null,
    },
  },
  methods: {
    decodeHtmlEntities(str) {
      const doc = new DOMParser().parseFromString(str, "text/html");
      return doc.documentElement.textContent;
    },
  },
  computed: {
    allAnswers() {
      if (this.question) {
        const answers = [
          ...this.question.incorrect_answers,
          this.question.correct_answer,
        ];
        return answers.sort(() => Math.random() - 0.5);
      }
      return [];
    },
  },
};
</script>
