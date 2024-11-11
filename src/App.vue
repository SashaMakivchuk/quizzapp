<template>
  <div :class="`app ${theme}`">
    <HeaderItem @openSettings="showSettings = true" />
    <router-view />
    <SettingsItem v-if="showSettings" @close="toggleSettings" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderItem from "./components/HeaderItem.vue";
import SettingsItem from "./components/SettingsItem.vue";

export default {
  components: {
    HeaderItem,
    SettingsItem,
  },
  data() {
    return {
      showSettings: false,
    };
  },
  computed: {
    ...mapState(["settings"]),
    theme() {
      return this.settings.theme || "light";
    },
  },
  watch: {
    theme(newTheme) {
      document.documentElement.setAttribute("data-theme", newTheme);
    },
  },
  created() {
    this.applyTheme();
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    applyTheme() {
      document.documentElement.setAttribute("data-theme", this.theme);
    },
  },
};
</script>
