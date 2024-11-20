<script setup>
import {reactive} from "vue";

const props = defineProps({
  globalDisable: Boolean
});

const form = reactive({
  sort: "",
  filter: "",
  search: ""
});

// Поиск
const search = async () => {

};
</script>

<template>
  <v-form
      ref="formRef"
      action="#"
      method="get"
      class="membership-search-form"
      @submit.prevent="search"
  >
    <v-container
        class="mx-auto pb-0"
    >
      <v-row>
        <v-col
            class="pb-0"
            cols="12"
            sm="4"
        >
          <v-select
              v-model="form.sort"
              label="Sort"
              :items="['name', 'price', 'bonuses']"
              variant="outlined"
          >
          </v-select>
        </v-col>

        <v-col
            class="pb-0"
            cols="12"
            sm="4"
        >
          <v-select
              v-model="form.filter"
              label="Filter"
              :items="['name', 'price', 'bonuses']"
              variant="outlined"
          >
          </v-select>
        </v-col>

        <v-col
            class="d-flex ga-1 pb-0"
            cols="12"
            sm="4"
        >
          <v-text-field
              v-model="form.search"
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
              type="submit"
              :disabled="globalDisable"
          >
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>