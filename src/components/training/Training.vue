<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

import api from "@/api/axios.js";
import {useUserStore} from "@/stores/user.js";
import TrainingCard from "@/components/training/cards/TrainingCard.vue";

// Пользователь
const userStore = useUserStore();

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
const checkRegisterForTraining = async (userId, trainingId) => {
  try {
    const response = await api.post("/training-registration/check", {userId, trainingId});

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

  const userId = userStore.user.id;
  const trainingId = route.params.id;

  checkRegister.value = await checkRegisterForTraining(userId, trainingId);

  training.fields = await getTraining(trainingId);

  globalDisable.value = false;
};

onMounted(async () => {
  await updateCard();
});


// Запрос регистрации на тренировку
const createTrainingRegistration = async (userId, trainingId, serverError) => {
  try {
    const response = await api.post(`/training-registration/register`, {userId, trainingId});

    await updateCard();

    checkRegister.value = true;

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

  const userId = userStore.user.id;
  const membershipId = route.params.id;

  await createTrainingRegistration(userId, membershipId, serverError);

  globalDisable.value = false;
};
</script>

<template>
  <div class="training-container">
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
          <template v-if="checkRegister">
            <v-card-actions>
              <v-btn
                  color="orange-darken-2"
                  text="Already registered"
                  block
                  variant="flat"
                  @click="router.push({name: 'profile'})"
              >
              </v-btn>
            </v-card-actions>
          </template>
          <template v-else>
            <v-card-actions class="d-flex flex-column">
              <p class="text-red text-center mb-1">
                {{ serverError }}
              </p>

              <v-btn
                  color="orange-darken-2"
                  text="Register"
                  block
                  variant="flat"
                  @click="register"
              >
              </v-btn>
            </v-card-actions>
          </template>
        </template>
      </TrainingCard>
    </template>
  </div>
</template>