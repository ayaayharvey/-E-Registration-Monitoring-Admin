import { defineStore } from "pinia";

export const useRolesStore = defineStore("rolesStore", {
	state: () => ({
		token:
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2QwYWJhOC0xNmI2LTQ5ZTQtODlhYS1hYmU2YzM1OGUxMzgiLCJqdGkiOiIwYmExZmE5OWQ3ODk5NjdmNzY1MGQzNjliMDg1OWRhZWU1YjU3MmMwNDkwZThkNTdiMGRiNGI2ZmJmMDg3NWQ0YWMxMzlhZWZmMGQyY2MzNSIsImlhdCI6MTY2OTIzMTQwMy43NzgwOTIsIm5iZiI6MTY2OTIzMTQwMy43NzgwOTUsImV4cCI6MTY2OTI2NzQwMy43NTgzODQsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.F29scNXyliYZyeKzfKPYRCh_SKjILbc21TbhZ2q6akjQHh_0WH3Aee3-jdtdnb_dFVPlm3jjUO-mEpqNomznHel-cPAHjCc81hlf6_hxbUccpuHE3AD98-dFLaFHi67Dwykd-1g1wGCrxuCV0TcGvcbrluXiYomr6Gb-tOJ_J39C1GlY4aMDnh9HTekjZooRZQWYxHapMp1WKepUH4W9EhgmejClYBgDFwOiQp9F6UiZFnRflhf9RSGbYl4fqghTOqIlw6eFz1HSrCqRTEbb-cvb6AouQROjECyL78JFlO9v3g95VKW3q_Iz3PxU7ZAGsQJGmZmn5MiZ-ieW2OgFygu9vckpBqJnuo9YtVW6CJM_zkvx2DY97CybiabBnVCDAHFGClMLiZl4PmLrkMixCQaA-_E-Vuc8Xm5piB-lW7Xw_KFAaQLGzlSNPEP_uPzi5V6akSpPAXZ5EiUvjOF0q9UXVggx-4iC3wJFS78yMf7jEh9heQOwK5kGp8RW3SG3UjzvdH7c6-5PmOFhgvEHo09EdARZu3gpAx_W9a1EZqIViiDepF4vFXq2bkMbCfNBVr7lAL_6noQ3wb6O1qQ0m4WjeERoUkMkqswlJopM_fwNjDBBbS8LkZ6tJO0Js77S4vBN7K-bdCn53nVGkbxi48P68tEbSZ0Vo-twOG1drs4",
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
