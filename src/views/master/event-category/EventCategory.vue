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
				</TableBody>
				<!-- endloop -->
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
							<i class="fa-solid fa-spinner animate-spin text-3xl"></i>
						</TableData>
					</tr>
				</TableBody>
				<!-- loading data -->
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
		Table,
		TableHead,
		TableBody,
		TableData,
		Pagination,
	},
	data() {
		return {
			formData: {},
			loading: true,
			showCreateForm: false,
			showViewEditForm: false,
			tableLabels: ["Title", "Description", "Status", "Creator"],
			data: {},
		};
	},
	methods: {
		openCreateForm() {
			this.showCreateForm = !this.showCreateForm;
		},
		openViewEditForm(id) {
			this.formData = this.data.data.find((x) => x.id === id);
			this.showViewEditForm = !this.showViewEditForm;
		},
		closeCreateForm() {
			this.showCreateForm = false;
		},
		closeViewEditForm() {
			this.showViewEditForm = false;
		},
	},
	mounted() {
		const token =
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2IwOGI1OC00MzJlLTQxMjItYjBhNi02N2JiMmZkOTdjY2IiLCJqdGkiOiI0MWYxZjZiZmVmOGM4ZjFiMDg0YzgyZWE2ZjYyYWQxZjc1MjI3NDkwNzlkODY4ODc2NzRlY2U3MmZhYTQ5NmYzMDg1MjFlOTIzOGVmMDIwMCIsImlhdCI6MTY2Nzg0NzYxNy40MzYyOTcsIm5iZiI6MTY2Nzg0NzYxNy40MzYzMDEsImV4cCI6MTY2Nzg4MzYxNy40Mjc4NjgsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.CyrFdt3eDiAldyOz5_YH_TsQRqxASacHvqc5piw7iGc48QeKUZS4eSAQvHK2hOGrYTcV6c352ZsoVhGI9KB5zAqizAuKy1YrR8lfZMCjXHHzLcyiGC1bhxsWjgtcgxnaHpPA_QRaXrEXsszVk0te5gUFhC6Kbdx_frkiNh61u6gDJr6aNDXzxBkMluNOVZXtMo9TXyIqOLalzBWMObFyGsg0a3N-nPNiaToJg-5-shTc_Q8UkP8PN-2eXDfuT3tNkzUZW2AkfGZ1Q_TEjYRunB9ZZgBWlp9T6FxMj5VJx7YOtVKoscD-6NM4V9F2Gef23Wi5c_j6Xd7lUgY4fT82S_Q0WtP29GIDHqe-MQK43VqVrmhlRHMyHmhSlJzWXviYMXxWlG5ruzBiwgqpNcYS65q3e1_oBNAIDJZE2_p0cVLy22kCIzqX0PHXFrkfmZP9NCYGQbwSoRohC_eZ9O00Ra5teGS9qZ_H7UwcgrkDrSq6fO5AfCyOsoudBB5KDE8q1mlBbcS0N7X683Peup8CBswrwcfdSTM-Z8LYpuIq5peF-rY9e-iLBQPrwwDsAgcxvhrM0aS9f-U-AAnRoI-4JFW4fJo4F9eo1nPX1VleYnoBh75lKue5lGPPu9ez2KQkJrVFNC8xJNw_5DDON6rszVlZ5oMiea3Qxh6edW-vQ6c";

		fetch(
			"http://192.168.1.3:8081/api/master/event-category/get/all",
			{
				method: "GET",
				headers: {
					"Content-type": "application/json",
					KEY: "$2y$10$BaPrYesKdAQDgpYk1sVK5.vhfoXkgEfD6VvLMCgA0uaNs7I58TKE2",
					Authorization: "Bearer " + token,
				},
			},
			{ headers: { "Content-type": "application/json" } }
		)
			.then((res) => res.json())
			.then((response) => {
				this.message = response;
				this.data = response.data;
				this.loading = false;
			})
			.catch((error) => {
				this.message = error;
				this.loading = false;
			});
	},
};
</script>
