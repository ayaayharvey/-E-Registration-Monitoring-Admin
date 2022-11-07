<template>
	<div>
		<Modal
			@close-modal="onClose()"
			label="Add Category"
			size="modal-xs"
		>
			<div class="grid grid-cols-1 gap-x-8 gap-y-3">
				<div class="mb-2">
					<div class="text-gray-600 text-sm font-semibold">Category Title</div>
					<input
						class="mt-1 w-full border rounded bg-gray-50 border-gray-400 px-2 py-1"
					/>
				</div>
				<div class="mb-2">
					<div class="text-gray-600 text-sm font-semibold">Description</div>
					<textarea
						class="mt-1 w-full border rounded bg-gray-50 border-gray-400 px-2 py-1"
					/>
				</div>
			</div>
			<div class="w-full flex items-center mt-3 gap-3">
				<Button
					@click="onClose()"
					label="CLOSE"
					color="danger"
					icon="fa-solid fa-xmark"
				/>
				<Button
					label="SAVE"
					icon="fa-solid fa-floppy-disk"
					color="success"
				/>
			</div>
		</Modal>
	</div>
</template>

<script>
import Modal from "../../../components/layout/Modal.vue";
import Textbox from "../../../components/layout/Textbox.vue";
import Dropdown from "../../../components/layout/Dropdown.vue";
import Button from "../../../components/layout/Button.vue";
export default {
	name: "CreateForm",
	components: {
		Modal,
		Textbox,
		Dropdown,
		Button,
	},
	props: {
		label: String,
	},
	methods: {
		onClose() {
			this.$emit("close-form");
		},
	},
};
</script>
