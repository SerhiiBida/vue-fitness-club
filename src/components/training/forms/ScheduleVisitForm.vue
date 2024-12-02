<script setup>

import {ref} from "vue";

const {visitUser} = defineProps({
  visitUser: Array
});

const disable = ref(false);

const createVisit = async () => {

}

const visit = async () => {
  await createVisit();
};

const cancelVisit = async () => {

};
</script>

<template>
  <template v-if="visitUser.length">
    <v-btn
        text="Cancel"
        :disabled="disable"
        @click="cancelVisit"
    >
    </v-btn>
  </template>
  <template v-else>
    <v-btn
        text="Visit"
        :disabled="disable"
        @click="visit"
    >
    </v-btn>
  </template>
</template>