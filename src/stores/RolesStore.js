import { defineStore } from "pinia";

export const useRolesStore = defineStore("rolesStore", {
	state: () => ({
		token:
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2QyOTJlYy01N2RjLTRlNTgtYTEzMy1lMzRiMTQ4NDM3YWMiLCJqdGkiOiI1YTE0MDA4NGQzYzUyMjZmMTU3NmI4MjBlZDZhYjllYmE5YzZmZjMzOWJmZGNlMjNkYzdkZGI2OGY4NGU0MDliZmZmZTE1ZmZjMGY2YmI5NCIsImlhdCI6MTY2OTMwNzI4NS4wMzc4MTMsIm5iZiI6MTY2OTMwNzI4NS4wMzc4MiwiZXhwIjoxNjY5MzQzMjg1LjAyNDAxOCwic3ViIjoiMSIsInNjb3BlcyI6W119.PAcV8dmkR3Fc1ywsRNDaXmnsQCi_-AsRfwb5ufxs2zlh-VMBKaR0SbmkX4n-MCqiRE3XaqszlUHudZblu8Vg1IJ03WQ77e4CkWpvsXnM97qjPEhING58DdpnbNdtriz3362lX56oO2Umkiq1gc7-BGZw1BVAEzQLxo2LJqjEJOK3F0x766vB9_PBTZteP7HweoK2HqYU8rq9cK-JRmTrTYEZk3175RfFNWvnxj7yzxOu4cPh-WKNVzE19wqtwSNABP1nSV4s4OISZsCLGWDVnaIW6jz4yFmOl1Awf8W1u36Sfjj43FfLnPkeJzjhezwkPcndc5PDJnQlR2_uKVb7Fse9ln00tmdyxooe95b8EEglasVyhm06qxoQNKgIrVV7iFmwifZR60k3O394e40ArR40-96CKeURVndXos0p4ZoCjC6gWr2EgCX6GGkBc5ZXqU32vCRM85rA8DNK_jexOGDxA7vAHOwlYK1ao1digEM3wm5l3TipG3VqVKfvwOnIcnHgrFfSXamXS3HrqVLS4yNRdRLl7HshxZiuxxqb82V48FSCef4KyEkGr-Ak14gp_CwRvFrz62jpSuSTQCNX4d3dz1i-MHnmBXiJX1hNvd2LiVx8jnKss9JNf3Lri3-70PNogTomvOLXTx2iVhO_EpYMyw6FT1b3PRvFBws_Bis",
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
				"http://" + this.domain + ":" + this.port + "/api/master/roles/get/all";
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
			var module = "/api/master/roles/";
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
				this.formData.data_name = this.formData.title
					.toLowerCase()
					.replace(/\s/g, "-");

				body = this.formData;

				responseMessage = "Roles Added";
			} else if (methodUsed === "update") {
				method = "POST";
				body = this.formDataSelected;
				responseMessage = "Roles Updated";
			} else {
				method = "POST";
				body = this.formDataSelected;
				responseMessage = "Roles Deleted";
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
