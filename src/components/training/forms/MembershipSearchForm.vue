<script setup>

</script>

<template>
  <v-container
      class="mx-auto"
  >
    <div class="d-flex justify-space-around ga-2">
      <v-select
          label="Sort"
          :items="['name', 'price', 'bonuses']"
          variant="outlined"
      >
      </v-select>

      <v-select
          label="Filter"
          :items="['name', 'price', 'bonuses']"
          variant="outlined"
      >
      </v-select>

      <v-text-field
          label="Search"
          variant="outlined"
      >
      </v-text-field>

      <v-btn
          color="orange-darken-2"
          icon="mdi-magnify"
          text="Buy"
          variant="flat"
          class="mt-1"
      >
      </v-btn>
    </div>
  </v-container>
</template>