<template>
	<button
		class="border-2 transition rounded w-60 font-semibold"
		:class="`
		${
			!outlined
				? color === 'danger'
					? 'text-white bg-red-800 border-red-800 hover:bg-red-700 hover:border-red-700'
					: color === 'secondary'
					? 'text-white bg-gray-600 border-gray-600 hover:bg-gray-500 hover:border-gray-500'
					: color === 'success'
					? 'text-white bg-green-600 border-green-600 hover:bg-green-500 hover:border-green-500'
					: color === 'warning'
					? 'text-white bg-yellow-500 border-yellow-500 hover:bg-yellow-400 hover:border-yellow-500'
					: 'text-white bg-blue-900 border-blue-900 hover:bg-blue-800 hover:border-blue-800'
				: color === 'danger'
				? 'text-red-800 bg-white border-red-800 hover:bg-red-600 hover:border-red-600 hover:text-white'
				: color === 'secondary'
				? 'text-gray-600 bg-white border-gray-600 hover:bg-gray-300 hover:border-gray-300 hover:text-white'
				: color === 'success'
				? 'text-green-600 bg-white border-green-600 hover:bg-green-400 hover:border-green-400 hover:text-white'
				: color === 'warning'
				? 'text-yellow-500 bg-white border-yellow-500 hover:bg-yellow-400 hover:border-yellow-400 hover:text-white'
				: 'text-blue-900 bg-white border-blue-900 hover:bg-blue-700 hover:border-blue-700 hover:text-white'
		}
		${
			disabled &&
			'text-white bg-gray-400 border-gray-400 hover:bg-gray-400 hover:border-gray-400 cursor-not-allowed'
		}
		${
			size === 'sm'
				? 'w-[2.5rem] h-[2.5rem]'
				: size === 'lg'
				? 'px-5 py-2 text-md'
				: 'px-3 py-1 text-sm'
		}`"
	>
		<i
			v-if="icon"
			:class="icon"
			class="w-4 h-4 mx-auto"
		></i
		><span
			v-if="size !== 'sm'"
			class="ml-1 uppercase"
			>{{ label }}</span
		>
	</button>
	<!-- <svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-4 h-4 mx-auto"
				viewBox="0 0 384 512"
			>
				<path
					fill="white"
					d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
				/>
			</svg> -->
</template>

<script>
export default {
	name: "Button",
	props: {
		label: String,
		color: String,
		outlined: Boolean,
		disabled: Boolean,
		size: String,
		icon: String,
	},
};
</script>
