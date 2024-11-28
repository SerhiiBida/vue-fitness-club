<script setup>
import {onMounted, reactive} from "vue";
import SearchForm from "@/components/ui/forms/SearchForm.vue";
import api from "@/api/axios.js";

const {globalDisable} = defineProps({
  globalDisable: Boolean
});

const sortItems = reactive([
  {value: "default", title: "Default"},
  {value: "name", title: "Name"},
  {value: "trainer", title: "Trainer"}
]);

// Фильтр по названием типов тренировок
const filterItems = reactive([
  {value: "default", title: "Default"},
]);

const getTrainingTypes = async () => {
  try {
    const response = await api.get("/training-types");

    return response.data["is_registered"];

  } catch (error) {
    if (error.response?.status === 401) {
      await router.push({
        name: "login"
      });

    } else {
      await router.push({
        name: "memberships"
      });
    }
  }
};

onMounted(() => {

});

// Запуск поиска
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