<template>
  <div class="py-2 w-full">
    <label class="text-sm">{{ label }}</label>
    <div class="mt-1">
      <input
        type="textbox"
        class="py-1 border-2 border-gray-500 rounded w-full px-3 placeholder:text-xs"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Textbox',
  props: {
    label: String,
    placeholder: String,
  },
};
</script>
