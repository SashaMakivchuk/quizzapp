import { createStore } from "vuex";

const store = createStore({
  state: {
    user: { name: null },
    selectedCategory: null,
    score: 0,
    difficulty: "medium",
    settings: JSON.parse(localStorage.getItem("settings")) || {
      language: "en",
      theme: "light",
      timer: 30,
    },
    questions: [],
    currentQuestionIndex: 0,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setSelectedCategory(state, category) {
      state.selectedCategory = category;
    },
    setScore(state, score) {
      state.score = score;
    },
    setDifficulty(state, difficulty) {
      state.difficulty = difficulty;
    },
    setSettings(state, settings) {
      state.settings = settings;
      localStorage.setItem("settings", JSON.stringify(settings));
    },
    setQuestions(state, questions) {
      state.questions = questions;
    },
    setCurrentQuestionIndex(state, index) {
      state.currentQuestionIndex = index;
    },
  },
  actions: {
    async fetchQuestions({ commit, state }, category) {
      const url = `https://opentdb.com/api.php?amount=15&category=${category}&difficulty=${state.difficulty}&type=multiple`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("API Response:", data);
        const questions = data.results.map((question) => {
          const allAnswers = [
            ...question.incorrect_answers,
            question.correct_answer,
          ];
          allAnswers.sort(() => Math.random() - 0.5);
          return { ...question, answers: allAnswers };
        });
        commit("setQuestions", questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    },
    saveSettings({ commit }, settings) {
      commit("setSettings", settings);
    },
  },
});

export default store;
