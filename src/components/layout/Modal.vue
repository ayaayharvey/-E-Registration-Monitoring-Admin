<template>
	<section
		class="fixed z-40 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full"
	>
		<div
			class="shadow-lg rounded-md bg-white max-h-fit min-h-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
			<div
				class="px-4 py-3 flex justify-between items-center"
				:class="forDeletion ? 'bg-red-800' : 'bg-blue-900'"
			>
				<div class="font-semibold text-lg text-white">
					{{ label }}
				</div>
				<i
					@click="$emit('close-modal')"
					class="fas fa-times cursor-pointer text-white"
				></i>
			</div>
			<div class="px-5 pt-2">
				<!-- Modal Content -->
				<div class="px-3 pb-5">
					<slot />
				</div>
				<!-- Modal Footer -->
				<div
					v-if="enableCloseButton"
					class="w-full flex items-center mt-3"
				>
					<button
						@click="$emit('close-modal')"
						class="w-40 py-1 rounded mx-auto bg-blue-900 text-white"
					>
						CLOSE
					</button>
				</div>
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
		enableCloseButton: Boolean,
		forDeletion: Boolean,
	},
};
</script>
