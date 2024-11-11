<template>
  <div>
    <DifficultySelector @selectDifficulty="selectDifficulty" />
    <div class="filter">
      <label for="categoryFilter">{{ $t("quizApp.filter") }}:</label>
      <input
        type="text"
        id="categoryFilter"
        v-model="filterText"
        placeholder="Search categories..."
      />
    </div>
    <div class="categories-section">
      <h2>{{ $t("quizApp.categories") }}</h2>

      <div class="categories">
        <div v-for="quiz in filteredQuizzes" :key="quiz.id" class="category">
          <h3>{{ quiz.name }}</h3>
          <button @click="startQuiz(quiz)">
            {{ $t("quizApp.startQuiz") }}
          </button>
        </div>
      </div>
    </div>
    <SettingsItem v-if="showSettings" @close="showSettings = false" />
  </div>
</template>

<script>
import DifficultySelector from "@/components/DifficultySelector.vue";
import SettingsItem from "@/components/SettingsItem.vue";

export default {
  components: { DifficultySelector, SettingsItem },
  data() {
    return {
      quizzes: [],
      showSettings: false,
      selectedCategory: null,
      filterText: "",
    };
  },
  methods: {
    async fetchQuizzes() {
      const url = "https://opentdb.com/api_category.php";
      const response = await fetch(url);
      const data = await response.json();
      this.quizzes = data.trivia_categories;
    },
    selectDifficulty(difficulty) {
      this.$store.commit("setDifficulty", difficulty);
    },
    startQuiz(category) {
      this.selectedCategory = category;
      this.$router.push(`/quiz/${category.id}`);
    },
  },
  computed: {
    filteredQuizzes() {
      return this.quizzes.filter((quiz) => {
        return quiz.name.toLowerCase().includes(this.filterText.toLowerCase());
      });
    },
  },
  mounted() {
    this.fetchQuizzes();
  },
};
</script>
