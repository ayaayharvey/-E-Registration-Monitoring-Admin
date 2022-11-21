<template>
	<div>
		<Modal
			@close-modal="onClose()"
			:label="
				!formViewing
					? 'Edit Category'
					: !forDeletion
					? 'View Category'
					: 'Delete Category'
			"
			size="modal-xs"
			:forDeletion="forDeletion"
		>
			<!-- <div class="w-full justify-center flex items-center">
				<i class="fa-solid fa-spinner animate-spin text-3xl mr-3"></i>
				<span class="font-semibold"> LOADING </span>
			</div> -->
			<div class="grid grid-cols-1 gap-x-8 gap-y-3 justify-items-stretch">
				<div
					class="px-3 py-3 mt-3 border rounded font-semibold"
					:class="forDeletion && 'bg-red-200 border-red-700'"
					v-if="forDeletion"
				>
					Move this record to trash?
				</div>
				<Textbox
					label="Category Title"
					:value="formData.title"
					v-model="formData.title"
					placeholder="Type text here"
					:disabled="formViewing"
				/>
				<TextArea
					label="Description"
					:value="formData.description"
					v-model="formData.description"
					placeholder="Type text here"
					:disabled="formViewing"
				/>
				<Dropdown
					label="Status"
					:value="formData.status"
					@selected="dropdownSelected"
					:selections="['active', 'inactive']"
					:disabled="formViewing"
				/>
				<Textbox
					className="capitalize"
					label="Creator"
					:value="creator"
					placeholder="Type text here"
					disabled
				/>
			</div>
			<div class="mt-5 w-full flex items-center gap-3">
				<Button
					@click="onClose()"
					label="CLOSE"
					color="danger"
					icon="fa-solid fa-xmark"
					:disabled="saving"
					v-if="formViewing && !forDeletion"
					class="mx-auto"
				/>
				<Button
					@click="onClose()"
					label="CANCEL"
					color="danger"
					icon="fa-solid fa-xmark"
					:disabled="saving"
					v-if="!formViewing && !forDeletion"
					class="mx-auto"
				/>
				<Button
					@click="toggleFormType()"
					label="EDIT"
					icon="fa-solid fa-pen mr-1"
					v-if="formViewing && !forDeletion"
					class="mx-auto"
				/>
				<Button
					@click="submitForm(this.formData)"
					label="UPDATE"
					color="success"
					icon="fa-solid fa-pen mr-1"
					:loading="saving"
					:disabled="saving"
					v-if="!formViewing && !forDeletion"
					class="mx-auto"
				/>
				<Button
					@click="onClose()"
					label="CANCEL"
					color="danger"
					icon="fa-solid fa-xmark"
					:disabled="saving"
					v-if="forDeletion"
					outlined
					class="mx-auto"
				/>
				<Button
					@click="onDelete(this.formData.id)"
					label="CONFIRM"
					color="danger"
					icon="fa-solid fa-trash-can"
					:loading="saving"
					:disabled="saving"
					v-if="forDeletion"
					class="mx-auto"
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
import { usePaymentCategoryStore } from "../../../stores/PaymentCategoryStore";
import { storeToRefs } from "pinia";
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
		formDataSelected: Object,
		forDeletion: Boolean,
	},
	data() {
		return {
			formData: {
				id: null,
				title: "",
				description: "",
				status: "",
			},
			formDelete: {
				id: null,
				is_deleted: true,
			},
			roles: [],
			formViewing: true,
			creator: "",
		};
	},
	methods: {
		toggleFormType() {
			this.formViewing = !this.formViewing;
		},
		dropdownSelected(value) {
			this.formData.status = value;
		},
		onDelete(id) {
			this.formDelete.id = id;
			this.submitForm(this.formDelete);
		},
		onClose() {
			this.$emit("close-form");
		},
	},
	created() {
		this.formData.id = this.formDataSelected.id;
		this.formData.title = this.formDataSelected.title;
		this.formData.description = this.formDataSelected.description;
		this.formData.status = this.formDataSelected.status;
		this.creator =
			this.formDataSelected.firstname + " " + this.formDataSelected.lastname;
	},
	setup() {
		const paymentCategoryStore = usePaymentCategoryStore();
		// state and getters
		const { data, formDataSelected, saving } =
			storeToRefs(paymentCategoryStore);
		// actions
		const { submitForm } = paymentCategoryStore;
		// return
		return {
			data,
			formDataSelected,
			saving,
			submitForm,
		};
	},
};
</script>
