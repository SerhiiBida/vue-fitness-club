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
      height="490"
      border
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
        src="src/assets/images/ball.png"
        contain
    ></v-img>

    <v-card-item>
      <!--Название-->
      <v-card-title>
        Monthly membership
      </v-card-title>

      <v-card-subtitle>
        <span>
          Valid 60 days
        </span>
      </v-card-subtitle>

      <v-card-title class="d-flex justify-space-between">
        <!--Цена и скидка-->
        <div class="d-flex align-center ga-1">
          <span class="text-h4 text-red font-weight-bold">
            $40
          </span>
          <del class="text-grey font-weight-bold">
            $55
          </del>
        </div>

        <!--Бонус-->
        <div class="d-flex align-center">
          <span class="me-1">
          +100
          </span>
          <v-icon
              color="orange-darken-4"
              icon="mdi-star-four-points-circle-outline"
              size="small"
          ></v-icon>
        </div>
      </v-card-title>
    </v-card-item>

    <!--Описание абонемента-->
    <v-card-text>
      <div class="text-justify text-multiline">
        Small plates, salads & sandwiches - an intimate
        setting with 12 indoor seats plus patio seating.
      </div>
    </v-card-text>


    <v-card-actions>
      <v-btn
          color="orange-darken-2"
          text="Buy"
          block
          variant="flat"
          @click="buyMembership"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>