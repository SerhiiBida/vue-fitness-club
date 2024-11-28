<script setup>
import {reactive} from "vue";
import SearchForm from "@/components/ui/forms/SearchForm.vue";

const {globalDisable} = defineProps({
  globalDisable: Boolean
});

const sortItems = reactive([
  {value: "default", title: "Default"},
  {value: "name", title: "Name"},
  {value: "discounted_price", title: "Price"},
  {value: "validity_days", title: "Validity Days"},
  {value: "bonuses", title: "Bonus"}
]);

const filterPriceItems = reactive([
  {value: "default", title: "Default"},
  {value: 0, title: "0 - 99$"},
  {value: 1, title: "100$ -499$"},
  {value: 2, title: "500$ - 999$"},
  {value: 3, title: "1000$+"}
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
      :filter-items="filterPriceItems"
      @submit="search"
  />
</template>