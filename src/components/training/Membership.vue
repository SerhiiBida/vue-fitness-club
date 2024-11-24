<script setup>
import {reactive, ref} from "vue";

import MembershipCard from "@/components/training/cards/MembershipCard.vue";

const globalDisable = ref(false);

const membership = reactive({});

// Покупка
const buyMembership = () => {
};

</script>

<template>
  <div class="membership-container">
    <MembershipCard :membership="membership" :global-disable="globalDisable">
      <template #button-action>
        <v-btn
            color="orange-darken-2"
            text="Buy"
            block
            variant="flat"
            @click="buyMembership"
        ></v-btn>
      </template>
    </MembershipCard>
  </div>
</template>