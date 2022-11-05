<template>
  <div class="rounded-lg drop-shadow-md text-sm bg-blue-900">
    <h3 class="px-5 py-3 font-semibold text-white uppercase">
      {{ label }}
    </h3>
    <table class="rounded w-full">
      <slot />
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    label: String,
  },
};
</script>
