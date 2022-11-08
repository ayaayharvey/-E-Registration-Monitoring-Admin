import { defineStore } from "pinia";

export const useEventCategoryStore = defineStore("eventCategoryStore", {
	state: () => ({
		token:
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2IwOGI1OC00MzJlLTQxMjItYjBhNi02N2JiMmZkOTdjY2IiLCJqdGkiOiI2MzdkMThkMGI0ZjVhYzZiMmFjYTBjMTBiOWIyYjIzMDgzMDY0ZWUzZDQ2YWUyOGZhZjcyMzU5NTcwMmY0Zjc2ZjcyYmU5OWRmZjM3ZmI3ZiIsImlhdCI6MTY2Nzk0MTg1MC4wMTU0NDUsIm5iZiI6MTY2Nzk0MTg1MC4wMTU0NTIsImV4cCI6MTY2Nzk3Nzg1MC4wMDAzNzgsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.neRmW9Y-M-fHiDh31CeAQJNyhn4jExGGnt350Xofc-RCaj-WA5ROBIUsA2oLEV75EnV1vt6mKavQmVANeXnZeLyPHVHjc3cY2QjrXUTftjczoShX_gs5fVvBSIQshal0f4Gq-8Z7Xw9Q6Xe_-PnbQuR0xCF-BKoSJ-EDZ_fcnkoJ-1_o9tAgFtNx-2FzgctwVwcVLWzzKEyki9VV37jlgYDj9axdr51cX5jhFukVmeyvITPB43Cf83yACkv_YFPz6TlWjvmA2BL-kkZRNpwQhm2n3a_W5DnrSC_ha0vr7Np8EIx0Rysd-0vn5XjFBUJkW8Z1obTi5MPaoviEpgyY72ux1KWA67i6s0XTC24zL_C8PQLkofhqPgpes7qoVovnf-0Xt0u4dSE7A0JGYWv17HsW7asin9G5GOcFu_CS03E1Y-0mTOEWtDbNL1QQ3VX37UQJ5SyS1T7pvj7dzD6W8f31UiY19HSAmMfvdGMm-mUIVZn5Tx_eN2OteiFic1W9IQV4FzxxVWiUZ1rmrlH-Fa4SaERs4h1QeSpxZ4pmcpenijRIgUD6cJIApAHwr4yT3u9dOKRuLSxbWNVNwBCp_QIHTh57xsG2O0hRd3i9vLMxEIsQy5DDNLNNPvQoBJBrkdHxQC2CNdyrb8bL8dtRUo19B4dhgPIhMYyesRJMmNk",
		pageLink: "http://192.168.1.3:8081/api/master/event-category/get/all",
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
		togglePage(requestURL) {
			this.pageLink = requestURL;
			this.getPage();
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
						this.getPage();
					}
					return data.json();
				})
				.then((responseData) => {
					this.showCreateForm = false;
					this.saving = false;
					this.responseStatus = responseData.request_status.message;
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
