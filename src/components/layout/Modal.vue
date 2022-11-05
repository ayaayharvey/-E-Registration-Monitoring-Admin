<template>
  <section
    class="fixed z-40 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full"
  >
    <div
      class="p-5 shadow-lg rounded-md bg-white max-h-fit min-h-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      :class="`${
        size !== 'modal-2xl'
          ? size !== 'modal-xl'
            ? size !== 'modal-lg'
              ? size !== 'modal-md'
                ? size !== 'modal-sm'
                  ? 'w-[25rem]'
                  : 'w-[25rem] md:w-[45rem] lg:w-[35rem]'
                : 'w-[25rem] md:w-[45rem] lg:w-[45rem]'
              : 'w-[25rem] md:w-[45rem] lg:w-[55rem]'
            : 'w-[25rem] md:w-[45rem] lg:w-[65rem]'
          : 'w-[25rem] md:w-[45rem] lg:w-[75rem]'
      }`"
    >
      <!-- Modal Header -->
      <div class="pb-2 flex justify-between items-center">
        <div class="font-semibold text-lg">
          {{ label }}
        </div>
        <i
          @click="$emit('close-modal')"
          class="fas fa-times cursor-pointer"
        ></i>
      </div>
      <!-- Modal Content -->
      <div class="py-1 px-3">
        <slot />
      </div>
      <!-- Modal Footer -->
      <div class="w-full flex items-center mt-3">
        <button
          @click="$emit('close-modal')"
          class="w-40 py-1 rounded mx-auto bg-blue-900 text-white"
        >
          CLOSE
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Modal",
  props: {
    label: String,
    size: String,
  },
};
</script>
