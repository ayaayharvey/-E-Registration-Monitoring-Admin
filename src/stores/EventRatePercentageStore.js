import { defineStore } from "pinia";

export const useEventRatePercentageStore = defineStore(
	"eventRatePercentageStore",
	{
		state: () => ({
			token:
				"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2NiYmFlMS1jMmUyLTQ2ODgtOTQwZS03NTBlYjVmZGU0YTMiLCJqdGkiOiJlMjE0M2I0Yzk2NGIwODU0MGE4ZTRmM2U3YjJlNTRhOWZmNzUyMDY3NTc5ZDBmZDIzZDBkMzc3Y2YxMGI0ODk3YzZmZjA3ZTFhODdhMDdiZiIsImlhdCI6MTY2OTA5MTA1NC41NTUwNjksIm5iZiI6MTY2OTA5MTA1NC41NTUwOTksImV4cCI6MTY2OTEyNzA1NC40MTA0NzgsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.aeB0j4BnASIwX56CkQL00xq_vZ68PfDe3fI_KAfgP_GbriOC2Vq4Rpbw14EBrGTcf1hmsBpWpCyN5IRvNUd960gtsSApjuZCpaj_TzYaWIE-fdmDn_fPhSLqseD47iAH1WBXhWITZIIdTxQUIk3H7FNP5sb_Ck6NnX-wvEHATG_81cSzMrA6vY5pbt5_e7fSU-_0ib8NkSPAu-Q1O2cZX_X71H10Gia5hHwNxh41D4RfJRdK6bFRiUF2lEefpfhv4eMTruCQ5YhCZMEimF1O22CmdDJTkhBUEa3125JyF829-40B5nLeJ-WpxJjcAcsk-x6FPY0ALWGtGFpSsWX2ppuWnVXXLWDe7qdEdyYcyXXX0L_Eb4SPtQKksLYzfQpf4OWk0stiloncecc3MLIbqd9JmvjlvEFnT38y8BgeWkbmEqym5_TtPj3JYvwZFggDb3j_wZ83V6BTDTo69JsTTJgY1GT6P0n7y9eGmBJvBR6S3N1gp5HhPHCsg3WunMz0QimFaJpwpstVeL4iJBAbgp3z5Tes5ED5JVhA8gU_CCKArN8DmHyaxzsZwoEnmAike02zeA3v8F04fDzlQ4IvDhRCFflEWgDGABb2_EkkEyHFKlpK-4CKyL874oVL0mShFyfT5maCe70RJDtLGUF6ssuBAhPR1mFvKij4GL4dXXs",
			domain: "192.168.1.25",
			port: "8000",
			pageLink: "",
			data: [],
			formData: {
				id: null,
				title: "",
				description: "",
				percent: 0,
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
					"/api/master/event-rate-percentage/get/all";
			},
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
			getURL(methodUsed) {
				var protocol = "http://";
				var url = "";
				var module = "/api/master/event-rate-percentage/";
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
					percent: 0.0,
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
					responseMessage = "Event Rate Percentage Added";
				} else if (methodUsed === "update") {
					method = "POST";
					body = this.formDataSelected;
					responseMessage = "Event Rate Percentage Updated";
				} else {
					method = "POST";
					body = this.formDataSelected;
					responseMessage = "Event Rate Percentage Deleted";
				}
				console.log("JSON.stringify(body)", JSON.stringify(body));
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
						} else
							this.actionResponse.responseMessage = "Attempt Unsuccessful!";
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
	}
);
