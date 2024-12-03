<script setup>
const currentPageModel = defineModel();

const {totalPages, globalDisable} = defineProps({
  totalPages: Number,
  globalDisable: Boolean
});
</script>

<template>
  <div class="text-center">
    <v-container class="pt-0">
      <v-row justify="center">
        <v-col
            cols="12"
            md="8"
        >
          <v-container class="max-width pt-1">
            <v-pagination
                v-model="currentPageModel"
                :length="totalPages"
                :disabled="globalDisable"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>>