import { defineStore } from "pinia";

export const useEventCategoryStore = defineStore("eventCategoryStore", {
	state: () => ({
		token:
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2I0NzUxNS1iODA3LTQ2ZTAtYmMxZi1jYTU4MDkxZGZlMjkiLCJqdGkiOiIwZTJlMzc4NzQ2ZTJlYjRmNzhkMDdiNzk4OGU1NGRlNGFjMjFhNzBhNzdkOWY4Y2E0NmM3ZjUxMjFlOThhOWVjMDE0ZmQyZTMxN2Q2MGUzNCIsImlhdCI6MTY2ODAxNTI1MS43MDkxNjgsIm5iZiI6MTY2ODAxNTI1MS43MDkxOCwiZXhwIjoxNjY4MDUxMjUxLjY4OTQ4OSwic3ViIjoiMSIsInNjb3BlcyI6W119.RSyxkBHQBhDusd67q0hw8Bc4cW6G-_soA1Cir2kCLByQW9o3CdGiqeMrAChRvvOgN9xAvrdsbihOtHISGi-gTnEgz5omN8Y2ChtL5X19_u8brNmAzBVthONOWku5sY3z8_COKT8qNoNqfpVa1YbG-yQQ_08MHeMk9A-7fq_TdpncFOtaO7gB6WF6i1MXpTU2E8JgI_uV6rgCs1RuTs_jZ8WWijWsbdMoTLtIeZ09igaa0SBEXhKKjEAlIx5-5CBUWeiD20ruwvZ9bIwRtxTKQh0wlRkvd68mbFeVnL8EdCg7DTr0NUHACuYE-V4oEgEy_QuXdwX7Viab2vo8-h5W80d89_v1xeKp8YKnttRx_nATMHEVX6oJXpShtE8lZA_5Ax2hniUdj2-zbBqFhDZI6ijetzIty5eyY9cdw0wWRf3pX1UuQCewDE4tCfXycK9-WlYX23IKILQag4QwPyPxV0-YMS--KYE1zDi2uCGU2QKjjRjurIKKVWvx9B3rvO2iVrHuHA3YzLIVCZ3UmGCedNRUuT4k1XXcMpXkw7J8h3TVx17MQtU_qpa6S9aSLdgaatHTb4WRxwbNtlLR6GTsXwPDT_MsNiHUjZ0zjI1LZZq2lknxprYVgcmUmXNb17ADUWD4mFTvxf-Pb2LTRSsi_5jp6AvFTna_0aDmNkaGEuE",
		pageLink: "http://192.168.1.8:8081/api/master/event-category/get/all",
		createLink: "http://192.168.1.8:8081/api/master/event-category/create",
		updateLink: "http://192.168.1.8:8081/api/master/event-category/edit",
		deleteLink: "http://192.168.1.8:8081/api/master/event-category/delete",
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
		submitForm(form) {
			this.saving = true;
			this.formDataSelected = form;
			if (form.id === null) this.onSubmit("save");
			else if (form.is_deleted) this.onSubmit("delete");
			else this.onSubmit("update");
		},
		async onSubmit(methodUsed) {
			var url = "";
			var method = "";
			var body = {};
			var responseMessage = "";
			if (methodUsed === "save") {
				url = this.createLink;
				method = "POST";
				body = this.formData;
				responseMessage = "Event Category Added";
			} else if (methodUsed === "update") {
				url = this.updateLink;
				method = "POST";
				body = this.formDataSelected;
				responseMessage = "Event Category Updated";
			} else {
				url = this.deleteLink;
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
