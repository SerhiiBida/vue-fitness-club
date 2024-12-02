<script setup>
import {computed} from "vue";
import ScheduleVisitForm from "@/components/training/forms/ScheduleVisitForm.vue";

const {schedule, globalDisable} = defineProps({
  schedule: Object,
  globalDisable: Boolean
});

const duration = computed(() => {
  const startTime = new Date(schedule['start_time']);
  const endTime = new Date(schedule['end_time']);

  const difference = endTime - startTime;

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return `Duration ${hours} hours ${minutes} minutes`;
});
</script>

<template>
  <v-card
      variant="outlined"
      class="mx-auto"
      color="surface-variant"
      :subtitle="duration"
      :title="schedule['start_time']"
      :disabled="globalDisable"
  >
    <template v-slot:actions>
      <ScheduleVisitForm
          :visit-user="schedule.users"
          :schedule-id="schedule.id"
          @update-schedule="$emit('updateSchedule')"/>
    </template>
  </v-card>
</template>