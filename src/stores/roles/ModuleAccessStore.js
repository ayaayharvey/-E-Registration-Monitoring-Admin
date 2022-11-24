import { defineStore } from "pinia";

export const useModuleAccessStore = defineStore("moduleAccessStore", {
	state: () => ({
		token:
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2QyNmUzNC1iYThkLTQ3Y2YtYTZlMy1jZjIxNzU0NmNkOWUiLCJqdGkiOiJkOTE5NTFiZDU3NmZmOTQ5ZDc3NDY4OWI0MzQwZmM0Njg3MTE1YjRkODExOGQ0MjQxMGRiMjk1OWI5MDg5MmYzMzQ0MGIyMjYyYTcyYjdmZCIsImlhdCI6MTY2OTMwMDU4NS4xMDQwNTIsIm5iZiI6MTY2OTMwMDU4NS4xMDQwNTUsImV4cCI6MTY2OTMzNjU4NS4wNTM4NzUsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.MpYW4o0Og9wfJjzpypNx45ThUp-O9XO-TUdTCDxNRlqFpwwswaeHI22SKaKu5LZpl-CDLsp0GosB6EvazZ83mEe07zUWzeOINCIvTr2_tWC6RNJ4BsFMz5ktJfN_vQXiU9LtVKeKHoSqXK_nnj1ahXlvm7cGJpj9aKaKEhybMFOScc5GZqKywi9u8ZNtMmttCdN4t0J8ZoD628EVirSF0GtrJfXhHz2wbibK8Gqp0uz7zr2F3shqq7yg9JSnkCs3jaGARcb66VQ5im-w2pH3_oqn_WN8jsgb2lwZpxlpTvmvx2XcCm43xAjZwACv1yoGrYLaymMDzBZ-zdQ1lsbRti0yqg-4Sa3AgoJUAffc7xyGkwT-_Kb41ms77PhWX_mQv6xrUf-7dg08K66DOj2g30zoRGsiYlPEttDV6mEpLEM5gdxbtoHAtRNj67b6TVIdZSH8R_3pOtnjHIvEU-UVG4SpJBgqpbNCb9EqPbdLaQiRnE9xdIXclbTl7dNx5MCaPWJx9c-Nd1-i9yITCkA-EqkQ3zYIM6MKfIx5n-To-oWWwFXOBsSr72F1Nmq8DkUl2YWg4lzlXe1j0NVCHXFG41httE23DaELY-mjI5r77NLzA5Mb_wCEHuyhqTmLFY_Md-7a-ijf34MdT1XjDRaYPpTyNUsDclBKmUfY7k94O3I",
		domain: "192.168.1.24",
		port: "8000",
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
	}),
	actions: {
		getPageLink() {
			this.pageLink =
				"http://" +
				this.domain +
				":" +
				this.port +
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
				this.domain +
				":" +
				this.port +
				"/api/master/role-page-access/edit";
			var method = "POST";
			var body = this.formDataSelected;
			var responseMessage = "Module Access Updated";

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
