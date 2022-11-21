import { defineStore } from "pinia";

export const useEventCategoryStore = defineStore("eventCategoryStore", {
	state: () => ({
		token:
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2NiYmFlMS1jMmUyLTQ2ODgtOTQwZS03NTBlYjVmZGU0YTMiLCJqdGkiOiI1OGQ2Yzc4OGVhOWFkZmIzNzAxMzg4NjkyNGQ5ODFkMDU5MDE4ZjI5YTZiODE2NjQwNTAxN2QyZGZlNjFhZmEwMmJiYzk3ZDFhYjE0MDQxZCIsImlhdCI6MTY2OTAxMjc4MS41ODc2OTUsIm5iZiI6MTY2OTAxMjc4MS41ODc2OTcsImV4cCI6MTY2OTA0ODc4MS41ODEzMzMsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.TlSjdqDg7Ujc-ERLVI5HhEQogCdU0BlZD16tUS1BY-Zjr7guQ4dzPMf2wkz1kxOtDinyIeeddODxyQ0clMrAhzn03eFxgvvqC3p6v1xpktIJYTyWI3vs3otJyNyc8q_33vncx4bCVEXKkKuFsN4-2W2P4QfMGQVCTjcGUbbgLcEGJ7AjGneDoHbqGNTKrWaJu5k5mQ0x1wzTAqFGxBTTxItbrikKkendpwbx7WcMXKbW0Anhqf4gpb19kAj7dMWl9n9EIi9ETEetD6vlR-MsaP25QqF4S_El3DR4HDOQk7BLyzS6wLAjFZbTDHLVvliKSIl4YfNkaZb7nkCnctnCwVD8GNqzWZenXSRAUCtESVKGh0DjWEPimPRCmrcAz_3hnKY4M_T0INMTgv9LIBrKp8Lv3aRnOx54Dt44sntiTn6nxMfXi2EbO2X3jFUPDN4oN2XZ0EHu6r8z9qThGpbAlKw515dkOFPhFAJ7FA4FG0y7gmMESVqwiLlIMLIDjMZnENEvHr8n-D4Fl6cN7b99DixvP71rQEJVkTUwxYSj7msfkInql3lvHzftJA5_K-pRqlfQQzP3wU9vs9TcSQjPuDOMxNBWOHzLSa-bPjtR6iIt7Xc-qRGXqWSC9nsUeNGPaYAS1f5MggoDa-Ebd_KSF0BmewaHb_pV_SRcs-Iq95E",
		domain: "192.168.1.24",
		port: "8000",
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
	}),
	actions: {
		getPageLink() {
			this.pageLink =
				"http://" +
				this.domain +
				":" +
				this.port +
				"/api/master/event-category/get/all";
		},
		toggleCreateForm() {
			this.showCreateForm = !this.showCreateForm;
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
			var module = "/api/master/event-category/";
			if (methodUsed === "save") {
				url = protocol + this.domain + ":" + this.port + module + "create";
			} else if (methodUsed === "update") {
				url = protocol + this.domain + ":" + this.port + module + "edit";
			} else {
				url = protocol + this.domain + ":" + this.port + module + "delete";
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
				responseMessage = "Event Category Added";
			} else if (methodUsed === "update") {
				method = "POST";
				body = this.formDataSelected;
				responseMessage = "Event Category Updated";
			} else {
				method = "POST";
				body = this.formDataSelected;
				responseMessage = "Event Category Deleted";
			}

			await fetch(url, {
				method: method,
				headers: {
					"Content-type": "application/json",
					KEY: "$2y$10$BaPrYesKdAQDgpYk1sVK5.vhfoXkgEfD6VvLMCgA0uaNs7I58TKE2",
					Authorization: "Bearer " + this.token,
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
		// async getRecord(id) {
		// 	this.fetching = true;
		// 	this.showViewEditForm = true;
		// 	await fetch("http://192.168.1.3:8081/api/master/event-category/" + id, {
		// 		method: "GET",
		// 		headers: {
		// 			"Content-type": "application/json",
		// 			KEY: "$2y$10$BaPrYesKdAQDgpYk1sVK5.vhfoXkgEfD6VvLMCgA0uaNs7I58TKE2",
		// 			Authorization: "Bearer " + this.token,
		// 		},
		// 	})
		// 		.then((res) => res.json())
		// 		.then((response) => {
		// 			this.message = response;
		// 			this.formDataSelected = response.data;
		// 			this.fetching = false;
		// 			this.loading = false;
		// 		})
		// 		.catch((error) => {
		// 			this.message = error;
		// 			this.loading = false;
		// 		});
		// },
	},
});
