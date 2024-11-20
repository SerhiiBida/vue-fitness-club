<script setup>
import {computed, ref} from "vue";

const props = defineProps({
  membership: Object
});

// Данные карточки
const membership = computed(() => props.membership);

// Загрузка карточки
const loading = ref(false);

// Покупка абонемента
const buyMembership = async () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <v-card
      :disabled="loading"
      :loading="loading"
      class="mx-auto"
      max-width="374"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
      ></v-progress-linear>
    </template>

    <v-img
        max-height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        cover
    ></v-img>

    <!--Название и бонусы-->
    <v-card-item>
      <v-card-title>
        Monthly membership
      </v-card-title>

      <v-card-subtitle>
        <span class="me-1">
          + 100
        </span>

        <v-icon
            color="orange-darken-4"
            icon="mdi-star-four-points-circle-outline"
            size="small"
        ></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <!--Описание абонемента-->
    <v-card-text>
      <div>
        Small plates, salads & sandwiches - an intimate
        setting with 12 indoor seats plus patio seating.
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <!--Стоимость и скидка-->
    <v-card-title align="center">
      <span class="text-red font-weight-bold">
        $40
      </span>
      <del class="text-grey font-weight-bold">
        $55
      </del>
    </v-card-title>

    <v-card-actions>
      <v-btn
          color="orange-darken-3"
          text="Buy"
          block
          border
          @click="buyMembership"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>