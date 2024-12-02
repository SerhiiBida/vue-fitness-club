<script setup>
import {nextTick, onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

import ScheduleCard from "@/components/training/cards/ScheduleCard.vue";
import api from "@/api/axios.js";
import MembershipCard from "@/components/training/cards/MembershipCard.vue";

const route = useRoute();
const router = useRouter();

const globalDisable = ref(true);

// Пагинация
const schedulesContainer = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const isOldPagination = ref(true);

// Все расписания
const schedules = reactive({
  items: []
});

// Параметры для получения данных через API
const params = reactive({
  trainingId: route.params.id,
  page: null,
  perPage: 3, // Карточек на страницу
});

// Запрос на получение данных
const getSchedulesPagination = async () => {
  try {
    const response = await api.get("/schedules/by-user", {
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

    } else if (error.response?.status === 403) {
      await router.push({
        name: "trainings"
      });

    } else {
      return {};
    }
  }
};

// Получение данных
const loadingData = async (page) => {
  globalDisable.value = true;

  // Прокручиваем страницу вверх
  await nextTick(() => {
    schedulesContainer.value.scrollIntoView({behavior: 'smooth'});
  });

  params.page = page;

  // Запрос получения данных
  const schedulesData = await getSchedulesPagination();

  schedules.items = schedulesData['data'] ?? [];

  // Обновление пагинации
  currentPage.value = schedulesData['current_page'] ?? 1;
  totalPages.value = schedulesData['last_page'] ?? 1;

  globalDisable.value = false;
};

onMounted(async () => {
  await loadingData(1);
});

// Наблюдаем за переходом на другую страницу
watch(currentPage, async (newPage, oldPage) => {
  if (isOldPagination.value) {
    isOldPagination.value = false;

    await loadingData(newPage);

    isOldPagination.value = true;
  }
});
</script>

<template>
  <section
      ref="schedulesContainer"
      class="schedules-container"
  >
    <p class="text-h5 text-center pt-2">
      Schedules
    </p>

    <!--Расписания-->
    <template v-if="schedules.items.length">
      <v-container class="schedules-items">
        <template v-for="schedule in schedules.items" :key="schedule.id">
          <ScheduleCard :schedule="schedule" :global-disable="globalDisable"/>
        </template>
      </v-container>
    </template>
    <template v-else>
      <div class="py-5">
        <p class="text-h4 text-center">
          No schedule yet.
        </p>
      </div>
    </template>

    <!--Пагинация-->
    <div v-if="totalPages > 1" class="text-center">
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
  </section>
</template>