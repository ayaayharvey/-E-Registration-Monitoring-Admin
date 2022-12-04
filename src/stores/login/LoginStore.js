import { defineStore } from "pinia";

export const useLoginStore = defineStore("loginStore", {
	state: () => ({
		token:
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2QyZGQzMS01MWQ0LTQ5ZDgtODE3MC1jYWQzYzUwMzQ3MjkiLCJqdGkiOiI1ODI2OTYwY2MyYzg4MDkzOTYxYjk0NzAwMzllZWIzZDUwNzg0ZDYzYWMyNGRlY2UwMTJhNjQwNTU4ZThkZTNhYWIzOTU1MTc5ODE2MDQxZSIsImlhdCI6MTY3MDE2NDg1My41NjgxMzksIm5iZiI6MTY3MDE2NDg1My41NjgxNDcsImV4cCI6MTY3MDIwMDg1My40NTAxMDgsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.lu6u7-o8GyzW6x5hT0kCBStgTBMZW_pLbtq2vsXogLZXKDgfllDHQI3hgXukJxS5IZ4PKYoIq-xXok3zPlWCFxZpITIfZ2AtXi2C8fQhmsVknSLhBucTQfb2ujdUdFxYkMc6rtFFXiaa0Bes7nZP2byODCEJyTmXZBQhhyByVtDNpro4uFLz7MNLAS0Y6uPvWuVic7lMC_y6dbRply65-BXEYxmtAuRO0goJjV-mBanaAN0e70aG1RO7ZUk_348-3ZbiXZXnDIeDJgG83Ai2cPkunral8QFP6suJ85Jz3hwfkbj2DLmSOWrBajZgDB1pbS5tu2sdFDGXSP0hl1hWJ2QWWCiMgz3ArzBWbPHUItzg0107btrLpKYzIi0xKxtzz5zfOJCsvBBh9REjp_rQ7MuBr1h0cHxesCJHEBY2ngl6-3F7eYuDZWzubFM81cLw1jXwLOeqFuFKYtMxCNuK7RrMB25h97JwXH8taMcVZFcMnm6pp3srN0WapzV4821vjsimL5HIRHF3CgdyqNNo_DjpjpxdVllLELMP7G2Gvi5cJe2IFXnT4BpJ85xfLM0pFbJOSgClMr0kvh0flVQoUF7kmwOohCMNIP9JiihjbTmAwsOgWdcwk7sKbDnoyKtMi2iDDaqD5knLWnP7wCFVjSEQTDLfgZ5AvaV9KOiLDTU",
		domain: "192.168.100.2",
		port: "8000",
		pageLink: "",
		data: [],
	}),
	actions: {
		getPageLink() {
			this.pageLink = "http://" + this.domain + ":" + this.port + "/api/login";
		},
		clearForm() {
			this.data = [];
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
				responseMessage = "Client Record Added";
			} else if (methodUsed === "update") {
				method = "POST";
				body = this.formDataSelected;
				responseMessage = "Client Record Updated";
			} else {
				method = "POST";
				body = this.formDataSelected;
				responseMessage = "Client Record Deleted";
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
