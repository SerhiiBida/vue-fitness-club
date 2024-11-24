<script setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

import {useImage} from "@/composables/useImage.js";

const router = useRouter();

const {membership, globalDisable} = defineProps({
  membership: Object,
  globalDisable: Boolean
});

const {getFullPathPicture} = useImage();

function goToDetail() {
  router.push({
    name: 'home'
  });
}
</script>

<template>
  <v-card
      :disabled="globalDisable"
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
        :src="getFullPathPicture(membership['image_path'])"
        contain
    ></v-img>

    <v-card-item>
      <!--Название-->
      <v-card-title>
        {{ membership['name'] }}
      </v-card-title>

      <v-card-subtitle>
        <span>
          Valid {{ membership['validity_days'] }} days
        </span>
      </v-card-subtitle>

      <v-card-title class="d-flex justify-space-between">
        <!--Цена и скидка-->
        <div class="d-flex align-center ga-1">
          <span class="text-h4 text-red font-weight-bold">
            {{ membership['discounted_price'] }}
          </span>
          <del class="text-grey font-weight-bold">
            {{ membership['price'] }}
          </del>
        </div>

        <!--Бонус-->
        <div class="d-flex align-center">
          <span class="text-body-2 me-1">
          +{{ membership['bonuses'] }}
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
        {{ membership['description'] }}
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