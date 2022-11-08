import { defineStore } from "pinia";

export const useEventCategoryStore = defineStore("eventCategoryStore", {
	state: () => ({
		formData: {
			title: "",
			description: "",
			status: "active",
		},
		loading: false,
	}),
	actions: {
		async createEventCategory() {
			this.loading = true;
			const res = await fetch("http://localhost:3000/events");
			const data = await res.json();
			this.events = data;
			console.log("fetching", this.events);
			this.loading = false;
		},
	},
});
