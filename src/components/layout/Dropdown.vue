<template>
  <div class="py-2 w-full">
    <label class="text-sm">{{ label }}</label>
    <div class="mt-1 relative">
      <button
        @click="openSelection()"
        class="py-1 border-2 border-gray-500 rounded w-full px-3 placeholder:text-xs flex justify-between items-center"
      >
        {{ selected.label }}

        <i
          :class="`${selectionOpen ? 'fas fa-angle-up' : 'fas fa-angle-down'}`"
        ></i>
      </button>
      <div v-show="selectionOpen">
        <ul class="bg-white absolute top-11 w-full shadow-lg border rounded">
          <li
            @click="selectOption(selection)"
            v-for="selection in selections"
            class="px-3 py-2 hover:bg-gray-200 cursor-pointer rounded"
          >
            {{ selection.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    label: String,
    selections: Object,
  },
  data() {
    return {
      selectionOpen: false,
      selected: {
        id: this.selections[0] && this.selections[0].id,
        label: this.selections[0] && this.selections[0].label,
      },
    };
  },
  methods: {
    openSelection() {
      this.selectionOpen = !this.selectionOpen;
    },
    selectOption(data) {
      this.selected = {
        id: data.id,
        label: data.label,
      };
      this.openSelection();
    },
    resetForm() {
      this.selectionOpen = false;
      this.selected = {
        id: this.selections[0] && this.selections[0].id,
        label: this.selections[0] && this.selections[0].label,
      };
    },
  },
};
</script>
