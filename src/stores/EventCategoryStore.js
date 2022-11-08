import { defineStore } from "pinia";

export const useEventCategoryStore = defineStore("eventCategoryStore", {
	state: () => ({
		token:
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2IwOGI1OC00MzJlLTQxMjItYjBhNi02N2JiMmZkOTdjY2IiLCJqdGkiOiIyZDEzMjNkYTBmZjJlYTc4OWNmOGUzMDFiNWNhY2Q4M2IwMjA1ZjY3ZTg4YTg1MTA4MzNiZTFkODhlNTEzOThiYmJkNWYwZDU1ZDc1MGJlYiIsImlhdCI6MTY2Nzk0MTQzMS4xNzc4NywibmJmIjoxNjY3OTQxNDMxLjE3Nzg3OCwiZXhwIjoxNjY3OTc3NDMxLjE2NzE1MSwic3ViIjoiMSIsInNjb3BlcyI6W119.CnuziS-je2EnuLc9Pd-f4Sv25Z2q4vbf14cMT4luyOGh8lBnztAFmfl1Oj8Q25B5BadVebG6arNfoB_hFoGB3kcs8QG6DipFsZn-LrjZvYQs1qnk-sPIQ9hYRpBa90w6_gYMKn_vuk7pGn5_iYqUXX-KzGtHs_ylVEz-ZAMKvnJueR_BLbzf-xXa1Nc8rJ1ewm7gvaTFrR-WvOpkM2rurzmhnPTGXP-znFgrIvey9sPmBg3Y4VPlXazbBNVUZ0mpfiQsXxhnpw1jee2jDMIHZVEXRU5fM3c6P33FPWBuw6D0EMawvLdwNNpB-kwIaT-fKB9-M_7OYNHj9oGcExR_GFqMxXvTg8vZwLnaBlQU-FtgrwWHmFR6yS_RSjWEDqGDguvvZjs5zYxO0PbjcaBwUp-B6WnlsFMy4yLKC6YgYI6F2xdxi0UqwHFzfEZFFih5Zz7wCiTN14krnoE6_S0pRoW9cehMSru5yboIBfgQ9BZGviTVCefL3q_pe7s9xRHYU12gUdjWgNun8oXkrtL7CODQBOG4tuz0B0nYvdS-3yNZDp0C5gyvMcsI553jrPEs3yyr8dV0rAjzT8EhZ2T9hKzzTm_NCL5OLpkxgShzbEAY0p07rcH-tXjh6i-SDxUhoB5bBUXyzo_vT6vdwyGPjamvq2czD4klXNXWzf4aMYE",
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
