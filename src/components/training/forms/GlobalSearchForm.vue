<script setup>

</script>

<template>
  <v-autocomplete
      class="global-search-form mt-5"
      max-width="250"
      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      variant="outlined"
      density="compact"
  >
  </v-autocomplete>
</template>