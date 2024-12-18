<script setup>
import {nextTick, onMounted, reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";

import api from "@/api/axios.js";
import TrainingSearchForm from "@/components/training/forms/TrainingSearchForm.vue";
import TrainingCard from "@/components/training/cards/TrainingCard.vue";

const router = useRouter();

// Глобальное закрытие доступа к отправкам запросов
const globalDisable = ref(false);

// Пагинация
const trainingsContainer = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const isOldPagination = ref(true);

// Все абонементы
const trainings = reactive({
  items: []
});

// Параметры для получения данных через API
const params = reactive({
  sort: null,
  filter: null,
  search: null,
  page: null,
  perPage: 20, // Карточек на страницу
});

// Запрос на получение данных
const getTrainingsPagination = async () => {
  try {
    const response = await api.get("/trainings/search", {
      params: {
        ...params
      }
    });

    return response.data;

  } catch (error) {
    if (error.response?.status === 401) {
      await router.push({
        name: "login"
      });

    } else {
      return {};
    }
  }
};

// Запуск поиска формы(или данных)
const search = async (page = 1, sort = null, filter = null, search = null) => {
  globalDisable.value = true;

  // Прокручиваем страницу вверх
  await nextTick(() => {
    trainingsContainer.value.scrollIntoView({behavior: 'smooth'});
  });

  params.page = page;

  if (sort !== null) {
    params.sort = sort;
  }

  if (filter !== null) {
    params.filter = filter;
  }

  if (search !== null) {
    params.search = search;
  }

  // Запрос получения данных
  const trainingsData = await getTrainingsPagination();

  trainings.items = trainingsData['data'] ?? [];

  // Обновление пагинации
  currentPage.value = trainingsData['current_page'] ?? 1;
  totalPages.value = trainingsData['last_page'] ?? 1;

  globalDisable.value = false;
};

onMounted(async () => {
  await search(1);
});

// Наблюдаем за переходом на другую страницу
watch(currentPage, async (newPage, oldPage) => {
  if (isOldPagination.value) {
    isOldPagination.value = false;

    await search(newPage);

    isOldPagination.value = true;
  }
});
</script>

<template>
  <div
      ref="trainingsContainer"
      class="trainings-container"
  >
    <!--Форма фильтрации, сортировки, поиска-->
    <TrainingSearchForm :global-disable="globalDisable" @search="search"/>

    <!--Карточки-->
    <template v-if="trainings.items.length > 0">
      <v-container>
        <v-row>
          <v-col
              v-for="training in trainings.items"
              :key="training.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
          >
            <TrainingCard :training="training" :global-disable="globalDisable"/>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-else>
      <div class="d-flex justify-center align-center flex-column trainings-not-found">
        <p class="text-h4 text-center">
          Nothing found.
        </p>
      </div>
    </template>

    <!--Пагинация-->
    <div class="text-center">
      <v-container class="pt-0">
        <v-row justify="center">
          <v-col
              cols="12"
              md="8"
          >
            <v-container class="max-width pt-1">
              <v-pagination
                  v-model="currentPage"
                  :length="totalPages"
                  :disabled="globalDisable"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>