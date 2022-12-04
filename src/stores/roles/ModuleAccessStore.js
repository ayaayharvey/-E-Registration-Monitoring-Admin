import { defineStore } from "pinia";
import { useLoginStore } from "../login/LoginStore";

export const useModuleAccessStore = defineStore("moduleAccessStore", {
	state: () => ({
		pageLink: "",
		data: [],
		formDataSelected: {},
		showViewEditForm: false,
		saving: false,
		loading: true,
		fetching: true,
		modalAlert: false,
		actionResponse: {
			responseStatus: "",
			responseMessage: "",
		},
		loginStore: useLoginStore(),
	}),
	actions: {
		getPageLink() {
			this.pageLink =
				"http://" +
				this.loginStore.domain +
				":" +
				this.loginStore.port +
				"/api/master/role-page-access/get/all";
		},
		openViewEditForm(id) {
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
		clearForm() {
			this.data = [];
			this.formDataSelected = {};
		},
		submitForm(modules) {
			this.formDataSelected.pages = modules;
			this.saving = true;
			this.onSubmit();
		},
		async onSubmit() {
			var url =
				"http://" +
				this.loginStore.domain +
				":" +
				this.loginStore.port +
				"/api/master/role-page-access/edit";
			var method = "POST";
			var body = this.formDataSelected;
			var responseMessage = "Module Access Updated";

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
