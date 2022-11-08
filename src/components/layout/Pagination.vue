<template>
	<div class="w-full mx-auto pt-3">
		<div class="flex justify-between items-center">
			<div class="text-gray-800 text-sm">
				Page {{ current_page }} of {{ last_page }} (A total of
				{{ total }} records.)
			</div>
			<div class="flex items-center">
				<button
					@click="$emit('prev-page')"
					class="bg-blue-900 ml-1 w-[2.5rem] h-[2.5rem] border rounded text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-4 h-4 mx-auto"
						viewBox="0 0 384 512"
					>
						<path
							fill="white"
							d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
						/>
					</svg>
				</button>
				<button
					@click="$emit('next-page')"
					class="bg-blue-900 ml-1 w-[2.5rem] h-[2.5rem] border rounded"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-4 h-4 mx-auto"
						viewBox="0 0 384 512"
					>
						<path
							fill="white"
							d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Pagination",
	props: {
		current_page: Number,
		last_page: Number,
		total: Number,
	},
};
</script>
