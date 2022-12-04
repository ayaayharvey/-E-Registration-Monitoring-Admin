<template>
	<div>
		<Modal
			@close-modal="onClose()"
			label="Add Rate Percentage"
			size="modal-xs"
		>
			<div class="grid grid-cols-1 gap-x-8 gap-y-3">
				<Textbox
					label="Rate Percentage Title"
					v-model="formData.title"
					placeholder="Type text here"
				/>
				<TextArea
					label="Description"
					v-model="formData.description"
					placeholder="Type text here"
				/>
				<Textbox
					label="Percentage"
					type="number"
					v-model="formData.percent"
					placeholder="Type percentage here"
				/>
			</div>
			<div class="w-full flex items-center mt-3 gap-3">
				<Button
					@click="toggleCreateForm()"
					label="CLOSE"
					color="danger"
					icon="fa-solid fa-xmark"
					:disabled="saving"
				/>
				<Button
					@click="submitForm(formData)"
					label="SAVE"
					color="success"
					icon="fa-solid fa-floppy-disk"
					:loading="saving"
					:disabled="saving"
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
import { useEventRatePercentageStore } from "../../../stores/master/EventRatePercentageStore";
import { storeToRefs } from "pinia";
export default {
	name: "CreateForm",
	components: {
		Modal,
		Textbox,
		TextArea,
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
	setup() {
		const eventRatePercentageStore = useEventRatePercentageStore();
		const { formData, saving } = storeToRefs(eventRatePercentageStore);
		const { toggleCreateForm, submitForm, onSubmit } = eventRatePercentageStore;
		return { formData, saving, toggleCreateForm, submitForm, onSubmit };
	},
};
</script>
