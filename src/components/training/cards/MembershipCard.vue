<script setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

import {useImage} from "@/composables/useImage.js";

const {membership, globalDisable} = defineProps({
  membership: Object,
  globalDisable: Boolean
});

const {getFullPathPicture} = useImage('/memberships/default/default.png');

// Загрузка карточки
const loading = ref(false);

// Покупка абонемента
// const buyMembership = async () => {
//   loading.value = true;
//
//   setTimeout(() => {
//     loading.value = false;
//   }, 2000);
// };

const router = useRouter();

function goToDetail() {
  router.push({
    name: 'home'
  });
}
</script>

<template>
  <v-card
      :disabled="globalDisable || loading"
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
        :src="getFullPathPicture"
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
          text="Detail"
          block
          variant="flat"
          @click="goToDetail"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>