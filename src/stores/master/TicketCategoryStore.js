import { defineStore } from "pinia";
import { useLoginStore } from "../login/LoginStore";

export const useTicketCategoryStore = defineStore("ticketCategoryStore", {
	state: () => ({
		pageLink: "",
		data: [],
		formData: {
			id: null,
			title: "",
			description: "",
			status: "active",
		},
		formDataSelected: {},
		showCreateForm: false,
		showViewEditForm: false,
		saving: false,
		loading: true,
		fetching: true,
		modalAlert: false,
		actionResponse: {
			responseStatus: "",
			responseMessage: "",
		},
		forDeletion: false,
		loginStore: useLoginStore(),
	}),
	actions: {
		getPageLink() {
			this.pageLink =
				"http://" +
				this.loginStore.domain +
				":" +
				this.loginStore.port +
				"/api/master/ticket-category/get/all";
		},
		toggleCreateForm() {
			this.showCreateForm = !this.showCreateForm;
			this.formData = {
				id: null,
				title: "",
				description: "",
				status: "active",
			};
		},
		openViewEditForm(id, method) {
			this.forDeletion = method;
			this.formDataSelected = this.data?.data.find((x) => x.id === id);
			this.showViewEditForm = !this.showViewEditForm;
		},
		closeViewEditForm() {
			this.showViewEditForm = false;
		},
		toggleAlert() {
			this.modalAlert = false;
		},
		togglePage(requestURL) {
			this.pageLink = requestURL;
			this.getPage();
		},
		getURL(methodUsed) {
			var protocol = "http://";
			var url = "";
			var module = "/api/master/ticket-category/";
			if (methodUsed === "save") {
				url =
					protocol +
					this.loginStore.domain +
					":" +
					this.loginStore.port +
					module +
					"create";
			} else if (methodUsed === "update") {
				url =
					protocol +
					this.loginStore.domain +
					":" +
					this.loginStore.port +
					module +
					"edit";
			} else {
				url =
					protocol +
					this.loginStore.domain +
					":" +
					this.loginStore.port +
					module +
					"delete";
			}
			return url;
		},
		clearForm() {
			this.data = [];
			this.formData = {
				id: null,
				title: "",
				description: "",
				status: "active",
			};
			this.formDataSelected = {};
		},
		submitForm(form) {
			this.saving = true;
			this.formDataSelected = form;
			if (form.id === null) this.onSubmit("save");
			else if (form.is_deleted) this.onSubmit("delete");
			else this.onSubmit("update");
		},
		async onSubmit(methodUsed) {
			var url = this.getURL(methodUsed);
			var method = "";
			var body = {};
			var responseMessage = "";
			if (methodUsed === "save") {
				method = "POST";
				body = this.formData;
				responseMessage = "Ticket Category Added";
			} else if (methodUsed === "update") {
				method = "POST";
				body = this.formDataSelected;
				responseMessage = "Ticket Category Updated";
			} else {
				method = "POST";
				body = this.formDataSelected;
				responseMessage = "Ticket Category Deleted";
			}

			await fetch(url, {
				method: method,
				headers: {
					"Content-type": "application/json",
					KEY: "$2y$10$BaPrYesKdAQDgpYk1sVK5.vhfoXkgEfD6VvLMCgA0uaNs7I58TKE2",
					Authorization: "Bearer " + this.loginStore.token,
				},
				body: JSON.stringify(body),
			})
				.then((data) => {
					if (!data.ok) {
						throw Error(data.status);
					} else {
						this.clearForm();
						this.getPage();
					}
					return data.json();
				})
				.then((responseData) => {
					this.showCreateForm = false;
					this.showViewEditForm = false;
					this.saving = false;
					this.actionResponse.responseStatus =
						responseData.request_status.message;
					if (this.actionResponse.responseStatus === "success") {
						this.actionResponse.responseMessage = responseMessage;
					} else this.actionResponse.responseMessage = "Attempt Unsuccessful!";
					this.modalAlert = true;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async getPage() {
			this.loading = true;
			await fetch(this.pageLink, {
				method: "GET",
				headers: {
					"Content-type": "application/json",
					KEY: "$2y$10$BaPrYesKdAQDgpYk1sVK5.vhfoXkgEfD6VvLMCgA0uaNs7I58TKE2",
					Authorization: "Bearer " + this.loginStore.token,
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
