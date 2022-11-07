<template>
	<Header
		:component_name="$route.name"
		button_label="ha"
	>
		<Button
			@click="openCreateForm()"
			:label="'ADD ' + $route.name"
			outlined
			icon="fa-solid fa-plus mr-1"
		/>
	</Header>
	<CreateForm
		@close-form="closeCreateForm()"
		v-if="showCreateForm"
	/>
	<ViewEditForm
		@close-form="closeViewEditForm()"
		v-if="showViewEditForm"
		:formData="formData"
	/>
	<div class="w-full">
		<Body>
			<SearchBox />
			<Table label="Categories">
				<TableHead>
					<TableData v-for="tableLabel in tableLabels">
						{{ tableLabel }}
					</TableData>
					<TableData class="">
						<div class="flex justify-center gap-2">Actions</div>
					</TableData>
				</TableHead>
				<TableBody
					v-if="data.length > 0"
					v-for="row in data"
					:key="row.id"
				>
					<!-- loop -->
					<tr
						class="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition"
					>
						<TableData>{{ row.title }}</TableData>
						<TableData>{{ row.description }}</TableData>
						<TableData class="uppercase">{{ row.status }}</TableData>
						<TableData>{{ row.creator.full_name }}</TableData>
						<TableData>
							<div class="flex justify-center gap-2">
								<button
									@click="openViewEditForm(row.id)"
									class="fa-solid fa-eye text-blue-900 cursor-pointer justify-end"
								></button>
							</div>
						</TableData>
					</tr>
					<!-- endloop -->
				</TableBody>
				<!-- empty data -->
				<TableBody v-if="data.length < 1">
					<tr
						class="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition"
					>
						<TableData
							colspan="5"
							class="text-center"
							>NO RECORD FOUND</TableData
						>
					</tr>
				</TableBody>
				<!-- empty data -->
			</Table>
			<Pagination />
		</Body>
	</div>
</template>

<script>
import Header from "../../../components/layout/Header.vue";
import Body from "../../../components/layout/Body.vue";
import CreateForm from "./CreateForm.vue";
import ViewEditForm from "./ViewEditForm.vue";
import Button from "../../../components/layout/Button.vue";
import SearchBox from "../../../components/layout/SearchBox.vue";
import Table from "../../../components/layout/table/Table.vue";
import TableHead from "../../../components/layout/table/TableHead.vue";
import TableBody from "../../../components/layout/table/TableBody.vue";
import TableData from "../../../components/layout/table/TableData.vue";
import Pagination from "../../../components/layout/Pagination.vue";
export default {
	name: "PageMaster",
	components: {
		Header,
		CreateForm,
		ViewEditForm,
		Body,
		Button,
		SearchBox,
		Table,
		TableHead,
		TableBody,
		TableData,
		Pagination,
	},
	data() {
		return {
			formData: {},
			showCreateForm: false,
			showViewEditForm: false,
			tableLabels: ["Title", "Description", "Status", "Creator"],
			data: [
				{
					id: 1,
					title: "HIPHOP",
					description: "Hiphop event",
					status: "active",
					creator: {
						id: 1,
						full_name: "Harvey Aya-ay",
					},
				},
				{
					id: 2,
					title: "CORPORATE",
					description: "Corporate event",
					status: "inactive",
					creator: {
						id: 1,
						full_name: "Harvey Aya-ay",
					},
				},
			],
		};
	},
	methods: {
		openCreateForm() {
			this.showCreateForm = !this.showCreateForm;
		},
		openViewEditForm(id) {
			this.formData = this.data.find((x) => x.id === id);
			this.showViewEditForm = !this.showViewEditForm;
		},
		closeCreateForm() {
			this.showCreateForm = false;
		},
		closeViewEditForm() {
			this.showViewEditForm = false;
		},
	},
};
</script>
