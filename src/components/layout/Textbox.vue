<template>
	<div class="w-full">
		<label class="text-gray-600 text-sm font-semibold">{{ label }}</label>
		<div class="mt-1">
			<input
				type="textbox"
				:value="value"
				class="mt-1 w-full border rounded bg-gray-50 border-gray-400 px-2 py-1 placeholder:text-xs"
				:class="`${disabled && 'bg-gray-200 cursor-not-allowed'}`"
				:placeholder="`${disabled ? '' : placeholder}`"
				:disabled="disabled"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: "Textbox",
	props: {
		label: String,
		value: String,
		placeholder: String,
		disabled: Boolean,
	},
};
</script>
