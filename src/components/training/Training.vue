<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

import api from "@/api/axios.js";
import TrainingCard from "@/components/training/cards/TrainingCard.vue";
import SchedulesBlock from "@/components/training/blocks/SchedulesBlock.vue";

// Маршрутизация
const router = useRouter();
const route = useRoute();

const globalDisable = ref(true);

// Данные от сервера
const training = reactive({
  fields: {}
});

const checkRegister = ref(false);

// Получение абонемента
const getTraining = async (id) => {
  try {
    const response = await api.get(`/trainings/${id}`);

    return response.data.training;

  } catch (error) {
    if (error.response?.status === 401) {
      await router.push({
        name: "login"
      });

    } else {
      await router.push({
        name: "trainings"
      });
    }
  }
};

// Проверка, куплен ли
const checkRegisterForTraining = async (trainingId) => {
  try {
    const response = await api.post("/training-registrations/check", {trainingId});

    return response.data["is_registered"];

  } catch (error) {
    if (error.response?.status === 401) {
      await router.push({
        name: "login"
      });

    } else {
      await router.push({
        name: "trainings"
      });
    }
  }
};

// Логика загрузки данных карточки
const updateCard = async () => {
  globalDisable.value = true;

  const trainingId = route.params.id;

  checkRegister.value = await checkRegisterForTraining(trainingId);

  training.fields = await getTraining(trainingId);

  globalDisable.value = false;
};

onMounted(async () => {
  await updateCard();
});


// Запрос регистрации на тренировку
const createTrainingRegistration = async (trainingId, serverError) => {
  try {
    const response = await api.post(`/training-registrations/register`, {trainingId});

    await updateCard();

  } catch (error) {
    if (error.response?.status === 401) {
      await router.push({
        name: "login"
      });

    } else if (error.response?.status === 403) {
      await router.push({
        name: "trainings"
      });

    } else if (error.response?.status === 422) {
      serverError.value = error.response.data.message;

    } else {
      serverError.value = "Try again later";
    }
  }
};

const serverError = ref("");

// Регистрация на тренировку
const register = async () => {
  globalDisable.value = true;

  serverError.value = "";

  const membershipId = route.params.id;

  await createTrainingRegistration(membershipId, serverError);

  globalDisable.value = false;
};


// Запрос отписки от тренировки
const deactivateTrainingRegistration = async (trainingId) => {
  try {
    const response = await api.post(`/training-registrations/deactivate`, {trainingId});

    await router.push({
      name: "trainings"
    });

  } catch (error) {
    if (error.response?.status === 401) {
      await router.push({
        name: "login"
      });

    } else if (error.response?.status === 422) {
      serverError.value = error.response.data.message;

    } else {
      serverError.value = "Try again later";
    }
  }
};

// Отписка от тренировки
const deactivate = async () => {
  globalDisable.value = true;

  const membershipId = route.params.id;

  await deactivateTrainingRegistration(membershipId, serverError);

  globalDisable.value = false;
};
</script>

<template>
  <div class="training-container pa-2">
    <template v-if="Object.keys(training.fields).length">
      <TrainingCard
          :training="training.fields"
          :global-disable="globalDisable"
          :loading="globalDisable"
          :large-description="true"
          :card-height="'auto'"
          :card-max-width="'450'"
      >
        <template #button-action>
          <v-card-actions class="d-flex flex-column">
            <p class="text-red text-center mb-1">
              {{ serverError }}
            </p>

            <template v-if="checkRegister">
              <v-btn
                  color="orange-darken-2"
                  text="Unsubscribe"
                  block
                  variant="flat"
                  @click="deactivate"
              >
              </v-btn>
            </template>
            <template v-else>
              <v-btn
                  color="orange-darken-2"
                  text="Register"
                  block
                  variant="flat"
                  @click="register"
              >
              </v-btn>
            </template>
          </v-card-actions>
        </template>
      </TrainingCard>
    </template>

    <template v-if="checkRegister">
      <SchedulesBlock/>
    </template>
  </div>
</template>