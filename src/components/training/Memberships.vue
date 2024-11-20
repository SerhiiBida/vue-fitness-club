<script setup>
import {reactive, ref} from "vue";

import MembershipCard from "@/components/training/cards/MembershipCard.vue";
import MembershipSearchForm from "@/components/training/forms/MembershipSearchForm.vue";

const memberships = reactive([
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
  {id: 10},
  {id: 11},
  {id: 12},
  {id: 13},
  {id: 14},
  {id: 15},
  {id: 16},
  {id: 17},
  {id: 18},
  {id: 19},
  {id: 20},
]);

// Пагинация
const currentPage = ref(4);

const totalPages = ref(32);

// Глобальное закрытие доступа к отправкам запросов
const globalDisable = ref(true);
</script>

<template>
  <!--Форма фильтрации, сортировки, поиска-->
  <MembershipSearchForm :global-disable="globalDisable"/>

  <!--Карточки-->
  <v-container>
    <v-row>
      <v-col
          v-for="membership in memberships"
          :key="membership.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
      >
        <MembershipCard :membership="membership" :global-disable="globalDisable"/>
      </v-col>
    </v-row>
  </v-container>

  <!--Пагинация-->
  <div class="text-center">
    <v-container class="pt-0">
      <v-row justify="center">
        <v-col
            cols="12"
            md="8"
        >
          <v-container class="max-width pt-1">
            <v-pagination
                v-model="currentPage"
                :length="totalPages"
                :disabled="globalDisable"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>