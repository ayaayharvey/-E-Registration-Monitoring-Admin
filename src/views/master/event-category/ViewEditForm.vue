<template>
	<div>
		<Modal
			@close-modal="onClose()"
			label="Category Details"
			size="modal-xs"
		>
			<div
				class="w-full justify-center flex items-center"
				v-if="fetching"
			>
				<i class="fa-solid fa-spinner animate-spin text-3xl mr-3"></i>
				<span class="font-semibold"> LOADING </span>
			</div>
			<div
				class="grid grid-cols-1 gap-x-8 gap-y-3 justify-items-stretch"
				v-if="!fetching"
			>
				<Textbox
					label="Category Title"
					:value="formDataSelected.title"
					v-model="formDataSelected.title"
					placeholder="Type text here"
					:disabled="formViewing"
				/>
				<TextArea
					label="Description"
					:value="formDataSelected.description"
					v-model="formDataSelected.description"
					placeholder="Type text here"
					:disabled="formViewing"
				/>
				<Dropdown
					label="Status"
					:value="formDataSelected.status"
					@selected="dropdownSelected"
					:selections="['active', 'inactive']"
					:disabled="formViewing"
				/>
				<!-- <Textbox
					label="Creator"
					:value="formDataSelected?.title"
					placeholder="Type text here"
					:disabled="formViewing"
				/> -->
			</div>
			<div
				class="mt-5 w-full flex items-center gap-3"
				v-if="!fetching"
			>
				<Button
					@click="onClose()"
					label="CLOSE"
					color="danger"
					icon="fa-solid fa-xmark"
					v-if="formViewing"
				/>
				<Button
					@click="onClose()"
					label="CANCEL"
					color="danger"
					icon="fa-solid fa-xmark"
					:disabled="saving"
					v-if="!formViewing"
				/>
				<Button
					@click="toggleFormType()"
					label="EDIT"
					icon="fa-solid fa-pen mr-1"
					v-if="formViewing"
				/>
				<Button
					@click="submitForm(formDataSelected?.id)"
					label="UPDATE"
					color="success"
					icon="fa-solid fa-pen mr-1"
					:loading="saving"
					:disabled="saving"
					v-if="!formViewing"
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
import { useEventCategoryStore } from "../../../stores/EventCategoryStore";
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
			roles: [],
			formViewing: true,
		};
	},
	methods: {
		toggleFormType() {
			this.formViewing = !this.formViewing;
		},
		dropdownSelected(value) {
			this.formDataSelected.status = value;
		},
		onClose() {
			this.$emit("close-form");
		},
	},
	setup() {
		const eventCategoryStore = useEventCategoryStore();
		// state and getters
		const { formDataSelected, saving, fetching } =
			storeToRefs(eventCategoryStore);
		// actions
		const { submitForm } = eventCategoryStore;
		// return
		return {
			formDataSelected,
			saving,
			fetching,
			submitForm,
		};
	},
};
</script>
