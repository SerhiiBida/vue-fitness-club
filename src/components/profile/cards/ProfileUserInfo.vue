<script setup>
import {useUserStore} from "@/stores/user.js";
import {computed} from "vue";
import env from "../../../../env.js";

const userStore = useUserStore();

const getFullPathPictureUser = computed(() => {
  return env.serverStorage + userStore.user.imagePath;
});
</script>

<template>
  <v-card
      class="flex-grow-1"
      max-width="auto"
      max-height="325"
      rounded="0"
  >
    <v-img
        max-height="325"
        width="100%"
        src="../src/assets/images/gym.webp"
        cover
    >
      <v-avatar
          rounded="0"
          size="150"
      >
        <v-img
            max-width="100"
            max-height="100"
            :src="getFullPathPictureUser"
            cover
        >
        </v-img>
      </v-avatar>
      <v-list-item
          class="text-white"
          :subtitle="userStore.user.email"
          :title="userStore.user.username"
      >
        <template v-slot:subtitle>
          <span class="text-white">{{ userStore.user.email }}</span>
        </template>
      </v-list-item>
    </v-img>
  </v-card>
</template>