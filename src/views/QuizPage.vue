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
      // Reset the timer to the initial time
      if (this.$refs.timer) {
        console.log("Resetting Timer...");
        this.$refs.timer.resetTimer(); // Reset the timer for the next question
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
      // Ensure `questions` and `currentQuestion` are defined before proceeding
      if (!this.questions || !this.currentQuestion) {
        console.warn("Questions or current question is undefined.");
        return;
      }

      const currentIndex = this.questions.indexOf(this.currentQuestion);

      // If currentIndex is -1, it means `currentQuestion` is not found in `questions`
      if (currentIndex === -1) {
        console.warn("Current question not found in question list.");
        return;
      }

      // Check if there are more questions
      if (currentIndex < this.questions.length - 1) {
        // Move to the next question
        this.currentQuestion = this.questions[currentIndex + 1];
        this.answered = false; // Reset answered state
        this.resetTimer();
      } else {
        // If no more questions, complete the quiz
        this.completeQuiz();
      }
    },
    completeQuiz() {
      // Handle quiz completion, e.g., show results or navigate to another page
      console.log("Quiz completed!");
      this.$router.push("/results"); // Redirect to a results page
    },
    onTimeout() {
      console.log("Timeout reached");
      if (!this.answered && this.currentQuestion) {
        this.submitAnswer(null); // Submits a `null` answer if unanswered
      }
      this.nextQuestion();
    },
  },
};
</script>
