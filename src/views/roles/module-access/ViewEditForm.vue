<template>
	<div>
		<Modal
			@close-modal="onClose()"
			:label="!formViewing ? 'Edit Module Access' : 'View Module Access'"
			size="modal-sm"
		>
			<div class="grid grid-cols-1 gap-x-8 gap-y-3 justify-items-stretch">
				<div
					v-for="module in modules"
					class="mt-2"
				>
					<div class="text-lg">
						{{ module.page.title }}
					</div>
					<div class="mt-1 grid grid-cols-4">
						<div>
							<input
								type="checkbox"
								v-model="module.actions.create"
								:disabled="formViewing"
								:class="[formViewing && 'cursor-not-allowed']"
							/>
							Create
						</div>
						<div>
							<input
								type="checkbox"
								v-model="module.actions.read"
								:disabled="formViewing"
								:class="[formViewing && 'cursor-not-allowed']"
							/>
							Read
						</div>
						<div>
							<input
								type="checkbox"
								v-model="module.actions.update"
								:disabled="formViewing"
								:class="[formViewing && 'cursor-not-allowed']"
							/>
							Update
						</div>
						<div>
							<input
								type="checkbox"
								v-model="module.actions.delete"
								:disabled="formViewing"
								:class="[formViewing && 'cursor-not-allowed']"
							/>
							Delete
						</div>
					</div>
				</div>
			</div>
			<div class="mt-5 w-full flex items-center gap-3">
				<Button
					@click="onClose()"
					label="CLOSE"
					color="danger"
					icon="fa-solid fa-xmark"
					:disabled="saving"
					v-if="formViewing"
					class="mx-auto"
				/>
				<Button
					@click="onClose()"
					label="CANCEL"
					color="danger"
					icon="fa-solid fa-xmark"
					:disabled="saving"
					v-if="!formViewing"
					class="mx-auto"
				/>
				<Button
					@click="toggleFormType()"
					label="EDIT"
					icon="fa-solid fa-pen mr-1"
					v-if="formViewing"
					class="mx-auto"
				/>
				<Button
					@click="submitForm(modules)"
					label="UPDATE"
					color="success"
					icon="fa-solid fa-pen mr-1"
					:loading="saving"
					:disabled="saving"
					v-if="!formViewing"
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
import { useModuleAccessStore } from "../../../stores/roles/ModuleAccessStore";
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
	},
	data() {
		return {
			modules: [],
			formData: {},
			roles: [],
			formViewing: true,
		};
	},
	created() {
		this.modules = JSON.parse(this.formDataSelected.pages);
		// SAMPLE
		// this.modules = [
		// 	{
		// 		page: {
		// 			id: 1,
		// 			title: "Event Category",
		// 			path: "/master/event-category",
		// 			icon: "fa fa-circle",
		// 		},
		// 		actions: {
		// 			create: true,
		// 			read: true,
		// 			update: true,
		// 			delete: false,
		// 		},
		// 	},
		// 	{
		// 		page: {
		// 			id: 2,
		// 			title: "Payment Category",
		// 			path: "/master/payment-category",
		// 			icon: "fa fa-circle",
		// 		},
		// 		actions: {
		// 			create: false,
		// 			read: false,
		// 			update: false,
		// 			delete: false,
		// 		},
		// 	},
		// ];
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
	setup() {
		const moduleAccessStore = useModuleAccessStore();
		// state and getters
		const { data, formDataSelected, saving } = storeToRefs(moduleAccessStore);
		// actions
		const { submitForm } = moduleAccessStore;
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
