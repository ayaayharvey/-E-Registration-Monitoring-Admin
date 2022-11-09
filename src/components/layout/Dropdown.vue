<template>
	<div class="w-full">
		<div class="text-gray-600 text-sm font-semibold">{{ label }}</div>
		<div class="mt-1 relative">
			<button
				@click="toggleSelection()"
				class="py-1 capitalize border rounded bg-gray-50 border-gray-400 px-2 w-full placeholder:text-xs flex justify-between items-center"
				:class="`${disabled && 'bg-gray-200 cursor-not-allowed'}`"
				:disabled="disabled"
			>
				{{ selected }}

				<i
					v-if="!disabled"
					:class="`${selectionOpen ? 'fas fa-angle-up' : 'fas fa-angle-down'}`"
				></i>
			</button>
			<div v-show="selectionOpen && !disabled">
				<ul class="bg-white absolute top-11 w-full shadow-lg border rounded">
					<li
						@click="selectOption(selection)"
						v-for="selection in selections"
						class="px-3 py-2 capitalize hover:bg-gray-200 cursor-pointer rounded"
					>
						{{ selection }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Dropdown",
	props: {
		label: String,
		value: String,
		selections: Array,
		disabled: Boolean,
	},
	data() {
		return {
			selectionOpen: false,
			selected: "",
		};
	},
	methods: {
		toggleSelection() {
			this.selectionOpen = !this.selectionOpen;
		},
		selectOption(data) {
			this.selected = data;
			this.$emit("selected", data);
			this.toggleSelection();
		},
	},
	created() {
		this.selected = this.value;
	},
};
</script>
