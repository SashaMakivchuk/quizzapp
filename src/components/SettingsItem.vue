<template>
  <div class="settings">
    <label>
      {{ $t("quizApp.language") }}
      <select
        v-model="settings.language"
        @change="changeLanguage(settings.language)"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="es">Español</option>
        <option value="uk">Українська</option>
      </select>
    </label>
    <label>
      {{ $t("quizApp.timer") }}
      <input
        type="range"
        v-model="settings.timer"
        min="10"
        max="60"
        @change="saveSettings"
      />
    </label>
    <label>
      {{ $t("quizApp.theme") }}
      <select v-model="settings.theme" @change="saveSettings">
        <option value="light">{{ $t("quizApp.light") }}</option>
        <option value="dark">{{ $t("quizApp.dark") }}</option>
      </select>
    </label>
    <button @click="$emit('close')">❌</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: { ...mapState(["settings"]) },
  methods: {
    saveSettings() {
      this.$store.dispatch("saveSettings", this.settings);
    },
    changeLanguage(language) {
      this.$i18n.locale = language;
      this.saveSettings();
    },
  },
};
</script>
