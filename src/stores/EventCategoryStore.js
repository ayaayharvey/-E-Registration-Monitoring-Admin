import { defineStore } from "pinia";

export const useEventCategoryStore = defineStore("eventCategoryStore", {
	state: () => ({
		token:
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2IwOGI1OC00MzJlLTQxMjItYjBhNi02N2JiMmZkOTdjY2IiLCJqdGkiOiI4ZWViYTFmZGQzNzNiYmRhMGUzYmFjOTQ0NDE4YjJkZjM3NmZmZmQ4N2ZlNjRmMmExNzkxMjdjYWU1ZDM4YThiNWE1MjdhOWE5YjdlNzNkYiIsImlhdCI6MTY2Nzg4NDA3OC4zMDE0MTIsIm5iZiI6MTY2Nzg4NDA3OC4zMDE0MTYsImV4cCI6MTY2NzkyMDA3OC4yOTMyNDgsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Vk_ZvSPVsO290LHYZUIcnROh2BAhqHXvwtyuzCYBKcCIgYLlsLqqt9PHh-jydrt9DH0GdNhCkcju9PaaM14_9aXW7rC3gSZCt8S74bncPJgxSKgalRcQz1dZB_UMYu31BthgZqjwCzRVyawP0d6ETCAOL36Iu_iCckDrjeOwm7pRPhBOutHmKgB1RfgN_GxieExxQW1oMXvGUSQWdBuEqbTVJh47pVT40hXkFR3xZ5sgwB2Uuqc8ZqOFDzwFcJsHbQRsUNQvzxst5zqTYYEF4Bb4tm9IxAjqwuVNsok4zc-kVFU2-Lpki3gZS8RaPgggmlaFh42wGUYO0BWghTl1lNjF02FE_cHRD1VFB7yjwCB-JFR52qIyXOzhfP-0aDhQrPc7_WSSv0IhXYPMwHtR1EDsz5pPT_XmQ4_18vr_7nBbIB4sYp2lbAKqtxvvNwnlc9PWHIv5eYqdvrzxC1nsPnafZ1sGuv6mFtwe7Y3A94-2j0JUkZ4KIsZ3WMkYOSJh_vhMOS3998hbCTDDzvsHtCWWKfX8E2ijXyrvVDp0b_vlNYPmNfMv0GbrnUtguHHJPz6wfbgR-MRDt_cRgpop-4QdVn_jPtiWwoIgbOc7XcTX8tuzg1DlE6eF72QuaGPY6iFC1iasd6ltraykpIk5bsa48bitLthu-BWOCmbFvh0",
		data: [],
		formData: {
			title: "",
			description: "",
			status: "active",
		},
		showCreateForm: false,
		showViewEditForm: false,
		saving: false,
		loading: true,
		modalAlert: false,
		responseStatus: "",
	}),
	actions: {
		toggleCreateForm() {
			this.showCreateForm = !this.showCreateForm;
		},
		openViewEditForm(id) {
			this.formData = this.data.data.find((x) => x.id === id);
			this.showViewEditForm = !this.showViewEditForm;
		},
		closeViewEditForm() {
			this.showViewEditForm = false;
		},
		toggleAlert() {
			this.modalAlert = false;
		},
		async onSave() {
			this.saving = true;
			await fetch("http://192.168.1.3:8081/api/master/event-category/create", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					KEY: "$2y$10$BaPrYesKdAQDgpYk1sVK5.vhfoXkgEfD6VvLMCgA0uaNs7I58TKE2",
					Authorization: "Bearer " + this.token,
				},
				body: JSON.stringify(this.formData),
			})
				.then((data) => {
					if (!data.ok) {
						throw Error(data.status);
					} else {
						this.showCreateForm = false;
						this.saving = false;
						this.responseStatus = "success";
						this.modalAlert = true;
						this.getAll();
					}
					return data.json();
				})
				.then((responseData) => {})
				.catch((error) => {
					console.log(error);
				});
		},
		async getAll() {
			await fetch("http://192.168.1.3:8081/api/master/event-category/get/all", {
				method: "GET",
				headers: {
					"Content-type": "application/json",
					KEY: "$2y$10$BaPrYesKdAQDgpYk1sVK5.vhfoXkgEfD6VvLMCgA0uaNs7I58TKE2",
					Authorization: "Bearer " + this.token,
				},
			})
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
	},
});
