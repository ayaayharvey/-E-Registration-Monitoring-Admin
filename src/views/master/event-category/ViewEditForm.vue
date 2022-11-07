<template>
	<div>
		<Modal
			@close-modal="onClose()"
			label="Category Details"
			size="modal-xs"
		>
			<div class="grid grid-cols-1 gap-x-8 gap-y-3 justify-items-stretch">
				<Textbox
					label="Category Title"
					:value="formData.title"
					placeholder="Type text here"
					:disabled="formViewing"
				/>
				<TextArea
					label="Description"
					:value="formData.description"
					placeholder="Type text here"
					:disabled="formViewing"
				/>
				<Dropdown
					label="Status"
					:value="formData.status"
					:selections="selections"
					:disabled="formViewing"
				/>
				<Textbox
					label="Creator"
					:value="formData.title"
					placeholder="Type text here"
					:disabled="formViewing"
				/>
			</div>
			<div class="mt-5 w-full flex items-center gap-3">
				<Button
					@click="onClose()"
					label="CLOSE"
					color="danger"
					icon="fa-solid fa-xmark"
				/>
				<Button
					v-if="formViewing"
					@click="toggleFormType()"
					label="EDIT"
					icon="fa-solid fa-pen mr-1"
				/>
				<Button
					v-if="!formViewing"
					@click="toggleFormType()"
					label="UPDATE"
					icon="fa-solid fa-pen mr-1"
					color="success"
				/>
			</div>
		</Modal>
	</div>
</template>

<script>
import Modal from "../../../components/layout/Modal.vue";
import Textbox from "../../../components/layout/Textbox.vue";
import TextArea from "../../../components/layout/TextArea.vue";
import Dropdown from "../../../components/layout/Dropdown.vue";
import Button from "../../../components/layout/Button.vue";
export default {
	name: "ViewEditForm",
	components: {
		Modal,
		Textbox,
		TextArea,
		Dropdown,
		Button,
	},
	props: {
		label: String,
		formData: Object,
	},
	data() {
		return {
			roles: [],
			formViewing: true,
			selections: [
				{
					id: 1,
					label: "active",
				},
				{
					id: 2,
					label: "inactive",
				},
			],
		};
	},
	methods: {
		toggleFormType() {
			this.formViewing = !this.formViewing;
		},
		onClose() {
			this.$emit("close-form");
		},
	},
};
</script>
