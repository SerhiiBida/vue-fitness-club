<script setup>
import {reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

import MembershipCard from "@/components/training/cards/MembershipCard.vue";
import api from "@/api/axios.js";
import {useUserStore} from "@/stores/user.js";

// Пользователь
const userStore = useUserStore();

// Маршрутизация
const router = useRouter();
const route = useRoute();

const globalDisable = ref(true);

const membership = reactive({
  fields: {}
});

const checkBuy = ref(false);

// Получение абонемента
const getMembership = async (id) => {
  try {
    const response = await api.get(`/memberships/${id}`);

    return response.data

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

// Проверка, куплен ли
const checkBuyMembership = async (userId, membershipId) => {
  try {
    const response = await api.post("/membership-purchase/check", {userId, membershipId});

    return response.data

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

// Запрос на покупку
const buyMembership = async () => {
};

// Обновление данных карточки
const updateCard = async () => {
  const userId = userStore.user.id;
  const membershipId = route.params.id;

  membership.fields = await getMembership(membershipId);

  checkBuy.value = await checkBuyMembership()
};

// Форма валидации для бонусов

// Логика покупки

</script>

<template>
  <div class="membership-container">
    <MembershipCard :membership="membership.fields" :global-disable="globalDisable">
      <template #button-action>
        <v-btn
            color="orange-darken-2"
            text="Buy"
            block
            variant="flat"
            @click="buyMembership"
        ></v-btn>
      </template>
    </MembershipCard>
  </div>
</template>