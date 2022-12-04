import { defineStore } from "pinia";
import { useLoginStore } from "../login/LoginStore";

export const usePaymentCategoryStore = defineStore("paymentCategoryStore", {
	state: () => ({
		token:
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2NiYmFlMS1jMmUyLTQ2ODgtOTQwZS03NTBlYjVmZGU0YTMiLCJqdGkiOiJkMTlhNDRmNGU1NzNlMzc3YzViMDg2OTI2MDhjYmIxNjA4YWJjNjA5NmM1Y2Q4MmUxNzUzZGVjZjZjZjUzOGUzYzczODc3MzEyMTk4YzcxMyIsImlhdCI6MTY2OTAzMzgxOC44NTA1NTUsIm5iZiI6MTY2OTAzMzgxOC44NTA1NTksImV4cCI6MTY2OTA2OTgxOC43Mzg3Nywic3ViIjoiMSIsInNjb3BlcyI6W119.eSJBrsTlST1W41tKbXVeMPMeTr1Q84kuE6fq-NccJt5tO7ehsFMNlHZM2QD3p4bbU2LbSPdGEXDRgIian38JXReWdNPg-MRx844fki19asKuQEsuLWUgYhBC-A66YZZW4YKMWYJuLU9YBHp4YNAZlmUf-BEIpjih3gRVFLIUnpiPywNZ5vgszk8FN9Y6UWv8hCvp5wMx71S-RzVKTl_homw2W2P8nt3genvjVTg3zWPS_heFd6IwdeYN7J2L5k3X7qnt0lHPq8xXYgNcHcDz5IZOV-ukmks7FqVWAQl2FEwJYleb8zJkSJH2UZpQpnSBFhb6s_GLEdeMiY8jXLgPzGqeJwhE8HzDLUsip1ta3KJU11s5Sh4MR1vJKHjbR8HcVeqtKiN2MTZAAayvaPZIIXy1QiEgVavYOnAFUy4QIM2zLOTi6SFI8ahW3dgI0qOX0PGeVLpq52cgRczXdOYZKwpcaDQPj3UkiuYC9PE4GZ4nucipn2SQ-mTacoOr0G76EYuzVS5LMEP7I-kvlHEubi4_DVwfSSkLxTiyXFL66UZ8O4zVkPSeZc4lizic_zvrwtaWs6CrTV9mBPxH9uTp82Qkd68Z30h52jISkBidCgjjRTRapa6bOHlCooOtF0mvVbhe5SrM5YahGed248g6MfWN2t778JxEGRUO2vdqcZs",
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
		loginStore: useLoginStore(),
	}),
	actions: {
		getPageLink() {
			this.pageLink =
				"http://" +
				this.loginStore.domain +
				":" +
				this.loginStore.port +
				"/api/master/payment-category/get/all";
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
			var module = "/api/master/payment-category/";
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
				responseMessage = "Payment Category Added";
			} else if (methodUsed === "update") {
				method = "POST";
				body = this.formDataSelected;
				responseMessage = "Payment Category Updated";
			} else {
				method = "POST";
				body = this.formDataSelected;
				responseMessage = "Payment Category Deleted";
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
