<script setup>
import {useRouter} from "vue-router";

import api from "@/api/axios.js";
import {usePagination} from "@/composables/usePagination.js";
import Pagination from "@/components/ui/pagination/Pagination.vue";
import MembershipCard from "@/components/training/cards/MembershipCard.vue";

const router = useRouter();

// Запрос на получение данных
const getMembershipsPagination = async (params) => {
  try {
    const response = await api.get("/membership-purchases/by-user", {
      params: {
        ...params
      }
    });

    return response.data;

  } catch (error) {
    if (error.response?.status === 401) {
      await router.push({
        name: "login"
      });

    } else {
      return {};
    }
  }
};

// Запуск пагинации
const {
  globalDisable, container, currentPage,
  totalPages, products
} = usePagination(getMembershipsPagination, 4);
</script>

<template>
  <section
      class="profile-memberships"
      ref="container"
  >
    <p class="text-h4 text-center font-weight-bold pt-2">
      My memberships
    </p>

    <!--Карточки-->
    <template v-if="products.items.length">
      <v-container>
        <v-row>
          <v-col
              v-for="membershipPurchase in products.items"
              :key="membershipPurchase.membership.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
          >
            <MembershipCard
                :membership="membershipPurchase.membership"
                card-height="auto"
                :global-disable="globalDisable"
            >
              <template #price-and-bonuses>
                {{ '' }}
              </template>
            </MembershipCard>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-else>
      <div class="d-flex justify-center align-center flex-column py-10">
        <p class="text-h4 text-center text-red">
          Nothing found.
        </p>
      </div>
    </template>

    <!--Пагинация-->
    <Pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :total-pages="totalPages"
        :global-disable="globalDisable"
    />
  </section>
</template>