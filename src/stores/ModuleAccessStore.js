import { defineStore } from "pinia";

export const useModuleAccessStore = defineStore("moduleAccessStore", {
	state: () => ({
		token:
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2NkZDMwOC03MWJkLTQ1ODMtYmU0ZC0xZTg0ZjdiOTUyYWIiLCJqdGkiOiIxZWNmNWQ4YzY1Nzc0NWJmNTJjYjk2NDBhZDFjNzMyZmJiMjE2NmI3YWI2MzZmMDE1NjljNDMwM2Q1NDNlMmJjZjNhMTU0MWE0YWFkNDA0YSIsImlhdCI6MTY2OTEzNzQ4My44NjgxMTEsIm5iZiI6MTY2OTEzNzQ4My44NjgxMjIsImV4cCI6MTY2OTE3MzQ4My44MTU4MDMsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.BVZhruVUBNbLYFkn5PYJmiC4ON-gSODC_LRpgYpagbiG5gytOZ-JzbtFX_14wH0qIQirihs6UPDlInDWfmINGCaB8NTf_FjOXr8qRQzkgla7pQT5cF3pYfBMrg9xfTMZvUF9FSQnIv-5znP7cJiyaT_pvxk54K2A4PaWu1I41rSr6F1QjsyUDfcFhZzXGB_DkOYuBRg-0wJ__JrVk14UcQQRXM1u3IlZGfLrvURpyDqMgeSdVkZFYNOxn7EPfMqDiA1LzziL08En8URldj9pQ49ZWaq6oqIAwzbOkTGKv6O1lAdvOD2rKdIY96kjLckPNq6dX2sw8juczTCzFAWyWUOSb_o8xNMmeo1ilFAevSKM1nf-UbBpU6l_xX-YEPcSF7Ia9sIeMNXw5E71Lt0_vCoPsnvGjH4JRziKjFq0jw096ZgeWLVjOl5gOiaDntL1A9pSNmrHU3z8i-0jMao_T1ONawui-12KQ_5FO1KgYM9odXZRlAYSQHFu8WUmQB7jicLpF2JTuutB9DdKseWmc768bkxQF_YH6Yf2yvnsDK9Rj3hWbf5sEFjre2iemvoevO3Aq3uPitrSTobechvsjBmKQBEL0mp9kYoRJW4BDq2Bve0jMg5MOMshV84BddDNA7w1xsgnO2grumYVzks-FUbGdXlQ2MBw1LNhxxXHnYM",
		domain: "192.168.1.25",
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
				"/api/master/access/get/all";
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
			var module = "/api/master/access/";
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
				responseMessage = "Module Access Added";
			} else if (methodUsed === "update") {
				method = "POST";
				body = this.formDataSelected;
				responseMessage = "Module Access Updated";
			} else {
				method = "POST";
				body = this.formDataSelected;
				responseMessage = "Module Access Deleted";
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
	},
});
