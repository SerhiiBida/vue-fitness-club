<script setup>
import {useRouter} from "vue-router";

import {computed} from "vue";
import env from "../../../../env.js";

const router = useRouter();

const {training, globalDisable} = defineProps({
  training: Object,
  globalDisable: Boolean,
  loading: {
    type: Boolean,
    default: false
  },
  largeDescription: {
    type: Boolean,
    default: false
  },
  cardHeight: {
    type: String,
    default: "477"
  },
  cardMaxWidth: {
    type: String,
    default: "374"
  }
});

const getFullPathPicture = computed(() => {
  return env.serverStorage + training['image_path'];
});

function goToDetail() {
  router.push({
    name: "training",
    params: {
      id: training.id
    }
  });
}
</script>

<template>
  <v-card
      :disabled="globalDisable"
      :loading="loading"
      class="mx-auto d-flex flex-column"
      :max-width="cardMaxWidth"
      :height="cardHeight"
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
        min-height="250"
        :src="getFullPathPicture"
        contain
    ></v-img>

    <v-card-item>
      <!--Название-->
      <v-card-title>
        {{ training['name'] }}
      </v-card-title>

      <v-card-subtitle>
        <span>
          {{ training['training_type'] }}
        </span>
      </v-card-subtitle>

      <v-card-title class="d-flex justify-space-between">
        <!--Имя тренера-->
        <div class="d-flex align-center">
          <span class="text-body-2 me-1">
            {{ training['username'] }}
          </span>
        </div>
      </v-card-title>
    </v-card-item>

    <!--Описание-->
    <v-card-text>
      <div class="text-justify" :class="{'text-multiline-hidden': !largeDescription}">
        {{ training['description'] }}
      </div>
    </v-card-text>

    <!--Список абонементов, что дают доступ к тренировке-->
    <template v-if="training['memberships']?.length">
      <v-divider class="mx-4 mb-1"></v-divider>

      <v-card-title>Memberships that fit</v-card-title>

      <div class="px-4 mb-2">
        <v-chip-group selected-class="bg-deep-purple-lighten-2">
          <v-chip v-for="membership in training['memberships']" :key="membership.id">
            <RouterLink
                class="text-decoration-none"
                :to="{name: 'membership', params: {id: membership.id}}"
            >
              {{ membership.name }}
            </RouterLink>
          </v-chip>
        </v-chip-group>
      </div>
    </template>

    <slot name="button-action">
      <v-card-actions>
        <v-btn
            color="orange-darken-2"
            text="Detail"
            block
            variant="flat"
            @click="goToDetail"
        ></v-btn>
      </v-card-actions>
    </slot>
  </v-card>
</template>