<template>
  <section
    class="p-5 hidden md:block md:w-1/3 lg:w-1/4 xl:w-1/5 h-screen bg-blue-900 text-white"
  >
    <Profile />
    <Navigations />
  </section>
</template>

<script>
import Profile from "./profile/Profile.vue";
import Navigations from "./navigations/Navigations.vue";

export default {
  name: "Sidebar",
  components: {
    Profile,
    Navigations,
  },
};
</script>
