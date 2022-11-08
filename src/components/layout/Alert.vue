<template>
	<section
		class="fixed z-40 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full"
		v-if="alertType === 'success' || alertType === 'error'"
	>
		<div
			class="p-3 w-[25rem] bg-white shadow-lg rounded-md max-h-fit min-h-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
		>
			<!-- Alert Header -->
			<div class="pb-2 flex justify-between items-center">
				<div class="font-semibold">
					<i
						:class="
							alertType === 'success'
								? 'fa-sharp fa-solid fa-circle-check text-green-700'
								: 'fa-sharp fa-solid fa-circle-exclamation text-red-700'
						"
					></i>
					{{ alertType.toUpperCase() }}
				</div>
				<i
					@click="$emit('close-modal')"
					class="fas fa-times cursor-pointer"
				></i>
			</div>
			<!-- Alert Header -->
			<div
				class="px-3 py-3 border rounded"
				:class="
					alertType === 'success'
						? ' bg-green-200 border-green-700'
						: ' bg-red-200 border-red-700'
				"
			>
				{{ message }}
			</div>
			<!-- Alert Buttons -->

			<div class="w-full flex justify-center items-center mt-3 gap-3">
				<Button
					@click="$emit('close-modal')"
					label="CLOSE"
					color="danger"
					outlined
					v-if="buttonClose"
				/>
				<Button
					@click="$emit('close-modal')"
					label="CANCEL"
					color="danger"
					v-if="buttonCancel"
				/>
				<Button
					@click="$emit('close-modal')"
					label="CONFIRM"
					color="success"
					v-if="buttonConfirm"
				/>
			</div>
			<!-- Alert Buttons -->
		</div>
	</section>
</template>

<script>
import Button from "./Button.vue";
export default {
	name: "Alert",
	components: {
		Button,
	},
	props: {
		alertType: String,
		label: String,
		message: String,
		buttonClose: Boolean,
		buttonCancel: Boolean,
		buttonConfirm: Boolean,
	},
};
</script>
