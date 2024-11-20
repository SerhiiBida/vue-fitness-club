<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

import MenuLayout from "@/layouts/MenuLayout.vue";

// Отображение бокового меню
const drawer = ref(true);

// Навигация
const router = useRouter();

function goToHome() {
  router.push({
    name: "home"
  });
}
</script>

<template>
  <!--Верхнее меню-->
  <v-app-bar
      class="header-bar"
      color="orange-darken-3"
  >
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title class="header-bar-title" @click="goToHome">
      <div class="d-flex align-center ga-1">
        <v-img
            src="/src/assets/images/logo.png"
            alt="Logo"
            max-width="32"
            class="mr-2"
        >
        </v-img>
        Fitness Club
      </div>
    </v-toolbar-title>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>

  <!--Боковое меню-->
  <MenuLayout v-model="drawer"/>

</template>