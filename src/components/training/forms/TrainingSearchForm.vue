<script setup>
import {reactive} from "vue";
import SearchForm from "@/components/ui/forms/SearchForm.vue";

const {globalDisable} = defineProps({
  globalDisable: Boolean
});

const sortItems = reactive([
  {value: "default", title: "Default"},
  {value: "name", title: "Name"},
  {value: "trainer", title: "Trainer"}
]);

const filterItems = reactive([
  {value: "default", title: "Default"},
  {value: "individual", title: "Individual"},
  {value: "group", title: "Group"}
]);

const emit = defineEmits(['search']);

const search = (page, sort, filter, search) => {
  emit('search', page, sort, filter, search);
};
</script>

<template>
  <SearchForm
      :global-disable="globalDisable"
      :sort-items="sortItems"
      :filter-items="filterItems"
      @search="search"
  />
</template>