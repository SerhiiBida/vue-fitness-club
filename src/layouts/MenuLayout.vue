<script setup>
import {useRouter} from "vue-router";

import {useUserStore} from "@/stores/user.js";
import {useAuth} from "@/composables/Auth/useAuth.js";
import {computed} from "vue";
import env from "../../env.js";

const drawer = defineModel();

const userStore = useUserStore();

const getFullPathPictureUser = computed(() => {
  return env.serverStorage + userStore.user.imagePath;
});

// Навигация
const router = useRouter();

function goToLogin() {
  router.push({
    name: "login"
  });
}

function goToProfile() {
  router.push({
    name: "profile"
  });
}

function goToTrainings() {
  router.push({
    name: "trainings"
  });
}

function goToMemberships() {
  router.push({
    name: "memberships"
  });
}

// Выход пользователя из системы
const {logout} = useAuth(router);
</script>

<template>
  <!--Боковая панель-->
  <v-navigation-drawer
      class="header-drawer"
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
  >
    <!--Информация пользователь-->
    <v-list v-if="userStore.isAuthenticated">
      <v-list-item
          class="header-drawer-auth-info"
          :prepend-avatar="getFullPathPictureUser"
          :title="userStore.user.email"
          :subtitle="`Bonuses ${userStore.user.bonuses}`"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!--Меню навигации-->
    <v-list
        class="header-drawer-menu size"
        density="compact"
        nav
    >
      <template v-if="userStore.isAuthenticated">
        <!--Авторизован-->
        <v-list-item
            prepend-icon="mdi-account-outline"
            title="Profile"
            value="profile"
            @click="goToProfile"
        >
        </v-list-item>
        <v-list-item
            prepend-icon="mdi-soccer"
            title="Trainings"
            value="trainings"
            @click="goToTrainings"
        >
        </v-list-item>
        <v-list-item
            prepend-icon="mdi-basket-plus-outline"
            title="Memberships"
            value="memberships"
            @click="goToMemberships"
        >
        </v-list-item>
      </template>
      <template v-else>
        <v-list-item
            prepend-icon="mdi-login"
            title="Login / Register"
            value="login"
            @click="goToLogin"
        >
        </v-list-item>
      </template>
    </v-list>

    <!--Выход пользователя-->
    <template #append>
      <template v-if="userStore.isAuthenticated">
        <div class="pa-2">
          <v-btn color="orange-darken-3" block @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </template>
  </v-navigation-drawer>
</template>