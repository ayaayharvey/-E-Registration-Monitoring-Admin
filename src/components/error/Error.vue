<template>
  <div><Header :component_name="$route.name" /></div>
</template>

<script>
import Header from "../layout/Header.vue";
export default {
  name: "Error",
  components: {
    Header,
  },
};
</script>
