<template>
  <div>
    <TimerItem ref="timer" :initialTime="settings.timer" @timeout="onTimeout" />
    <QuestionDisplay :question="currentQuestion" @submitAnswer="submitAnswer" />
    <button class="submit-btn" v-if="answered" @click="nextQuestion">✅</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TimerItem from "@/components/TimerItem.vue";
import QuestionDisplay from "@/components/QuestionDisplay.vue";

export default {
  components: { TimerItem, QuestionDisplay },
  props: ["category"],
  data() {
    return { questions: [], currentQuestion: null, answered: false };
  },
  computed: { ...mapState(["settings"]) },
  async created() {
    try {
      await this.$store.dispatch("fetchQuestions", this.category);
      this.questions = this.$store.state.questions;
      if (this.questions && this.questions.length > 0) {
        this.currentQuestion = this.questions[0];
      } else {
        console.error("No questions available.");
        this.$router.push("/");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      this.$router.push("/");
    }
  },

  methods: {
    resetTimer() {
      if (this.$refs.timer) {
        console.log("Resetting Timer...");
        this.$refs.timer.resetTimer();
      }
    },
    submitAnswer(selectedAnswer) {
      console.log("submitAnswer triggered");
      if (
        this.currentQuestion &&
        selectedAnswer === this.currentQuestion.correct_answer
      ) {
        this.$store.commit("setScore", this.$store.state.score + 1);
      }
      this.answered = true;
    },

    nextQuestion() {
      console.log("nextQuestion triggered");
      if (!this.questions || !this.currentQuestion) {
        console.warn("Questions or current question is undefined.");
        return;
      }

      const currentIndex = this.questions.indexOf(this.currentQuestion);

      if (currentIndex === -1) {
        console.warn("Current question not found in question list.");
        return;
      }

      if (currentIndex < this.questions.length - 1) {
        this.currentQuestion = this.questions[currentIndex + 1];
        this.answered = false;
        this.resetTimer();
      } else {
        this.completeQuiz();
      }
    },
    completeQuiz() {
      console.log("Quiz completed!");
      this.$router.push("/results");
    },
    onTimeout() {
      console.log("Timeout reached");
      if (!this.answered && this.currentQuestion) {
        this.submitAnswer(null);
      }
      this.nextQuestion();
    },
  },
};
</script>
