<script setup>
import {reactive, ref} from "vue";

import MembershipCard from "@/components/training/MembershipCard.vue";

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

</script>

<template>
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
        <MembershipCard :membership="membership"/>
      </v-col>
    </v-row>
  </v-container>
</template>