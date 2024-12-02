<script setup>

import {ref} from "vue";
import api from "@/api/axios.js";
import {useRoute, useRouter} from "vue-router";

const {visitUser, scheduleId} = defineProps({
  visitUser: Array,
  scheduleId: Number
});

const emit = defineEmits(["updateSchedule"]);

const router = useRouter();
const route = useRoute();

const disable = ref(false);

const serverError = ref("");

const createVisitUser = async () => {
  try {
    const response = await api.post(`/schedules/visit`, {scheduleId});

    emit("updateSchedule");

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
}

// Отметить посещение
const visit = async () => {
  disable.value = true;

  serverError.value = "";

  await createVisitUser();

  disable.value = false;
};

const deleteVisitUser = async () => {
  try {
    const response = await api.post(`/schedules/cancel-visit`, {scheduleId});

    emit("updateSchedule");

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
}

// Удаляем визит user
const cancelVisit = async () => {
  disable.value = true;

  serverError.value = "";

  await deleteVisitUser();

  disable.value = false;
};
</script>

<template>
  <template v-if="visitUser.length">
    <v-btn
        text="Cancel"
        color="red"
        :disabled="disable"
        @click="cancelVisit"
    >
    </v-btn>
  </template>
  <template v-else>
    <v-btn
        text="Visit"
        color="green"
        :disabled="disable"
        @click="visit"
    >
    </v-btn>
  </template>
</template>