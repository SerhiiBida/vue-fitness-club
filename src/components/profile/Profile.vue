<script setup>
import ProfileUserInfo from "@/components/profile/cards/ProfileUserInfo.vue";
import ProfileTrainingsBlock from "@/components/profile/blocks/ProfileTrainingsBlock.vue";
import ProfileMembershipsBlock from "@/components/profile/blocks/ProfileMembershipsBlock.vue";
</script>

<template>
  <section class="profile-container d-flex flex-column">
    <ProfileUserInfo/>
    <ProfileTrainingsBlock/>
    <ProfileMembershipsBlock/>
  </section>
</template>