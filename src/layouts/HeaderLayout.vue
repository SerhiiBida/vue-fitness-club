<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const props = defineProps({
  isLoggedIn: Boolean
});

// Отображение бокового меню
const drawer = ref(false);

// Навигация
function goToHome() {
  router.push({
    name: "home"
  });
}

function goToLogin() {
  router.push({
    name: "login"
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

  <!--Боковая панель-->
  <v-navigation-drawer
      class="header-drawer"
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
  >
    <!--Информация пользователь-->
    <!--    <v-list v-if="isLoggedIn">-->
    <!--      <v-list-item-->
    <!--          class="header-drawer-auth-info"-->
    <!--          prepend-avatar="/src/assets/images/user-default.png"-->
    <!--          :title="userEmail"-->
    <!--          :subtitle="userRole"-->
    <!--      ></v-list-item>-->
    <!--    </v-list>-->

    <v-divider></v-divider>

    <!--Меню навигации-->
    <v-list
        class="header-drawer-menu size"
        density="compact"
        nav
    >
      <template v-if="isLoggedIn">
        <!--Авторизован-->
        <!--        <v-list-item-->
        <!--            prepend-icon="mdi-widgets"-->
        <!--            title="Portfolios management"-->
        <!--            value="portfolios-management"-->
        <!--            @click="goToPortfoliosManagement"-->
        <!--        >-->
        <!--        </v-list-item>-->

        <!--        <v-list-item-->
        <!--            v-for="portfolio in portfolios"-->
        <!--            :key="portfolio.id"-->
        <!--            :title="portfolio.name"-->
        <!--            :value="portfolio.name"-->
        <!--            @click="goToPortfolio(portfolio.id)"-->
        <!--        >-->
        <!--          <template #prepend>-->
        <!--            <img-->
        <!--                src="@/assets/images/work.png"-->
        <!--                alt="work"-->
        <!--                class="portfolio-form-prepend-img"-->
        <!--            />-->
        <!--          </template>-->
        <!--        </v-list-item>-->
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
      <slot name="logout">
      </slot>
    </template>
  </v-navigation-drawer>
</template>