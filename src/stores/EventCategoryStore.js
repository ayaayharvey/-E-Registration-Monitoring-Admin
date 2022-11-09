import { defineStore } from "pinia";

export const useEventCategoryStore = defineStore("eventCategoryStore", {
	state: () => ({
		token:
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2IwOGI1OC00MzJlLTQxMjItYjBhNi02N2JiMmZkOTdjY2IiLCJqdGkiOiI0YjU3YWE3YzRjM2ViNTcyMzA5MDVmZGQyMThmY2Y2OWVjNWNmZTQzOTdhODZhN2QzZGY4MTVlYWJlZDQ3MDI4ZjMzMGQ4Y2U0NWQ2MmJkNiIsImlhdCI6MTY2Nzk0MTkxOS41MDExMDIsIm5iZiI6MTY2Nzk0MTkxOS41MDExMDQsImV4cCI6MTY2Nzk3NzkxOS40OTM5NzMsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.Q4HEVHWX0cfGlcnUbS1SCM63prfqdtrofc7uaMiK7-50S08bzJEUjzTynMzI7nVIbbxQBtO2TNhf9AnVFKMcj6SOZdqoZ-axzugXUDoYJUGBlsnNb8mg9tK-ktisFzOeSjMG8OUYqfSYUT42qacyKMFBd3uuzDFwXAUlMXraJcRuCaFFl_1Zxa7I4Q4rWKx2H4sHskLtDoPaFyY-xA4SUjydvJVUg_dAi5R8fVZBjsG6Tl-YTY8RnCjNylziV08yqBxneW4SxD7zGYWMB15sVyosAjNkqR3ZZ6f1KstpytCIjW3nIucD7vmqYbehIce3jeQvjXPAwH7YR0OXJsBeqjgQ9Kud4Z6BW3tijx2vQoQh1mz3ZlA4tG7UCQmZpqUEOb0zdPSyKcaPbC7VSThxHIJAgR6VWW--LtOaHcdP4IwcYyURv4R7p-MW0a5Fj5x-Ndmj7esl-cXmOZzfF7pzURlOA-OOwUZHJig30ncK6Ri6QHVt9gzYUw_atvKe4SGT9Qb0I8t-9GkM5qmQzoBuH1a_BbFereq1bRZawEbIsaXknywD_OT4841V_GWIt21Co0eW2ZnfVIWN1DYF9Zxp-NC9qvTF6kjRtr3JdwaaYOsc8rWYBnVOFyzwIWQkbkxkuI35XVe4h-HRKnfttBNGAKEiS8ZCmtnH-ptrqsIX2BU",
		pageLink: "http://192.168.1.3:8081/api/master/event-category/get/all",
		createLink: "http://192.168.1.3:8081/api/master/event-category/create",
		updateLink: "http://192.168.1.3:8081/api/master/event-category/edit",
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
	}),
	actions: {
		toggleCreateForm() {
			this.showCreateForm = !this.showCreateForm;
		},
		openViewEditForm(id) {
			this.formDataSelected = this.data.data.find((x) => x.id === id);
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
		submitForm(recordId) {
			if (recordId === null) this.onSubmit(true);
			else this.onSubmit(false);
		},
		async onSubmit(newData) {
			this.saving = true;
			await fetch(newData ? this.createLink : this.updateLink, {
				method: newData ? "POST" : "POST",
				headers: {
					"Content-type": "application/json",
					KEY: "$2y$10$BaPrYesKdAQDgpYk1sVK5.vhfoXkgEfD6VvLMCgA0uaNs7I58TKE2",
					Authorization: "Bearer " + this.token,
				},
				body: JSON.stringify(newData ? this.formData : this.formDataSelected),
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
						this.actionResponse.responseMessage = newData
							? "Event Category Added"
							: "Event Category Updated";
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
		async getRecord(id) {
			this.fetching = true;
			this.showViewEditForm = true;
			await fetch("http://192.168.1.3:8081/api/master/event-category/" + id, {
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
					this.formDataSelected = response.data;
					this.fetching = false;
					this.loading = false;
				})
				.catch((error) => {
					this.message = error;
					this.loading = false;
				});
		},
	},
});
