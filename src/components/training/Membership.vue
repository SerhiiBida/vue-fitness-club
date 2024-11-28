<script setup>
import {computed, onMounted, reactive, ref} from "vue";
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

// Данные от сервера
const membership = reactive({
  fields: {}
});

const checkBuy = ref(false);

// Получение абонемента
const getMembership = async (id) => {
  try {
    const response = await api.get(`/memberships/${id}`);

    return response.data.membership;

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
    const response = await api.post("/membership-purchases/check", {userId, membershipId});

    return response.data["is_purchased"];

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

// Логика загрузки данных карточки
const updateCard = async () => {
  globalDisable.value = true;

  const userId = userStore.user.id;
  const membershipId = route.params.id;

  checkBuy.value = await checkBuyMembership(userId, membershipId);

  membership.fields = await getMembership(membershipId);

  globalDisable.value = false;
};

onMounted(async () => {
  await updateCard();
});


// Запрос на покупку
const buyMembership = async (userId, membershipId, bonuses, serverError) => {
  try {
    const response = await api.post(`/membership-purchases/buy`, {userId, membershipId, bonuses});

    userStore.updateUser();

    await router.push({
      name: "profile"
    });

  } catch (error) {
    if (error.response?.status === 401) {
      await router.push({
        name: "login"
      });

    } else if (error.response?.status === 403) {
      await router.push({
        name: "memberships"
      });

    } else if (error.response?.status === 422) {
      serverError.value = error.response.data.message;

    } else {
      serverError.value = "Try again later";
    }
  }
};

// Форма покупки
const buyForm = ref(null);

const serverError = ref("");

const amountBonuses = ref(0);

// Не больше 30% за оплату бонусами
const bonusDiscountLimit = computed(() => {
  const currentPrice = membership.fields?.["discounted_price"];

  if (currentPrice === undefined) {
    return 0;
  } else {
    return (currentPrice / 100) * 30;
  }
});

const amountBonusesRules = reactive([
  v => Number(v) >= 0 || "Can't be negative",
  v => Number(v) <= userStore.user.bonuses || "You don't have many bonuses",
  v => Number(v) <= bonusDiscountLimit.value || "Bonus discount no more than 30% of the price",
]);

// Логика покупки
const buy = async () => {
  const {valid} = await buyForm.value.validate();

  if (valid) {
    globalDisable.value = true;

    const userId = userStore.user.id;
    const membershipId = route.params.id;
    const bonuses = Number(amountBonuses.value);

    await buyMembership(userId, membershipId, bonuses, serverError);

    globalDisable.value = false;
  }
};
</script>

<template>
  <div class="membership-container">
    <template v-if="Object.keys(membership.fields).length">
      <MembershipCard
          :membership="membership.fields"
          :global-disable="globalDisable"
          :loading="globalDisable"
          :large-description="true"
          :card-height="'auto'"
          :card-max-width="'450'"
      >
        <template #button-action>
          <template v-if="checkBuy">
            <v-card-actions>
              <v-btn
                  color="orange-darken-2"
                  text="Already purchased"
                  block
                  variant="flat"
                  @click="router.push({name: 'profile'})"
              >
              </v-btn>
            </v-card-actions>
          </template>
          <template v-else>
            <v-form
                ref="buyForm"
                action="#"
                method="post"
                class="membership-buy-form px-2 pb-2"
                @submit.prevent="buy"
            >
              <v-text-field
                  v-model="amountBonuses"
                  type="number"
                  label="Use bonuses"
                  variant="outlined"
                  :rules="amountBonusesRules"
              >
              </v-text-field>

              <p class="text-red text-center mb-1">
                {{ serverError }}
              </p>

              <v-btn
                  type="submit"
                  color="orange-darken-2"
                  text="Buy"
                  block
                  variant="flat"
              >
              </v-btn>
            </v-form>
          </template>
        </template>
      </MembershipCard>
    </template>
  </div>
</template>