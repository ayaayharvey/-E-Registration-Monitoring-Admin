<template>
  <button
    class="bg-blue-900 text-white hover:bg-blue-800 transition rounded px-5 py-2 w-60 font-semibold uppercase"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: String,
  },
};
</script>
