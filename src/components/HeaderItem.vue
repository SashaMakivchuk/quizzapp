<template>
  <header>
    <h1>{{ $t("quizApp.title") }}</h1>
    <button class="settings-toggle-btn" @click="$emit('openSettings')">
      {{ $t("quizApp.settings") }}
    </button>
  </header>
</template>

<script>
export default {};
</script>
