<template>
	<div class="w-60 mb-5">
		<label class="text-gray-600 text-sm font-semibold">{{ label }}</label>
		<div class="mt-1 flex items-center">
			<input
				type="textbox"
				:value="value"
				class="w-full border rounded bg-gray-50 border-gray-400 pl-3 pr-9 py-1 placeholder:text-xs"
				:class="`${disabled && 'bg-gray-200 cursor-not-allowed'}`"
				placeholder="Search Filter"
				:disabled="disabled"
			/>
			<div class="-ml-7 text-gray-400">
				<i class="fa-solid fa-magnifying-glass"></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SearchBox",
	props: {
		label: String,
		value: String,
		placeholder: String,
		disabled: Boolean,
	},
};
</script>
