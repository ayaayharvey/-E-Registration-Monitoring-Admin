<template>
	<Header :component_name="$route.name">
		<Button
			@click="toggleCreateForm()"
			:label="'ADD ' + $route.name"
			outlined
			icon="fa-solid fa-plus mr-1"
		/>
	</Header>
	<Alert
		@close-modal="toggleAlert()"
		:alertType="actionResponse.responseStatus"
		:message="actionResponse.responseMessage"
		:buttonConfirm="actionResponse.responseStatus === 'success'"
		:buttonClose="actionResponse.responseStatus === 'error'"
		v-if="modalAlert"
	/>
	<Alert
		@close-modal="toggleAlert()"
		:alertType="actionResponse.responseStatus"
		:message="actionResponse.responseMessage"
		:buttonConfirm="actionResponse.responseStatus === 'success'"
		:buttonClose="actionResponse.responseStatus === 'error'"
		v-if="modalAlert"
	/>
	<CreateForm
		@close-form="toggleCreateForm()"
		v-if="showCreateForm"
	/>
	<ViewEditForm
		@close-form="closeViewEditForm()"
		:formDataSelected="formDataSelected"
		:forDeletion="forDeletion"
		v-if="showViewEditForm"
	/>
	<div class="w-full">
		<Body>
			<Table label="Categories">
				<TableHead>
					<TableData v-for="tableLabel in tableLabels">
						{{ tableLabel }}
					</TableData>
					<TableData class="">
						<div class="flex justify-center gap-2">Actions</div>
					</TableData>
				</TableHead>
				<!-- loop -->
				<TableBody
					v-if="data?.data?.length > 0 && !loading"
					v-for="row in data?.data"
					:key="row.id"
				>
					<tr
						class="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition"
					>
						<TableData>
							<div class="flex">
								<!-- <input
									type="checkbox"
									class="checked:bg-blue-500 mr-4 cursor-pointer"
								/> -->
								{{ row.title }}
							</div>
						</TableData>
						<TableData>{{ row.description }}</TableData>
						<TableData class="uppercase">{{ row.status }}</TableData>
						<TableData>{{ row.creator.full_name }}</TableData>
						<TableData>
							<div class="flex justify-center gap-2">
								<button
									@click="openViewEditForm(row.id, false)"
									class="fa-solid fa-eye text-blue-900 cursor-pointer justify-end"
								></button>
								<button
									@click="openViewEditForm(row.id, true)"
									class="fa-solid fa-trash-can text-red-700 cursor-pointer justify-end"
								></button>
							</div>
						</TableData>
					</tr>
				</TableBody>
				<!-- end loop -->
				<!-- empty data -->
				<TableBody v-if="data?.data?.length < 1 && !loading">
					<tr
						class="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition"
					>
						<TableData
							v-if="!loading"
							colspan="5"
							class="text-center"
						>
							NO RECORD FOUND
						</TableData>
						<TableData
							v-if="loading"
							colspan="5"
							class="text-center"
						>
							<i class="fa-solid fa-spinner animate-spin text-3xl"></i>
						</TableData>
					</tr>
				</TableBody>
				<!-- empty data -->
				<!-- loading data -->
				<TableBody v-if="loading">
					<tr
						class="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition"
					>
						<TableData
							colspan="5"
							class="text-center"
						>
							<div class="w-full justify-center flex items-center">
								<i class="fa-solid fa-spinner animate-spin text-3xl mr-3"></i>
								<span class="font-semibold"> LOADING </span>
							</div>
						</TableData>
					</tr>
				</TableBody>
				<!-- loading data -->
			</Table>
			<Pagination
				@next-page="data?.next_page_url && togglePage(data?.next_page_url)"
				@prev-page="data?.prev_page_url && togglePage(data?.prev_page_url)"
				:current_page="data.current_page"
				:last_page="data.last_page"
				:total="data.total"
				v-if="data?.data?.length > 0"
			/>
		</Body>
	</div>
</template>

<script>
import Header from "../../../components/layout/Header.vue";
import Body from "../../../components/layout/Body.vue";
import CreateForm from "./CreateForm.vue";
import ViewEditForm from "./ViewEditForm.vue";
import Alert from "../../../components/layout/Alert.vue";
import Button from "../../../components/layout/Button.vue";
import Table from "../../../components/layout/table/Table.vue";
import TableHead from "../../../components/layout/table/TableHead.vue";
import TableBody from "../../../components/layout/table/TableBody.vue";
import TableData from "../../../components/layout/table/TableData.vue";
import Pagination from "../../../components/layout/Pagination.vue";
import { useEventCategoryStore } from "../../../stores/EventCategoryStore";
import { storeToRefs } from "pinia";
export default {
	name: "EventCategory",
	components: {
		Header,
		CreateForm,
		ViewEditForm,
		Alert,
		Body,
		Button,
		Table,
		TableHead,
		TableBody,
		TableData,
		Pagination,
	},
	data() {
		return {
			formDataSelected: {},
			tableLabels: ["Title", "Description", "Status", "Creator"],
			data: {},
		};
	},
	// methods: {
	// 	getRecord(id) {
	// 		this.formDataSelected = this.data?.data.find((x) => x.id === id);
	// 		this.showViewEditForm = !this.showViewEditForm;
	// 	},
	// },
	created() {
		this.getPage();
	},
	setup() {
		const eventCategoryStore = useEventCategoryStore();
		// state and getters
		const {
			data,
			pageLink,
			loading,
			showCreateForm,
			showViewEditForm,
			modalAlert,
			actionResponse,
			forDeletion,
		} = storeToRefs(eventCategoryStore);
		// actions
		const {
			toggleCreateForm,
			openViewEditForm,
			closeViewEditForm,
			toggleAlert,
			togglePage,
			getPage,
		} = eventCategoryStore;
		// return
		return {
			data,
			pageLink,
			loading,
			showCreateForm,
			showViewEditForm,
			modalAlert,
			actionResponse,
			forDeletion,
			toggleCreateForm,
			openViewEditForm,
			closeViewEditForm,
			toggleAlert,
			togglePage,
			getPage,
		};
	},
};
</script>
