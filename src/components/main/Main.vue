<template>
  <section class="w-full flex bg-white">
    <Sidebar />
    <div class="w-full px-10 py-5 md:py-10">
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import Sidebar from "../../components/sidebar/Sidebar.vue";
export default {
  name: "Main",
  components: {
    Sidebar,
  },
};
</script>
