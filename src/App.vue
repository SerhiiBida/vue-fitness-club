<script setup>
import {RouterLink, RouterView} from 'vue-router'
import HeaderLayout from "@/layouts/HeaderLayout.vue";
</script>

<template>
  <v-app>

    <HeaderLayout/>

    <v-main>
      <RouterView/>
    </v-main>

  </v-app>
</template>
